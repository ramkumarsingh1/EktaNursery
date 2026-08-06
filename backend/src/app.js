import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
const app = express();

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

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ekta Nursery API Running",
  });
});

export default app;