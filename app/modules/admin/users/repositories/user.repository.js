const mongoose = require('mongoose');
const userModel = require('admin/users/models/user.model');

const userRepository = {
    getAll : async (ctx) => {

    },

    save : async (user) => {
        try {
            const newUser = new userModel(user);
            const userRecord = await newUser.save();
            console.log('13', userRecord);
            return userRecord;
        } catch(error) {
            return error;
        }
    },
}

module.exports = userRepository;