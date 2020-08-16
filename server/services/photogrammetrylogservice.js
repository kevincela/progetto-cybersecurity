const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");
const Web3 = require("web3");

class PhotogrammetryLogService extends BlockchainContractService {
    constructor(contractAddress, accountAddress, web3) {
        super("LogFotogrammetria", contractAddress, accountAddress, web3);
    }

    static async getInstance(options) {
        let contract = await Contract.findOne({ name: "LogFotogrammetria" });
        let host = options.host ? options.host : "http://localhost:22000";
        let web3 = new Web3(host);
        let accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0];
        return new PhotogrammetryLogService(contract.address, accountAddress, web3);
    }

    async getLog() {
        let log = await this.call(this.contract.methods.getLog());
        return log;
    }

    async getMeasureFromHash(hash) {
        let measure = await this.call(this.contract.methods.getMeasureFromHash(hash));
        return measure;
    }

    async storeItem(result, hash, misure) {
        let timestamp = new Date().toISOString();
        return this.send(this.contract.methods.storeItem(timestamp, result, hash, misure));
    }
    
}

module.exports = PhotogrammetryLogService;