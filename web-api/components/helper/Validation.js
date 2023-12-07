const validateProduct = (req, res, next) => {
    try {
        const { name, price, quantity} = req.body;
        if (!name) throw new Error("Tên sản phẩm không được để trống");
        if (!price) throw new Error("Giá sản phẩm không được để trống");
        if (!quantity) throw new Error("Số lượng sản phẩm không được để trống");
        //giá và số lượng phải số, và dương
        if (isNaN(price)) throw new Error("Giá sản phẩm phải là số");
        if (isNaN(quantity)) throw new Error("Số lượng sản phẩm phải là số");
        if (price <= 0) throw new Error("Giá sản phẩm phải lớn hơn 0");
        next();
    } catch (error) {
        console.log("validateProduct error: ", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
  validateProduct,
};

