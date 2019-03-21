const nodemailer = require('nodemailer');

const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
    getAdminFolderName : 'admin',
    getApiFolderName : 'api',
    getPort : 1105,
}