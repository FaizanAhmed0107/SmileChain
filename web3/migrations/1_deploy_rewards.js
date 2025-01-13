const Rewards = artifacts.require("Rewards");

module.exports = function (_deployer) {
    _deployer.deploy(Rewards);
};
