// Load Required Packages
const koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const { join, resolve } = require('path');
const render = require('koa-ejs');
const { stat, readdir } = require('fs');
const { promisify } = require('util');
const http = require('http');
_ = require('underscore');
require('dotenv').config();
// additional file requires
const config = require(join(__dirname, 'app', 'config'));

// Instantiate Koa
const app = new koa();

// Name Configurations
// global.generateUrl = generateUrl = (route_name, route_param = {}) => router.urlFor(route_name, route_param);
const getPort = config.getPort;
// const getAdminFolderName = config.adminFolderName;
// const getApiFolderName = config.apiFolderName;
global.BASE_URL = `http://${process.env.HOST}:${getPort}`;

// additional configurations
// async function _isDirectory(f) {
//     return (await promisify(stat)(f)).isDirectory();
// }
// async function _readDir(filePath) {
//     const files = await Promise.all((await promisify(readdir)(filePath)).map(async f => {
//         const fullPath = join(filePath, f);
//         return (await _isDirectory(fullPath)) ? await readdir(fullPath) : fullPath;
//     }))
//     return _.flatten(files);
// }

// Instatntiate Router
const router = new Router();

// render configuration
render(app, {
	root: join(__dirname, 'app', 'views'),
	layout: 'layouts/',
	viewExt: 'html',
	cache: false,
	debug: true
})

// Middleware
// app.use(koaBody());

app.use(async (ctx, next) => {
    console.log('53');
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    const port = getPort;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

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

// Auth Middleware
// app.use((ctx, next) => {
// 	console.log('83',ctx._matchedRoute)	;
// 	process.exit(0);
// 	next();
// });

router.get('/', (ctx, next) => {
	// ctx.router available
	console.log('context', ctx);
	console.log('1234567890');
    process.exit(0);
    next();
});

app.use(router.routes());
app.use(router.allowedMethods());
(async () => { //IIFE for Routes and some other required confogurations
	try{
		// const apiFiles = await _readDir(`./app/routes/${getApiFolderName}`);
		// apiFiles.forEach(file => {
		// 	if (!file && file[0] == '.') return;
		// 	router.use('', `/${getApiFolderName}`, require(join(__dirname, file)));
		// });
		// const adminFiles = await _readDir(`./app/routes/${getAdminFolderName}`);
		// adminFiles.forEach(file => {
		// 	if (!file && file[0] == '.') return;
		// 	require('./'+file)({ router });
		// });
		// console.log('Routes (Api + Admin) loaded');

		// app.use(router.routes());
		// app.use(router.allowedMethods());

		console.log('111', JSON.stringify(router));
		const server = http.createServer(app);
        server.listen(getPort);
        server.on('error', onError);
        console.log(`App is running on ${(global.BASE_URL && global.BASE_URL !== '') ? global.BASE_URL : `http://${process.env.HOST}:${getPort}`}`);
	} catch(error) {
		console.error(error);
	}

})();


app.listen();