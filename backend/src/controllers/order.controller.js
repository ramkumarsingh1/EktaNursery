import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

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