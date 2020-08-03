const Web3 = require("web3");

//TODO: RISTRUTTURARE PER USARE UN CONTRACT GENERICO
class BlockchainService {
    constructor(account) {
        //TODO: inizializzazione account con eventuale chiave privata
        this.web3 = new Web3("http://localhost:22000");
    }

    async call(method) {
        return method.call({ from: this.account });
    }

    async send(method) {
        return method.send({ from: this.account });
    }
}