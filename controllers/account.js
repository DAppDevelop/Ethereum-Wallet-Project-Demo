let web3 = require("../utils/myUtils").getweb3()
let {success, fail} = require("../utils/myUtils")

async function getAccountBalance(address) {
    let balance = await web3.eth.getBalance(address)
    return web3.utils.fromWei(balance, "ether")
}

//配置返回给前端的数据，包含以太币的数据，还有ｔｏｋｎｅ的数据
async function setResponseData(account) {
    //获取账户余额
    let balance = await getAccountBalance(account.address)
    console.log(balance)

    //获取代币的数据
    // let myBalance = await myContract.methods.balanceOf(account.address).call()
    // let decimals = await myContract.methods.decimals().call()
    // myBalance = myBalance / Math.pow(10, decimals)
    // let symbol = await myContract.methods.symbol().call()

    //返回相应数据给前端
    return success({
        balance: balance,
        address: account.address,
        // privatekey: account.privateKey,
        // tokenbalance: myBalance,
        // symbol: symbol
    })
}

module.exports = {
    unlockAccountWithPrivate: async (ctx) => {
         //１．获取私钥
        let privatekey = ctx.request.body.privatekey
        console.log(privatekey)
        //2.通过私钥解锁账户
        let account = web3.eth.accounts.privateKeyToAccount(privatekey)
        console.log(account)
         //３．将账户信息返回给前端
        //  ctx.body = await setResponseData(account)
        let balance = await getAccountBalance(account.address)
        console.log(balance)
        //３．将账户信息返回给前端
        ctx.body = await setResponseData(account)
    }
}