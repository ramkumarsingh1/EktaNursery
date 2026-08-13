import express from "express";

import {
    createOrder, getMyOrders, createRazorpayOrder,
    verifyRazorpayPayment, getOrderById, cancelOrder,getAllOrders,
updateOrderStatus,getAdminOrderById,
} from "../controllers/order.controller.js";
import { verifyJWT,verifyAdmin, } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create Order
router.post("/", verifyJWT, createOrder);
router.get("/my-orders", verifyJWT, getMyOrders);
router.patch(
    "/:id/cancel",
    verifyJWT,
    cancelOrder
);
router.get("/:id", verifyJWT, getOrderById);
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

router.get(
    "/admin/all",
    verifyJWT,
    verifyAdmin,
    getAllOrders
);
router.get(
    "/admin/:id",
    verifyJWT,
    verifyAdmin,
    getAdminOrderById
);

router.patch(
    "/admin/:id/status",
    verifyJWT,
    verifyAdmin,
    updateOrderStatus
);
export default router;