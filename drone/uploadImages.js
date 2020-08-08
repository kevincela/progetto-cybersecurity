const Web3 = require("web3");
const fs = require("fs");
const IpfsHttpClient = require('ipfs-http-client');
const path = require("path");
const exif = require("exif").ExifImage;
const { globSource } = IpfsHttpClient;
const mongoose = require("mongoose");
const config = require("../server/config");
const Contract = require("../server/models/Contract");
const { exit } = require("process");

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
    const ImageStorage = JSON.parse(fs.readFileSync("../build/contracts/ImageStorage.json"));
    await mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    const ipfs = IpfsHttpClient();

    let web3 = new Web3("http://localhost:22001");
    let accounts = await web3.eth.getAccounts();
    let contract = await Contract.findOne({ name: "ImageStorage" });
    console.log(contract.address);
    let ImageStorageContract = new web3.eth.Contract(ImageStorage.abi, contract.address);

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
    console.log(imageHashes, timestamp);

    let result = await ImageStorageContract.methods
                                           .storeImages(imageHashes, fileNames, creationDates, timestamp)
                                           .send({from: accounts[0]});

    console.log(result);
    exit(0);
}

uploadImages();