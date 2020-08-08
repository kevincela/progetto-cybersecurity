let ImageStorage = artifacts.require("./ImageStorage.sol");
let GiornaleDeiLavori = artifacts.require("./GiornaleDeiLavori.sol");
let LogFotogrammetria = artifacts.require("./LogFotogrammetria.sol");
const mongoose = require("mongoose");
const config = require("../server/config");
const Contract = require("../server/models/Contract");
const Web3 = require("web3");

module.exports = async (deployer) => {
  let web3 = new Web3("http://localhost:22001");
  let accounts = await web3.eth.getAccounts();

  await mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

  await Contract.deleteMany({});

  await deployer.deploy(ImageStorage, accounts[0]);
  await deployer.deploy(GiornaleDeiLavori);
  await deployer.deploy(LogFotogrammetria);
  let IS = await ImageStorage.deployed();
  let GDL = await GiornaleDeiLavori.deployed();
  let SF = await LogFotogrammetria.deployed();

  let contracts = [{
    name: "ImageStorage",
    address: IS.address
  }, {
    name: "GiornaleDeiLavori",
    address: GDL.address
  }, {
    name: "LogFotogrammetria",
    address: SF.address
  }];

  await Contract.insertMany(contracts);
  
  console.log("INDIRIZZO IMAGESTORAGE: " + IS.address)
  console.log("INDIRIZZO GIORNALE DEI LAVORI: " + GDL.address)
  console.log("INDIRIZZO LOG FOTOGRAMMETRIA: " + SF.address)
};