
const tinhToan = (a,b, tenPhepToan) => {
    let ketQua;
    switch (tenPhepToan) {
        case "cong":
            ketQua = a + b;
            break;
        case "tru":
            ketQua = a - b;
            break;
        case "nhan":
            ketQua = a * b;
            break;
        case "chia":
            ketQua = a / b;
            break;
        default:
            break;
    }
    return ketQua;
}

module.exports = tinhToan;