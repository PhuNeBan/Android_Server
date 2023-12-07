const express = require('express');
const router = express.Router();
const UserController = require("../components/users/controller");
const checkToken = require('../components/helper/CheckToken');
const checkRole = require('../components/helper/CheckRole');

//http://localhost:8686/users

/**
 * Đăng ký tài khoản
 * http://localhost:8686/users/register
 * method: POST
 */
router.post('/register', async (req, res, next) => {
  try {
    const { body } = req;
    await UserController.register(body);
    return res.status(200).json(body);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * lấy thông tin tài khoản
 *http://localhost:8686/users/profile
 * method: GET
 */

router.get('/profile', async (req, res, next) => {
  try {
    const { user } = req;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * Verify tài khoản
 * http://localhost:8686/users/verify/:id
 * method: POST
 * Xác thực tài khoản
 */
router.post('/verify/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserController.verify(id);
    return res.status(200).json({ status: result });
  } catch (error) {
    return res.status(500).json({ status: false, error: error });
  }
});

/**
 * Forgot Password
 * http://localhost:8686/users/forgot-password
 * method: POST
 * quên mật khẩu
 */
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await UserController.forgotPassword(email);
    console.log('>>>>>>>>>>>>>>', result);
    return res.status(200).json({ status: result });
  } catch (error) {
    console.error("Lỗi: ", error );
    return res.status(500).json({ status: false, error: error });
    
  }
});


/**
 * Forgot Password
 * http://localhost:8686/users/check-token-reset-password
 * method: POST
 * kiểm tra token của reset password
 */
router.post('/check-token-reset-password', async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = await UserController.checkTokenResetPassword(token);
    return res.status(200).json({ status: result });
    console.log(result);
  } catch (error) {
    return res.status(500).json({ status: false, error: error });
  }
});



/**
 * Đăng nhập
 * http://localhost:8686/users/login
 * method: POST
 */
router.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UserController.login(body);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


//testing token
//http://localhost:8686/users/test-token
//authentication: Chứng thực
//authenrization: Phân quyền'
//1: user
//2: manager
//3: admin

router.get('/test-token', [checkToken, checkRole.CheckRoleManager], async (req, res, next) => {
  try {
    console.log('>>>>>>>>>>>', req.user);
    return res.status(200).json({ message: 'Test thành công' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
