let koa = require("koa")
let app = new koa()
let router = require("./router/router")
let koastatic = require("koa-static")
let path = require("path")
let views = require("koa-views")
let koabody = require("koa-body")

app.use(async (ctx, next)=>{
    let logMessage = `${ctx.method} ${ctx.url} --------------`
    console.log(logMessage)
    await next()
})

app.use(koabody({multipart:true}))
app.use(koastatic(path.join(__dirname, "static")))
app.use(views(path.join(__dirname, "views"), {extension:"ejs", map:{html:"ejs"}}))
app.use(router.routes())

console.log("正在监听3000端口");
app.listen("3000")
