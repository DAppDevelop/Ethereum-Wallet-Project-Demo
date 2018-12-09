let router = require("koa-router")()
let newAccountController = require("../controllers/newAccount")

router.get("/", (ctx, next) => {
  ctx.body = "主页"
})

router.get("/create", (ctx, next) => {
  ctx.body = "创建账户!!!"
})

//设置创建账号路由
router.get("/newaccount", newAccountController.newAccountHtml)
router.post("/newaccount", newAccountController.newAccount)

module.exports = router
