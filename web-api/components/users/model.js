const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    email: { type: String, required: true, unique: true, },
    name: { type: String, required: true, },
    password: { type: String, required: true, },
    role: { type: Number, required: true, },
    isVerifled: { type: Boolean, default: false}, //xác thực tài khoản
});

module.exports =  mongoose.model('User', schema) || mongoose.models.User ;