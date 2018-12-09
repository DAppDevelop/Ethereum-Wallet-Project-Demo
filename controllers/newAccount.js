let web3 = require("../utils/myUtils").getweb3()
let fs = require("fs")
let path = require("path")


module.exports = {
    newAccountHtml: async (ctx) => {
        await ctx.render("newaccounts.html")
    },

    newAccount: async (ctx) => {
        // console.log("newAccount");
        // console.log(ctx.request.body.password);
        // ctx.body = `密码是：${ctx.request.body.password}`
        
        //1.创建钱包账号
        let account = web3.eth.accounts.create(ctx.request.body.password)
        console.log(account)
        //2.根据账号和密码生成keystore配置文件
        let keystore = account.encrypt(ctx.request.body.password)
        console.log(keystore)
        //3.将keysotr保存到文件
        let keystoreString = JSON.stringify(keystore)
        let time = new Date()
        //account.address 去掉0x，取后面地址
        let fileName = 'UTC--'+time.toISOString()+'--'+account.address.slice(2)
        //UTC--2018-12-09T13:43:53.954Z--Ef6B021154bB611316807F3FC6edBF10229Ab534
        console.log(fileName)
        let filePath = path.join(__dirname, "../static/keystore", fileName)
        fs.writeFileSync(filePath, keystoreString)

        await ctx.render("../views/downloadkeystore.html", {
            "downloadurl" : "keystore/"+fileName,
            "privatekey" : account.privateKey
        }) 
    }
}