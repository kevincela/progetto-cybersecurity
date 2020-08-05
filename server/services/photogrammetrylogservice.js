const BlockchainContractService = require("./blockchainservice");

class PhotogrammetryLogService extends BlockchainContractService {
    constructor(accountAddress) {
        //aggiungere retrieval address blockchain
        super("LogFotogrammetria", "0x9AC8A5eFC282aFab3B2a7286704F232767645733", accountAddress);
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