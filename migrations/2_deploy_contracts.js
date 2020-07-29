let ImageStorage = artifacts.require("./ImageStorage.sol");
let GiornaleDeiLavori = artifacts.require("./GiornaleDeiLavori.sol");
let LogFotogrammetria = artifacts.require("./LogFotogrammetria.sol");

module.exports = async (deployer) => {
  await deployer.deploy(ImageStorage);
  await deployer.deploy(GiornaleDeiLavori);
  await deployer.deploy(LogFotogrammetria);
  let IS = await ImageStorage.deployed();
  let GDL = await GiornaleDeiLavori.deployed();
  let SF = await LogFotogrammetria.deployed();
  
  //TODO: salvare gli indirizzi su mongo
  console.log("INDIRIZZO IMAGESTORAGE: " + IS.address)
  console.log("INDIRIZZO GIORNALE DEI LAVORI: " + GDL.address)
  console.log("INDIRIZZO LOG FOTOGRAMMETRIA: " + SF.address)
};