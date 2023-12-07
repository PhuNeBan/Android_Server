const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  name: {
    type: String, //kiểu dữ liệu
    required: true, //bắt buộc phải có
    unique: true, //duy nhất
  },
  description: {
    type: String,
    required: true,
  },
  product: {
    type: [
      {
        _id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        image: {
          type: [String],
          required: false,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Category", schema) || mongoose.models.Category;
