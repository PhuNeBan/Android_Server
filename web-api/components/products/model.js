const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    name: { type: String, required: true, unique: true, },
    price: { type: Number, required: true, },
    quantity: { type: Number, required: true, },
    detail: { type: String, required: true, },
    image: { type: String, required: true, },
    image: { type: [String], required: false, },
    category_id: { type: ObjectId, required: true, ref: 'Category' },
    

    // created_at: { type: Date, default: Date.now, },
    // updated_at: { type: Date, default: Date.now, },
    // created_by: {type: ObjectId, required: true, ref: 'User'},
    // updated_by: {type: ObjectId, required: true, ref: 'User'},
    

    // category: { type: {
    //     _id: { type: String, required: true, },
    //     name: { type: String, required: true, },    
    // }, required: false, },
});

module.exports = mongoose.model('Product', schema) || mongoose.models.Product;