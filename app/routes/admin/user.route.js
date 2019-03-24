let router = require('koa-router')();
const userController = require('admin/users/controllers/user.controller');

module.exports = ({ router }) => {
    // getting the home route
    router.get(`/${ getAdminFolderName }`, (ctx, next) => {
      console.log(ctx);
      ctx.body('Welcome Home');
      ctx.body = ctx;
    });

    router.get(`/${ getAdminFolderName }/login`, async (ctx) => {
        console.log('/admin/login called');
        return userController.login(ctx);
    });

    router.post(`/${ getAdminFolderName }/authenticate`, async (ctx) => {
      userController.authenticate(ctx);
    });
};