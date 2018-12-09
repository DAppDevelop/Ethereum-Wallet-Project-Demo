let koa = require("koa")
let app = new koa()
let router = require("./router/router")
let koastatic = require("koa-static")
let path = require("path")
let views = require("koa-views")
let koabody = require("koa-body")

//打印每个请求的方法和url
app.use(async (ctx, next)=>{
    let logMessage = `${ctx.method} ${ctx.url} --------------`
    console.log(logMessage)
    await next()
})

app.use(koabody({multipart:true}))//针对于文件上传的时候，可以解析多个字段
app.use(koastatic(path.join(__dirname, "static")))//注册静态文件的库到中间件
app.use(views(path.join(__dirname, "views"), {extension:"ejs", map:{html:"ejs"}}))//注册模板引擎的库到中间件
app.use(router.routes())

console.log("正在监听3000端口");
app.listen("3000")
