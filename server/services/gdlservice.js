const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");
const Web3 = require("web3");

class GDLService extends BlockchainContractService {
    constructor(contractAddress, accountAddress, web3) {
        super("GiornaleDeiLavori", contractAddress, accountAddress, web3);
    }

    static async getInstance(options) {
        let contract = await Contract.findOne({ name: "GiornaleDeiLavori" });
        let host = options.host ? options.host : "http://localhost:22000";
        let web3 = new Web3(host);
        let accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0];
        return new GDLService(contract.address, accountAddress, web3);
    }

    async getGiornale() {
        let giornale = await this.call(this.contract.methods.getGiornale());
        return giornale;
    }

    async storeItem(hash, measures, annotazioni) {
        let timestamp = new Date().toISOString();
        return this.send(this.contract.methods.storeItem(hash, timestamp, measures, annotazioni));
    }

    async getItem(index) {
        let item = await this.call(this.contract.methods.giornale(index));
        return item;
    }
    
}

module.exports = GDLService;