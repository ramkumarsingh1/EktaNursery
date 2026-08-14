import axios from "axios";

const sendEmail = async ({ to, subject, html }) => {
    const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            sender: {
                name: "EktaNursery",
                email: process.env.EMAIL_FROM,
            },
            to: [
                {
                    email: to,
                },
            ],
            subject,
            htmlContent: html,
        },
        {
            headers: {
                accept: "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "content-type": "application/json",
            },
        }
    );

    return response.data;
};

export default sendEmail;