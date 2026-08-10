import express from "express";

import { createOrder ,getMyOrders, createRazorpayOrder,
    verifyRazorpayPayment,} from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create Order
router.post("/", verifyJWT, createOrder);
router.get("/my-orders", verifyJWT, getMyOrders);
router.post(
    "/payment/create",
    verifyJWT,
    createRazorpayOrder
);

router.post(
    "/payment/verify",
    verifyJWT,
    verifyRazorpayPayment
);
export default router;