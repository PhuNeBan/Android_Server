const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'dohoangphu.it@gmail.com',
        pass: 'obnhwymxnteibbbxzso'
    },
});
const sendMail = async (data) => {
    try {
        const { email, subject, content } = data;
        const mailOptions = {
            from: 'dohoangphu.it@gmail.com',
            to: email,
            subject,
            html: content,
        };
        await transporter.sendMail(mailOptions);
        return true;
    }
    catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi gửi email');
    }
}

module.exports = {
    sendMail,
}