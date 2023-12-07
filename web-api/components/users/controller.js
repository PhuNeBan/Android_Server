const UserModel = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../helper/Mailer");
const ResetPassword = require("./modelResetPass");

// đăng ký tài khoản
const register = async (data) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  try {
    const { email, name, password, role } = data;
    // tìm tài khoản trong db có email
    // mã hóa tài khoản
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new UserModel({ email, name, password: hash, role });
    await user.save();
    // gửi email xác thực tài khoản
    // worker thread
    setTimeout(() => {
      mailer.sendMail({
        email: user.email,
        subjec: "Xác thực tài khoản",
        content: `Link xác thực tài khoản: http://localhost:3000/verify-user/${user._id}`
      });
      console.log(">>>>>>>>>>>> Send mail");
    }, 0);
  } catch (error) {
    console.log("register error: ", error);
    throw new Error("Có lỗi khi đăng ký tài khoản");
  }
};

// đăng nhập
const login = async (data) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  try {
    const { email, password } = data;
    // tìm tài khoản trong db có user
    let user = await UserModel.findOne({ email: email });
    console.log(user, email, password);
    if (!user) {
      throw new Error("Không tìm thấy tài khoản");
    }
    // kiểm tra mật khẩu
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Mật khẩu không chính xác");
    }
    // xóa field password trong user
    user.password = undefined;
    // tạo token sử dụng jwt
    const token = jwt.sign(
      { _id: user.id, name: user.name, email: user.email, role: user.role },
      "phudeptrai",
      { expiresIn: 1 * 1 * 1 * 60 }
    );
    user = { ...user._doc, token };
    return user;
  } catch (error) {
    console.log("login error: ", error);
    throw new Error("Có lỗi khi đăng nhập");
  }
};

// xác thực tài khoản
const verify = async (id) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("Không tìm thấy tài khoản");
    }
    if (user.isVerifled) {
      throw new Error("Tài khoản đã được xác thực");
    }
    user.isVerified = true;
    await user.save();
    return true;
  } catch (errors) {
    console.log("verify error: ", errors);
    return false;
  }
}

// cập nhật thông tin tài khoản
const updateProfile = (id, data) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  return {};
};

// đổi mật khẩu
const changePassword = (id, data) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  return {};
};

// forgot password
const forgotPassword = async (email) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  try {
    // tìm user theo email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Không tìm thấy tài khoản");
    }
    // tạo token sử dụng jwt
    const token = jwt.sign(
      { _id: user._id, email: user.email }, //lưu thông tin vào token
      "phudeptrai",
      { expiresIn: 1 * 5 * 60 } // hết hạn khi nào
    );
    // lưu token và email vào db
    const resetPassword = new ResetPassword({
      email: user.email,
      token
    });
    await resetPassword.save();
    // gửi email khôi phục mật khẩu
    setTimeout(() => {
      mailer.sendMail({
        email: user.email,
        subjec: "Khôi phục mật khẩu",
        content: `Link khôi phục mật khẩu: http://localhost:3000/reset-password/${token}`
      });
      console.log(">>>>>>>>>>>> Send mail");
    }, 0);
    return true;
  } catch (error) {
    console.error  // worker thread
    return false;
  }
};

//check token reset password

const checkTokenResetPassword = async (token) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  try {
    const decoded = jwt.verify(token, "phudeptrai");
    if (decoded) {
      const { email } = decoded;
      const resetPassword = await ResetPassword.findOne({
        email,
        token,
        status: true,
        created_at: { $gte: new Date(Date.now() - 1 * 1 * 10 * 60 * 1000) }
      });
      if (resetPassword) {
        return true;
      }
      console.error // worker thread
      return false;
    }
    return false;
  } catch (error) {
    console.error  // worker thread
    return false;
  }
};

const resetPassword = async (password, token) => {
  try {
    const decoded = jwt.verify(token, "phudeptrai");
    if (!decoded) throw new Error("Token không hợp lệ");
    const { email } = decoded;
    const resetPassword = await ResetPassword.findOne({
      email,
      token,
      status: true,
      created_at: { $gte: new Date(Date.now() - 1 * 1 * 10 * 60 * 1000) }
    });
    if (!resetPassword) throw new Error("Token không hợp lệ");

    // mã hóa mật khẩu
    const salt = bcrypt.createSalt(10);
    const hashPassword = bcrypt.createHash(password, salt);
    // lưu mật khẩu mới vào db
    const user = await UserModel.findOne({ email });
    user.password = hashPassword;
    await user.save();
    // xóa token khỏi db
    await ResetPassword.updateOne({ email, token }, { status: false });
    return true;
  } catch (error) {
    console.error  // worker thread
    return false;
  }

}


// xem danh sách tài khoản
const getAllUsers = () => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  return [];
};

// xem chi tiết tài khoản
const getUserById = async (id) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("Không tìm thấy tài khoản");
    }
    return user;
  } catch (error) {
    console.log("getUserById error: ", error);
    throw new Error("Có lỗi khi lấy thông tin tài khoản");
  }
};

// tìm kiếm tài khoản
const searchUser = (keyword) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  return [];
};

// khóa tài khoản
const lockUser = (id) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  return {};
};

// mở khóa tài khoản
const unlockUser = (id) => {
  // lấy dữ liệu từ database
  // trả về dữ liệu cho client
  return {};
};

module.exports = {
  register,
  login,
  verify,
  updateProfile,
  changePassword,
  forgotPassword,
  getAllUsers,
  getUserById,
  searchUser,
  lockUser,
  unlockUser,
  checkTokenResetPassword,
 resetPassword
};
