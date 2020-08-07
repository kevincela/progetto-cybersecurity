const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");

class ImageStorageService extends BlockchainContractService {
    constructor(contractAddress, accountAddress) {
        super("ImageStorage", contractAddress, accountAddress);
    }

    static async getInstance(accountAddress) {
        let contract = await Contract.findOne({ name: "ImageStorage" });
        return new ImageStorageService(contract.address, accountAddress);
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