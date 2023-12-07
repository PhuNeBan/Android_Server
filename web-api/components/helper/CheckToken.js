const jwt = require("jsonwebtoken");
// đọc tolen từ header của api

const checkToken = (req, res, next) => {
  try {
    // lấy token từ header
    const token = req.headers.authorization.split(" ")[1];
    // xử lý token
   if (!token) {
      throw new Error("Không tìm thấy token");
    }
    else {
        // kiểm tra token: đúng token, đúng key, hạn sử dụng token
        jwt.verify(token, "phudeptrai", (err, decoded) => {
          if (err) {
            throw new Error("Token không hợp lệ");
          }
          else {
            // lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở sau
            req.user = decoded;
            next();
          }
        });
    }
  } catch (errors) {
    console.log("checkToken error: ", errors);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = checkToken;
