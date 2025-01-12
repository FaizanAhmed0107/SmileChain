const contract = require('truffle-contract');

const ether_send = require('../../web3/build/contracts/EtherSender.json');
const EtherSend = contract(ether_send);

function start(callback) {
    const self = this;
    EtherSend.setProvider(self.web3.currentProvider);

    self.web3.eth.getAccounts((err, accs) => {
        if (err != null) {
            console.log("There was an error fetching your accounts.");
            return;
        }

        if (accs.length == 0) {
            console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }
        self.accounts = accs;
        self.account = self.accounts[0];

        callback(self.account);
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
    }).catch(function (e) {
        console.log(e);
        callback("ERROR 404");
    });
}


module.exports = {start, getBalance}

