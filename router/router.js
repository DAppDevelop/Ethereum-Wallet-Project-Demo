let router = require("koa-router")()
let newAccountController = require("../controllers/newAccount")
let transactionController = require("../controllers/transaction")
let accountController = require("../controllers/account")
let tokenController = require("../controllers/token")

router.get("/", (ctx, next) => {
  ctx.body = "主页"
})

router.get("/create", (ctx, next) => {
  ctx.body = "创建账户!!!"
})

//设置创建账号路由
router.get("/newaccount", newAccountController.newAccountHtml)
router.post("/newaccount", newAccountController.newAccount)

router.get("/transaction", transactionController.transactionHtml)
router.post("/sendtransaction", transactionController.sendTransaction)
router.post("/sendtoken", tokenController.sendTokenTransaction)

//查看交易详情
router.get("/checktransaction", transactionController.checkTransactionHtml)
router.post("/checktransaction", transactionController.checkTransaction)

router.post("/privateunlock", accountController.unlockAccountWithPrivate)
router.post("/keystoreunlock", accountController.unlockAccountWithKeystore)

module.exports = router
