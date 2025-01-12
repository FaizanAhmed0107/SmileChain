const Web3 = require('web3');
const contract = require('truffle-contract');
const ether_send = require('../../web3/build/contracts/EtherSender.json');
const EtherSend = contract(ether_send);


function getOwner(callback) {
    const self = this;
    EtherSend.setProvider(self.web3.currentProvider);
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
    EtherSend.setProvider(self.web3.currentProvider);
    let data;
    EtherSend.deployed().then(async (instance) => {
        data = instance;
        const balance = await data.getBalance({from: sender});
        callback(balance.toString()); // Balance is converted to a string for compatibility
    }).catch((e) => {
        console.log(e);
        res.status(404);
        throw new Error('Failed to get Balance');
    });
}

function sendEther(sender, receiver) {
    const self = this;
    EtherSend.setProvider(self.web3.currentProvider);
    let data;
    EtherSend.deployed().then(async (instance) => {
        data = instance;
        await instance.sendEther(
            receiver,
            Web3.utils.toWei("0.01", "ether"),
            {
                from: sender,
                value: Web3.utils.toWei("0.01", "ether"), // Sending Ether
                gas: 3000000,
            }
        );
    }).catch((e) => {
        console.log(e);
        res.status(404);
        throw new Error('Failed to send Ether');
    });
}


module.exports = {getOwner, getBalance, sendEther}