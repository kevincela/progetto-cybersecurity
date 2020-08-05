const Web3 = require("web3");
const fs = require("fs");
const IpfsHttpClient = require('ipfs-http-client');
const path = require("path");
const exif = require("exif").ExifImage;
const { globSource } = IpfsHttpClient;

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
    const ipfs = IpfsHttpClient();
    let web3 = new Web3("http://localhost:22001");

    let ImageStorageContract = new web3.eth.Contract(ImageStorage.abi, '0xcB2299eA32fC5Db76B638BEe5bC081BAab2F21d0');
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
    timestamp = new Date().toISOString();
    console.log(imageHashes, timestamp);

    ImageStorageContract.methods.storeImages(imageHashes, fileNames, creationDates, timestamp)
    .send({from: '0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e'}).then(result => {
        console.log(result);
    });

    /* ImageStorageContract.methods.getImages()
    .call({from: '0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e'}).then(result => {
        console.log(result);
    }); */
}

uploadImages();