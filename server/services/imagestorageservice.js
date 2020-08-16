const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");
const Web3 = require("web3");

class ImageStorageService extends BlockchainContractService {
    constructor(contractAddress, accountAddress, web3) {
        super("ImageStorage", contractAddress, accountAddress, web3);
    }

    static async getInstance(options) {
        let contract = await Contract.findOne({ name: "ImageStorage" });
        let host = options.host ? options.host : "http://localhost:22000";
        let web3 = new Web3(host);
        let accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0];
        return new ImageStorageService(contract.address, accountAddress, web3);
    }

    async getImages() {
        let images = await this.call(this.contract.methods.getImages());
        return images;
    }

    async setProcessedImage(hash) {
        return this.send(this.contract.methods.setProcessedImage(hash));
    }

    async setCompletedImage(hash) {
        return this.send(this.contract.methods.setCompletedImage(hash));
    }

    async storeImages(imageHashes, fileNames, creationDates, timestamp) {
        return this.send(this.contract.methods.storeImages(imageHashes, fileNames, creationDates, timestamp));
    }

    async getImageFromHash(hash) {
        let image = await this.call(this.contract.methods.getImageFromHash(hash));
        return image;
    }
}

module.exports = ImageStorageService;