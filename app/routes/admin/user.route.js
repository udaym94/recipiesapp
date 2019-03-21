var router = require('koa-router')();

module.exports = ({ router }) => {
    // getting the home route
    router.get(`/${ getAdminFolderName }`, (ctx, next) => {
      console.log(ctx);
      ctx.body('Welcome Home');
      ctx.body = ctx;
    });

    router.get(`/${ getAdminFolderName }/login`, async (ctx, next) => {
        console.log('/admin/login called');
        return await ctx.render('login');
    });
};

// router.get('/', (ctx, next) => {
//     console.log(ctx);
//     ctx.body('Welcome Home');
//     ctx.body = ctx;
// });

// router.get('admin.login', '/login', async (ctx, next) => {
//     console.log('/admin/login called');
//     return await ctx.render('login');
// });

// module.exports = router;