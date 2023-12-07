const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true, },
    created_at: { type: Date, default: Date.now}, //Thời gian tạo token
    status: { type: Boolean, default: true}, //Trạng thái token, đc sử dụng hay không
});

module.exports =  mongoose.model('ResetPass', schema) || mongoose.models.ResetPass ;