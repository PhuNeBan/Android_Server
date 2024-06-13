const express = require("express");
const router = express.Router();
// const calculate = require("../components/calculator.js");
const upload = require("../components/helper/Upload");

//http://localhost:8686/
const testing2 = (req, res, next) => {
  console.log("testing 1 middleware");
  next();
};

//bắt lỗi, uploand file, kiểm lỗi, cố thể gọi
//upload file
//middleware upload file
//http://localhost:8686/upload-file
//middleware xử lý trung gian
router.post(
  "/upload-file",
  [upload.single("image")],
  async (req, res, next) => {
    // req.files; lưu thông tin file
    // req.body; lưu thông tin dữ liệu
    // return res.json({message: 'testing 1 middleware'});
    console.log(req.file);
    //const path = req.file.path.replace("public", "");
    // cmd --> ipconfig --> IPv4 Address
    // IPv4 172.16.108.63
    // const path = "http://192.168.10.105:8686/images/" + req.file.filename 
    const path = "http://192.168.10.245:8686/images/" + req.file.filename 
    return res.json({path: path});
    //  res.send('Upload file thành công');
  }
);

// method: POST

/* GET home page. */
router.get("/", function (req, res, next) {
  // render: html, css. js
  // res.render('index', { title: 'Express' });
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // json javascript object notation
  return res.json({ message: "Hello word", array: arr });
});

/**
 * http://localhost:8686/hello?name=world
 * Method: GET
 */
router.get("/hello", function (req, res, next) {
  const { name } = req.query;
  console.log(name);
  return res.json({ message: "Hello" + name });
});

/**
 * http://localhost:8686/dien-tich-tam-giac?day=10&cao=5
 * method: GET
 */
router.get("/dien-tich-tam-giac", function (req, res, next) {
  let { day, cao } = req.query;
  day = Number(day);
  cao = Number(cao);
  const dienTich = (day * cao) / 2;
  return res.json({ message: "Dien tich tam giac la: " + dienTich });
});

/**
 * http://localhost:8686/phep-toan/cong?a=10&b=5
 * http://localhost:8686/phep-toan/tru?a=10&b=5
 * http://localhost:8686/phep-toan/nhan?a=10&a=5
 * http://localhost:8686/phep-toan/chia?a=10&cao=5
 * method: GET
 */

// http://localhost:8686/phep-toan/cong?a=10&b=5
router.get("/phep-toan/:tenPhepToan", (req, res, next) => {
  const { tenPhepToan } = req.params;
  const { a, b } = req.query;
  const soA = Number(a);
  const soB = Number(b);
  let ketQua;
  switch (tenPhepToan) {
    case "cong":
      ketQua = soA + soB;
      break;
    case "tru":
      ketQua = soA - soB;
      break;
    case "nhan":
      ketQua = soA * soB;
      break;
    case "chia":
      ketQua = soA / soB;
      break;
    default:
      break;
  }
  return res.json({
    message: "Phep toan" + " " + tenPhepToan + " " + "la:" + " " + ketQua,
  });
});

/**
 * http://localhost:8686/tinh-toan/10/20/cong
 * http://localhost:8686/tinh-toan/10/20/tru
 * http://localhost:8686/tinh-toan/10/20/nhan
 * http://localhost:8686/tinh-toan/10/20/chia
 * method: GET
 */
router.get("/tinh-toan/:a/:b/:tenPhepToan", (req, res, next) => {
  const { a, b, tenPhepToan } = req.params;
  const soA = Number(a);
  const soB = Number(b);
  const ketQua = calculate(soA, soB, tenPhepToan);

  return res.json({
    message: "Phep toan" + " " + tenPhepToan + " " + "la:" + " " + ketQua,
  });
});

/**
 * http://localhost:8686/tinh-toan
 * method: POST
 */
router.post("/tinh-toan", (req, res, next) => {
  const { a, b, tenPhepToan } = req.body;
  const soA = Number(a);
  const soB = Number(b);
  const ketQua = calculate(soA, soB, tenPhepToan);

  return res.json({
    message: "Phep toan" + " " + tenPhepToan + " " + "la:" + " " + ketQua,
  });
});

module.exports = router;

/**
 * HTTP
 */
