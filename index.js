let Koa = require("koa")
let koa = new Koa()
let router = require("./router/router")

koa.use(router.routes())
koa.listen(3000)
