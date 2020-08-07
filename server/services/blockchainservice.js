const Web3 = require("web3");
const fs = require("fs");

class BlockchainContractService {
    constructor(contract, contractAddress, account) {
        //TODO: inizializzazione account con eventuale chiave privata?
        const ContractFile = JSON.parse(fs.readFileSync(`../build/contracts/${contract}.json`));
        let web3 = new Web3("http://localhost:22000");
        this.contract = new web3.eth.Contract(ContractFile.abi, contractAddress);
        this.account = account;
    }

    async call(method) {
        return method.call({ from: this.account });
    }

    async send(method) {
        return method.send({ from: this.account });
    }
}

module.exports = BlockchainContractService