const BlockchainContractService = require("./blockchainservice")

class ImageStorageService extends BlockchainContractService {
    constructor(accountAddress) {
        //aggiungere retrieval address blockchain
        super("ImageStorage", "0x9d13C6D3aFE1721BEef56B55D303B09E021E27ab", accountAddress);
    }

    async getImages() {
        let images = await this.call(this.contract.methods.getImages());
        return images;
    }
}

module.exports = ImageStorageService;