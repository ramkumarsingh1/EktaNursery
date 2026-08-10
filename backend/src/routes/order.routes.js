import express from "express";

import { createOrder ,getMyOrders} from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create Order
router.post("/", verifyJWT, createOrder);
router.get("/my-orders", verifyJWT, getMyOrders);
export default router;