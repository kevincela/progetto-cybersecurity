const Web3 = require("web3");
const fs = require("fs");
const IpfsHttpClient = require('ipfs-http-client')
const path = require("path")
const { globSource } = IpfsHttpClient

async function uploadImages() {
    const ImageStorage = JSON.parse(fs.readFileSync("../build/contracts/ImageStorage.json"));
    const ipfs = IpfsHttpClient();
    let web3 = new Web3("http://localhost:22001");

    let ImageStorageContract = new web3.eth.Contract(ImageStorage.abi, '0x9d13C6D3aFE1721BEef56B55D303B09E021E27ab');
    let imageHashes = [];

    for (let element of fs.readdirSync("images")) {
        let fullPath = path.join("images", element);
        const file = await ipfs.add(globSource(fullPath));
        let cid = file.cid.toString();
        console.log(cid);
        imageHashes.push(cid);
    }

    timestamp = new Date().toISOString();
    console.log(imageHashes, timestamp);

    ImageStorageContract.methods.storeImages(imageHashes, timestamp).send({from: '0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e'}).then(result => {
        console.log(result);
    });

    /* ImageStorageContract.methods.getImages().call({from: '0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e'}).then(result => {
        console.log(result);
    }); */
}

uploadImages();