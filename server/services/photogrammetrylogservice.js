const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");

class PhotogrammetryLogService extends BlockchainContractService {
    constructor(contractAddress, accountAddress) {
        super("LogFotogrammetria", contractAddress, accountAddress);
    }

    static async getInstance(accountAddress) {
        let contract = await Contract.findOne({ name: "LogFotogrammetria" });
        return new PhotogrammetryLogService(contract.address, accountAddress);
    }

    async getLog() {
        let log = await this.call(this.contract.methods.getLog());
        return log;
    }

    async storeItem(result) {
        let timestamp = new Date().toISOString();
        return this.send(this.contract.methods.storeItem(timestamp, result));
    }
    
}

module.exports = PhotogrammetryLogService;