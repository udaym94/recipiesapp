const mongoose = require('mongoose');

module.exports = async () => {
    try{
        await mongoose.connect('mongodb+srv://recipiesadmin:recipiesAdminPass@cluster0-vzrbr.mongodb.net/recipiesapp?retryWrites=true', { useNewUrlParser: true });
        console.log('DB connected Successfully');
    } catch (error) {
        console.error(error);
    }
}