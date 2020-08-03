const Web3 = require("web3");
const fs = require("fs");

class ImageStorageService {
    constructor() {
        const ImageStorage = JSON.parse(fs.readFileSync("../build/contracts/ImageStorage.json"));
        let web3 = new Web3("http://localhost:22000");
        this.imageServiceContract = new web3.eth.Contract(ImageStorage.abi, '0x9d13C6D3aFE1721BEef56B55D303B09E021E27ab');
    }

    async getImages() {
        return this.imageServiceContract.methods.getImages().call({from: '0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e'})
    }
}

module.exports = ImageStorageService;