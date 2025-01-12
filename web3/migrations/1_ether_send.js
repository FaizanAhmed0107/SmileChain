const EtherSender = artifacts.require("EtherSender");

module.exports = function (_deployer) {
    _deployer.deploy(EtherSender);
};
