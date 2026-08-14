import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
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