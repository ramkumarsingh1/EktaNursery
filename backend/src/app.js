import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import net from "net";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ekta Nursery API Running",
  });
});

app.get("/test-smtp", (req, res) => {
    const socket = net.createConnection({
        host: "smtp.gmail.com",
        port: 587,
        family: 4,
    });

    socket.setTimeout(10000);

    socket.on("connect", () => {
        console.log("✅ SMTP TCP CONNECTION SUCCESS");

        socket.destroy();

        res.json({
            success: true,
            message: "SMTP connection successful",
        });
    });

    socket.on("timeout", () => {
        console.log("❌ SMTP CONNECTION TIMEOUT");

        socket.destroy();

        res.status(500).json({
            success: false,
            message: "SMTP connection timeout",
        });
    });

    socket.on("error", (error) => {
        console.log("❌ SMTP TCP ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
            code: error.code,
        });
    });
});

export default app;