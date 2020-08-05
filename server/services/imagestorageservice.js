const BlockchainContractService = require("./blockchainservice")

class ImageStorageService extends BlockchainContractService {
    constructor(accountAddress) {
        //aggiungere retrieval address blockchain
        super("ImageStorage", "0xcB2299eA32fC5Db76B638BEe5bC081BAab2F21d0", accountAddress);
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

    async getImageFromHash(hash) {
        let image = await this.call(this.contract.methods.getImageFromHash(hash));
        return image;
    }
}

module.exports = ImageStorageService;