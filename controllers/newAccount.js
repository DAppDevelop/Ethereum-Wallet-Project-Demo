module.exports = {
    newAccountHtml: async (ctx) => {
        await ctx.render("newaccounts.html")
    },

    newAccount: (ctx) => {
        console.log("newAccount");
        console.log(ctx.request.body.password);
        ctx.body = `密码是：${ctx.request.body.password}`
    }
}