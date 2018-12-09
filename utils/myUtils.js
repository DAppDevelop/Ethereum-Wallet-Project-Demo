module.exports = {
    getweb3: () => {
        let Web3 = require("web3")
        var web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
        return web3
    }
}