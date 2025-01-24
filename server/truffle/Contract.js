const Web3 = require('web3');
const contract = require('truffle-contract');
const rewards = require('../../web3/build/contracts/Rewards.json');
const Rewards = contract(rewards);


function getOwner(callback) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    self.web3.eth.getAccounts((err, accs) => {
        if (err != null) {
            console.log("There was an error fetching your accounts.");
            return;
        }
        if (accs.length === 0) {
            console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }
        self.accounts = accs;
        self.account = self.accounts[0];

        callback(self.accounts);
    });
}

function getBalance(sender, callback) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;
    Rewards.deployed().then(async (instance) => {
        data = instance;
        const balance = await data.getContractBalance({from: sender});
        callback(balance.toString()); // Balance is converted to a string for compatibility
    }).catch((e) => {
        console.log(e);
    });
}

function getBalancePoints(sender, callback) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;
    Rewards.deployed().then(async (instance) => {
        data = instance;
        const balance = await data.getPointsBalance(sender, {from: sender});
        callback(balance.toString()); // Balance is converted to a string for compatibility
    }).catch((e) => {
        console.log(e);
    });
}

function topUpEther(sender, amount) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;
    Rewards.deployed().then(async (instance) => {
        data = instance;
        await data.topUpContract({
            from: sender,
            value: Web3.utils.toWei(amount, "ether"), // Sending Ether
            gas: 3000000,
        });
    }).catch((e) => {
        console.log(e);
    });
}

function addUserPoints(sender, receiver, amount) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;
    Rewards.deployed().then(async (instance) => {
        data = instance;
        await data.addPoints(receiver, amount, {from: sender});
    }).catch((e) => {
        console.log(e);
    });
}

function redeemPoints(sender, amount) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;
    Rewards.deployed().then(async (instance) => {
        data = instance;
        await data.redeemPoints(amount, {from: sender});
    }).catch((e) => {
        console.log(e);
    });
}

function addReward(sender, points, ethers, details) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;
    Rewards.deployed().then(async (instance) => {
        data = instance;
        await data.modifyReward(points, Web3.utils.toWei(ethers, 'ether'), details, {from: sender});
    }).catch((e) => {
        console.log(e);
    });
}

function getOneReward(sender, points, callback) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;
    Rewards.deployed().then(async (instance) => {
        data = instance;
        const reward = await data.getReward(points, {from: sender});
        const ans = (reward["0"] > 0) ?
            {type: "Ether", value: Web3.utils.fromWei(reward["0"], 'ether')} :
            {type: "Other", value: reward["1"]};
        callback(ans);
    }).catch((e) => {
        console.log(e);
    });
}

function delReward(sender, points) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;
    Rewards.deployed().then(async (instance) => {
        data = instance;
        await data.deleteReward(points, {from: sender});
    }).catch((e) => {
        console.log(e);
    });
}

function getRewardKeys(sender, callback) {
    const self = this;
    Rewards.setProvider(self.web3.currentProvider);
    let data;

    Rewards.deployed().then(async (instance) => {
        data = instance;
        const rewardKeys = await data.getRewardKeys({from: sender});
        callback(rewardKeys); // Pass the result to the callback
    }).catch((e) => {
        console.error("Error fetching reward keys:", e);
    });
}


module.exports = {
    getOwner,
    getBalance,
    getBalancePoints,
    topUpEther,
    addUserPoints,
    redeemPoints,
    addReward,
    getOneReward,
    getRewardKeys,
    delReward
}