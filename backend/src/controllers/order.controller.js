import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
export const createOrder = async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            paymentMethod = "cod",
        } = req.body;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order items are required",
            });
        }

        // Validate shipping address
        const requiredAddressFields = [
            "fullName",
            "phone",
            "email",
            "address",
            "city",
            "state",
            "pincode",
        ];

        for (const field of requiredAddressFields) {
            if (!shippingAddress?.[field]) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required`,
                });
            }
        }

        // Validate payment method
        if (!["cod", "online"].includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method",
            });
        }

        const orderItems = [];

        let subtotal = 0;

        // Validate every product
        for (const item of items) {
            if (!item.product || !item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order item",
                });
            }

            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.product}`,
                });
            }

            // Stock check
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} has only ${product.stock} item(s) available`,
                });
            }

            const itemTotal = product.price * item.quantity;

            subtotal += itemTotal;

            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image: product.images?.[0]?.url || "",
            });
        }

        // Delivery calculation
        const deliveryCharge = subtotal > 999 ? 0 : 99;

        const totalAmount = subtotal + deliveryCharge;

        // Create order
        const order = await Order.create({
            user: req.user._id,

            items: orderItems,

            shippingAddress,

            paymentMethod,

            paymentStatus:
                paymentMethod === "cod" ? "pending" : "pending",

            orderStatus: "placed",

            subtotal,

            deliveryCharge,

            totalAmount,
        });

        // Reduce product stock
        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: {
                _id: order._id,
                totalAmount: order.totalAmount,
                paymentMethod: order.paymentMethod,
                orderStatus: order.orderStatus,
                createdAt: order.createdAt,
            },
        });
    } catch (error) {
        console.error("Create Order Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to place order",
        });
    }
};
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
        })
            .populate("items.product", "name price images")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error("Get My Orders Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch orders",
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id,
        })
            .populate(
                "items.product",
                "name price images"
            );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.error(
            "Get Order By ID Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch order",
        });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            !["placed", "confirmed"].includes(
                order.orderStatus
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "This order cannot be cancelled",
            });
        }

        // =========================
        // ONLINE PAYMENT REFUND
        // =========================

        if (
            order.paymentMethod === "online" &&
            order.paymentStatus === "paid"
        ) {
            if (!order.razorpayPaymentId) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Payment ID not found for refund",
                });
            }

            const refund =
                await razorpay.payments.refund(
                    order.razorpayPaymentId,
                    {
                        amount: Math.round(
                            order.totalAmount * 100
                        ),
                    }
                );

            console.log(
                "Razorpay Refund:",
                refund.id
            );

            order.paymentStatus = "refunded";
        }

        // =========================
        // RESTORE STOCK
        // =========================

        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: item.quantity,
                    },
                }
            );
        }

        // =========================
        // CANCEL ORDER
        // =========================

        order.orderStatus = "cancelled";

        await order.save();

        return res.status(200).json({
            success: true,
            message:
                "Order cancelled and refund initiated successfully",
            order,
        });

    } catch (error) {
        console.error(
            "Cancel Order Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to cancel order",
        });
    }
};

export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid amount is required",
            });
        }

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            message: "Razorpay order created",
            order: razorpayOrder,
        });

    } catch (error) {
        console.error("Razorpay Create Order Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create Razorpay order",
        });
    }
};


export const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            shippingAddress,
        } = req.body;

        // Payment details validation
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment details are required",
            });
        }

        // Order data validation
        if (
            !items ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Order items are required",
            });
        }

        const requiredAddressFields = [
            "fullName",
            "phone",
            "email",
            "address",
            "city",
            "state",
            "pincode",
        ];

        for (const field of requiredAddressFields) {
            if (!shippingAddress?.[field]) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required`,
                });
            }
        }

        // Generate Razorpay signature
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        // Verify signature
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        // Create order items
        const orderItems = [];
        let subtotal = 0;

        for (const item of items) {
            if (!item.product || !item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order item",
                });
            }

            const product = await Product.findById(
                item.product
            );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.product}`,
                });
            }

            // Stock check
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} has only ${product.stock} item(s) available`,
                });
            }

            const itemTotal =
                product.price * item.quantity;

            subtotal += itemTotal;

            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image:
                    product.images?.[0]?.url || "",
            });
        }

        // Delivery charge
        const deliveryCharge =
            subtotal > 999 ? 0 : 99;

        const totalAmount =
            subtotal + deliveryCharge;

        // Create paid order
        const order = await Order.create({
            user: req.user._id,

            items: orderItems,

            shippingAddress,

            paymentMethod: "online",

            paymentStatus: "paid",

            razorpayOrderId: razorpay_order_id,

            razorpayPaymentId: razorpay_payment_id,

            orderStatus: "placed",

            subtotal,

            deliveryCharge,

            totalAmount,
        });

        // Reduce stock
        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified and order created successfully",

            order: {
                _id: order._id,
                totalAmount: order.totalAmount,
                paymentMethod:
                    order.paymentMethod,
                paymentStatus:
                    order.paymentStatus,
                orderStatus:
                    order.orderStatus,
                createdAt:
                    order.createdAt,
            },
        });

    } catch (error) {
        console.error(
            "Razorpay Verification Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Payment verification failed",
        });
    }
};

