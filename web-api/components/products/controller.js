// khai báo các hàm xử lý logic
const ProductModel = require("./model");

// lấy danh sách sản phẩm
const getAll = async (page, limit) => {
  try {
    page = page || 1;
    limit = limit || 200;
    const skip = (page - 1) * limit;
    let query = {};
    //lấy sản phẩm có giá lớn hơn 100
    //query.price = { $gt: 90 }; //greater than equal
    //lấy sản phẩm có giá nhỏ hơn 30 hoặc lớn hơn 70
    // query.price = { $lt: 30, $gt: 70 }; //greater than equal
    // query = {
    //     $or: [
    //         { price: { $lt: 30 } },
    //         { price: { $gt: 70 } }
    //     ],
    //     $and:[
    //         {quantity: {$gt: 50}}, //điều kiện
    //         {quantity: {$lt: 100}}
    //     ]
    // }
    //lấy sản phẩm có giá là 10 và số lượng là 20
    // query = {
    //     quantity: 20
    // }
    // query = {
    //     ...query,
    //     price: {$in: [10, 20, 30]}
    // }
    const product = await ProductModel.find({})
      .skip(skip)
      .limit(limit)
      .populate("category_id", "name");
    return product;
  } catch (error) {
    console.log("getAllProducts error: ", error);
    throw new Error("Có lỗi xảy ra khi lấy danh sách sản phẩm");
  }
};

// lấy chi tiết sản phẩm
const getOneById = async (id) => {
  try {
    const product = await ProductModel.findById(id);
    return product;
  } catch (error) {
    console.log("getProductById error: ", error);
    throw new Error("Có lỗi xảy ra khi lấy chi tiết sản phẩm");
  }
};

// tìm kiếm sản phẩm
const search = async (id) => {
  try {
    const product = await ProductModel.find({ name: new RegExp(id, "i") });
    return product;
  } catch (error) {
    console.log("search error: ", error);
    throw new Error("Có lỗi xảy ra khi tìm kiếm sản phẩm");
  }
};

// thêm mới sản phẩm
// const create = async (data, created_by, updated_by) => {
  const create = async (data) => {
  
  try {
    const { name, price, quantity, detail, image, category_id } = data;
    const product = new ProductModel({
      name,
      price,
      quantity,
      detail,
      image,
      category_id,
      // created_by,
      // updated_by,
    });
    await product.save();
  } catch (error) {
    console.log("create error: ", error);
    throw new Error("Có lỗi xảy ra khi thêm mới sản phẩm");
  }
};

// cập nhật sản phẩm
const updateById = async (id, data) => {
  try {
    const { name, price, quantity, detail, image, category_id } = data;
    const product = await ProductModel.findById(id);
    if (!product) throw new Error("Không tìm thấy sản phẩm");
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.detail = detail || product.detail;
    product.image = image || product.image;
    product.category_id = category_id || product.category_id;
    await product.save();
  } catch (error) {
    console.log("updateById error: ", error);
    throw new Error("Có lỗi xảy ra khi cập nhật sản phẩm");
  }
};

// xóa sản phẩm
const deleteById = async (id) => {
  try {
    await ProductModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("deleteById error: ", error);
    throw new Error("Có lỗi xảy ra khi xóa sản phẩm");
  }
};

module.exports = {
  getAll,
  getOneById,
  search,
  create,
  updateById,
  deleteById,
};
