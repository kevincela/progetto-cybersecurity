const Web3 = require("web3");
const fs = require("fs");
const IPFS = require("ipfs");
const path = require("path");

async function uploadImages() {
    const ImageStorage = JSON.parse(fs.readFileSync("../build/contracts/ImageStorage.json"));

    let web3 = new Web3("http://localhost:22001");
    let node = await IPFS.create();

    let ImageStorageContract = new web3.eth.Contract(ImageStorage.abi, '0x9d13C6D3aFE1721BEef56B55D303B09E021E27ab');
    let imageHashes = [];
    let imageFiles = fs.readdirSync("images").map(file => {
        let fullPath = path.join("images", file);
        return new Buffer(fs.readFileSync(fullPath));
        /* let fullPath = path.join("images", file);
        let imageFile = new Buffer(fs.readFileSync(fullPath));
        let result = node.add(imageFile);
        console.log(result); */
    });

    console.log(imageFiles);

    for await (const result of node.add(imageFiles)) {
        console.log(result)
    }

    ImageStorageContract.methods.getImages().call({from: '0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e'}).then(result => {
        console.log(result);
    });
}

uploadImages();