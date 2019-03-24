const mongoose = require('mongoose');
const roles = ['admin', 'user'];
const active = [true, false];
const deleted = [true, false];

const roleSchema = new mongoose.Schema({
    role: { type: String, enum: roles },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true, enum: active },
    isDeleted: { type: Boolean, default: false, enum: deleted },
});

module.exports = mongoose.model('Role', roleSchema);