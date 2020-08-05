const BlockchainContractService = require("./blockchainservice");

class GDLService extends BlockchainContractService {
    constructor(accountAddress) {
        //aggiungere retrieval address blockchain
        super("GiornaleDeiLavori", "0xAC9061dDF61500407AC8c1d6D1f14271d2C94B0a", accountAddress);
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