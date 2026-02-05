const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"CarCare Support" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent // Yahan 'text' ki jagah 'html' use karein
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;