let ImageStorage = artifacts.require("./ImageStorage.sol");
let GiornaleDeiLavori = artifacts.require("./GiornaleDeiLavori.sol");
let LogFotogrammetria = artifacts.require("./LogFotogrammetria.sol");

module.exports = function(deployer) {
  deployer.deploy(ImageStorage);
  deployer.deploy(GiornaleDeiLavori);
  deployer.deploy(LogFotogrammetria);
};