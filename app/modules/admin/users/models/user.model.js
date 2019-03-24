var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const active = [true, false];
const deleted = [true, false];

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    isActive: { type: Boolean, default: true, enum: active },
    isDeleted: { type: Boolean, default: false, enum: deleted }
});

module.exports = mongoose.model('User', userSchema);