var router = require('koa-router')();

module.exports = ({ router }) => {
    // getting the home route
    router.get('', '/', (ctx, next) => {
      console.log(ctx);
      ctx.body('Welcome Home');
      ctx.body = ctx;
    });

    router.get('login','/login', async (ctx, next) => {
        console.log('/login called');
        return await ctx.render('login');
    });
};