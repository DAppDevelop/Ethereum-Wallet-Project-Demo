let router = require("koa-router")()

router.get("/", (ctx, next) => {
  ctx.body = "主页"
})

router.get("/create", (ctx, next) => {
  ctx.body = "创建账户"
})

module.exports = router
