const mongoose = require('mongoose');
const roleModel = require('admin/role/models/role.model');

const roleRepository = {
    getAll : async (ctx) => {

    },

    save : async (role) => {
        try {
            const newRole = new roleModel(role);
            const roleRecord = await newRole.save();
            console.log('13', roleRecord);
            return roleRecord;
        } catch(error) {
            return error;
        }
    },
}

module.exports = roleRepository;