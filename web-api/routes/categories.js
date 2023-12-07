var exports = require("express");
var router = exports.Router();
const CategoryController = require("../components/categories/controller");
//http://localhost:8686/categories

//http://localhost:8686/categories/
//method: GET
// 1.Lấy danh sách categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await CategoryController.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//http://localhost:8686/categories/1
//method: GET
// 2.Lấy thông tin chi tiết của 1 category
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await CategoryController.getOneById(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//http://localhost:8686/categories
//method: POST
// 3.Thêm mới 1 category
router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    await CategoryController.addNew(body);
    return res.status(200).json({ message: "Thêm mới thành công" });
  } catch (error) {
    console.log("addNew error: ", error);
    return res.status(500).json({ message: error.message });
  }
});

//http://localhost:8686/categories/1
//method: PUT
// 4.Cập nhật thông tin của 1 category
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await CategoryController.updateById(id, body);
    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.log("updateById error: ", error);
    return res.status(500).json({ message: error.message });
  }
});

//http://localhost:8686/categories/1
//method: DELETE
// 5.Xóa 1 category
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await CategoryController.deleteById(id);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});

module.exports = router;
