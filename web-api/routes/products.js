const express = require("express");
const router = express.Router();
const ProductController = require("../components/products/controller");
const checkToken = require("../components/helper/CheckToken");
const validattion = require("../components/helper/Validation");
//no remove
//http://localhost:8686/products

/**
 * Lấy danh sách sản phẩm
 * http://localhost:8686/products?page=1&limit=10
 * method: GET
 */
router.get("/", async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const products = await ProductController.getAll(page, limit);
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Lấy chi tiết sản phẩm theo id
 * http://localhost:8686/products/654b1ac9fc13ae4d862f9a6b
 * 
 * method: GET
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductController.getOneById(id);
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Tìm kiếm sản phẩm theo id
 * http://localhost:8686/products/654b1ac9fc13ae4d862f9a6b
 * method: GET
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductController.search(id);
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Tìm kiếm sản phẩm có chứa từ khóa
 * http://localhost:8686/products/search/name/?keyword=iphone
 * method: GET
 */
router.get("/search/name", async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const product = await ProductController.search(keyword);
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Thêm mới 1 sản phẩm
 * http://localhost:8686/products
 * method: POST
 */
// router.post("/", [checkToken, validattion.validateProduct], async (req, res, next) => {
  router.post("/",  async (req, res, next) => {
  try {
    const { body, user } = req;
    // xác định ai là người tạo sản phẩm
    // await ProductController.create(body, user._id, user._id);
    await ProductController.create(body);
    return res.status(200).json({ message: "Thêm mới sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Cập nhật sản phẩm theo id
 * http://localhost:8686/products/654b1ac9fc13ae4d862f9a6b
 * method: PUT
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await ProductController.updateById(id, body);
    return res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
 * Xóa sản phẩm theo id
 * http://localhost:8686/products/654b1ac9fc13ae4d862f9a6b
 * method: DELETE
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductController.deleteById(id);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({status: false});
  }
});

//no remove
module.exports = router;
