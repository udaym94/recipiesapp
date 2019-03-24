const nodemailer = require('nodemailer');

const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
    getAdminFolderName : 'admin',
    getApiFolderName : 'api',
    getFrontFolderName : 'front',
    getPort : 1105,
}