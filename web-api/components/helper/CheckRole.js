const CheckRoleAdmin = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role < 3) {
      throw new Error("Bạn không có quyền truy cập");
    }
    next();
  } catch (errors) {
    console.log("checkRole error: ", errors);
    return res.status(401).json({
      message: "Unauthorized",
      message: "Bạn không có quyền truy cập",
    });
  }
};

const CheckRoleManager = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role < 2) {
      throw new Error("Bạn không có quyền truy cập");
    }
    next();
  } catch (errors) {
    console.log("checkRole error: ", errors);
    return res.status(401).json({
      message: "Unauthorized",
      message: "Bạn không có quyền truy cập",
    });
  }
};

module.exports = {
  CheckRoleAdmin,
  CheckRoleManager,
};
