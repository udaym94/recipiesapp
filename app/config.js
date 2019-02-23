const nodemailer = require('nodemailer');

const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
    adminFolderName : 'admin',
    apiFolderName : 'api',
    getPort : 1105,
}