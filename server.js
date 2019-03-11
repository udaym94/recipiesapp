const {
    join,
} = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
const render = require('koa-ejs');

// globa module import
_ = require('underscore');
require('dotenv').config();

// additional file requires
const config = require(join(__dirname, 'app', 'config'));
const getPort = config.getPort;

// koa app instance
const app = new Koa();
// Instatntiate Router
const router = new Router();
// render configuration
render(app, {
    root: join(__dirname, 'app', 'views'),
    layout: 'layouts/',
    viewExt: 'html',
    cache: false,
    debug: true
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

router.get('/', (ctx, next) => {
    ctx.body = "Welcome to recipies app"
    next();
});

if (!module.parent) {
    app.listen(getPort);
    app.on('error', onError);
    console.log(`App is running on ${(global.BASE_URL && global.BASE_URL !== '') ? global.BASE_URL : `http://${process.env.HOST}:${getPort}`}`);
}