const {
    join, resolve
} = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
const render = require('koa-ejs');
const { promisify } = require('util');
const { stat, readdir } = require('fs');

// global module import
_ = require('underscore');
require('dotenv').config();

// additional file requires
const config = require(join(__dirname, 'app', 'config'));
const getPort = config.getPort;
global.generateUrl = generateUrl = (route_name, route_param = {}) => router.use(route_name, route_param);
global.getAdminFolderName = config.getAdminFolderName;
global.getApiFolderName = config.getApiFolderName;

console.log('22', getAdminFolderName, getApiFolderName);
// koa app instance
const app = new Koa();
// Instatntiate Router
const router = new Router();
// render configuration
render(app, {
    root: join(__dirname, 'app', 'views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    compileDebug: true,
    // debug: true,
    async: true
});

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    const port = getPort;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(0);
            break;
        default:
            throw error;
    }
}

// Helper functions
async function isDirectory(f) {
    return (await promisify(stat)(f)).isDirectory();
}
async function _readdir(filePath) {
    const files = await Promise.all((await promisify(readdir)(filePath)).map(async f => {
        const fullPath = join(filePath, f);
        return (await isDirectory(fullPath)) ? await readdir(fullPath) : fullPath;
    }))
    return _.flatten(files);
}

// Middleware
app.use(KoaBody());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(async (ctx, next) => {
    const apiFiles = await _readdir(`./app/routes/${getApiFolderName}`);
    apiFiles.forEach(file => {
        if (!file && file[0] == '.') return;
        require(join(__dirname, file)) ({ router });
    });
    const adminFiles = await _readdir(`./app/routes/${getAdminFolderName}`);
    adminFiles.forEach(file => {
        if (!file && file[0] == '.') return;
        require(join(__dirname, file)) ({ router });
    });
    console.log('99', JSON.stringify(router, null, 2));
});
// router.get('/', (ctx, next) => {
//     ctx.body = "Welcome to recipies app"
//     next();
// });

if (!module.parent) {
    app.listen(getPort);
    app.on('error', onError);
    console.log(`App is running on ${(global.BASE_URL && global.BASE_URL !== '') ? global.BASE_URL : `http://${process.env.HOST}:${getPort}`}`);
}