const fs = require("fs");
const IpfsHttpClient = require('ipfs-http-client');
const path = require("path");
const exif = require("exif").ExifImage;
const { globSource } = IpfsHttpClient;
const { exit } = require("process");
const mongoose = require("mongoose");
const config = require("../server/config");
const ImageStorageService = require("../server/services/imagestorageservice");

function getExifData(path) {
    return new Promise((resolve, reject) => {
        try {
            new exif({ image : path }, function (error, exifData) {
                if (error)
                    reject(error);
                else
                    resolve(exifData);
            });
        } catch (error) {
            reject(error);
        }
    })
}

async function uploadImages() {
    const ipfs = IpfsHttpClient();
    await mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    let imageStorageService = await ImageStorageService.getInstance({host: "http://localhost:22001"});

    let imageHashes = [];
    let fileNames = [];
    let creationDates = [];

    for (let element of fs.readdirSync("images")) {
        let fullPath = path.join("images", element);
        const file = await ipfs.add(globSource(fullPath));
        let cid = file.cid.toString();
        console.log(cid);
        imageHashes.push(cid);
        fileNames.push(element);
        let exifData = await getExifData(fullPath);
        let customCreationDate = exifData.exif.CreateDate.split(" ");
        customCreationDate[0] = customCreationDate[0].replace(":", "-");
        creationDates.push(new Date(customCreationDate.join(" ")).toISOString())
    }

    console.log(imageHashes);
    console.log(creationDates);
    console.log(fileNames);
    let timestamp = new Date().toISOString();

    let result = await imageStorageService.storeImages(imageHashes, fileNames, creationDates, timestamp);

    console.log(result);
    exit(0);
}

uploadImages();