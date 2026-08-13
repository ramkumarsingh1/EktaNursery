import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = async (req, res) => {
    try {
        // Total active products
        const totalProducts = await Product.countDocuments({
            isActive: true,
        });

        // Total orders
        const totalOrders = await Order.countDocuments({
            orderStatus: {
                $ne: "cancelled",
            },
        });

        // Total customers
        const totalCustomers = await User.countDocuments({
            role: "user",
        });

        // Total revenue
        const revenueResult = await Order.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                    orderStatus: {
                        $ne: "cancelled",
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]);

        const totalRevenue =
            revenueResult[0]?.totalRevenue || 0;

        return res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalOrders,
                totalCustomers,
                totalRevenue,
            },
        });
    } catch (error) {
        console.error(
            "Dashboard Stats Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch dashboard stats",
        });
    }
};