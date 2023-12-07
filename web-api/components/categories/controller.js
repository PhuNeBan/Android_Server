// controller dùng để tương tác với db
const CategoryModel = require("./model");

//lấy danh sách danh mục
const getAll = async () => {
  try {
    // select * from categories
    const categories = await CategoryModel.find({});

    // select name from categories
    // const categories = await CategoryModel.find({}, 'name');

    // select name, description from categories where name like '%a%'
    // const categories = await CategoryModel.find({description: /Gilston/ }, "name description");
    return categories;
  } catch (error) {
    console.log("getAll error: ", error);
    throw new Error("Có lỗi xảy ra khi lấy danh sách categories");
  }
};

//lấy chi tiết 1 danh mục
const getOneById = async (id) => {
  try {
    // select * from categories where id = id
    const category = CategoryModel.findById(id);
    return category;
  } catch (error) {
    console.log("getOneById error: ", error);
    throw new Error("Có lỗi xảy ra khi lấy chi tiết 1 categories");
  }
};

// thêm mới 1 danh mục
const addNew = async (data) => {
  try {
    const { name, description } = data;
    const category = new CategoryModel({ name, description });
    await category.save();
  } catch (error) {
    console.log("addNew error: ", error);
    throw new Error("Có lỗi xảy ra khi thêm mới 1 categories");
  }
};

// Cập nhật 1 danh mục
const updateById = async (id, data) => {
  try {
    const { name, description } = data;
    const category = await CategoryModel.findById(id);
    if (category) {
      category.name = name;
      category.description = description;
      await category.save();
    } else {
      throw new Error("Có lỗi xảy ra khi cập nhật 1 categories");
    }
  } catch (error) {
    console.log("updateById error: ", error);
    throw new Error("Có lỗi xảy ra khi cập nhật 1 categories");
  }
};

//xóa 1 danh mục
const deleteById = async (id) => {
  try {
    await CategoryModel.findByIdAndDelete(id);
  } catch (error) {
    console.log("deleteById error: ", error);
    throw new Error("Có lỗi xảy ra khi xóa sản phẩm");
  }
};

module.exports = {
  getAll,
  getOneById,
  addNew,
  updateById,
  deleteById,
};

/**
 * 1. App android (dùng lại react native/tự viết)
 * 2. Web admin (reactjs) - giao diện 5 trang
 */
