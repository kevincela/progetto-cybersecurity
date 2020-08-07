const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");

class GDLService extends BlockchainContractService {
    constructor(contractAddress, accountAddress) {
        super("GiornaleDeiLavori", contractAddress, accountAddress);
    }

    static async getInstance(accountAddress) {
        let contract = await Contract.findOne({ name: "GiornaleDeiLavori" });
        return new GDLService(contract.address, accountAddress);
    }

    async getGiornale() {
        let giornale = await this.call(this.contract.methods.getGiornale());
        return giornale;
    }

    async storeItem(hash, measures, annotazioni) {
        let timestamp = new Date().toISOString();
        return this.send(this.contract.methods.storeItem(hash, timestamp, measures, annotazioni));
    }
    
}

module.exports = GDLService;