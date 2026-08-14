import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    family: 4,
});

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ MAIL TRANSPORTER ERROR:");
        console.error(error);
    } else {
        console.log("✅ MAIL SERVER READY");
    }
});

export default transporter;