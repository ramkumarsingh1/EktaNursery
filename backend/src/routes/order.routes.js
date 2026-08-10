import express from "express";

import { createOrder } from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create Order
router.post("/", verifyJWT, createOrder);

export default router;