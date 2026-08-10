import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                name: {
                    type: String,
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                image: {
                    type: String,
                    default: "",
                },
            },
        ],

        shippingAddress: {
            fullName: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
            },

            address: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            state: {
                type: String,
                required: true,
            },

            pincode: {
                type: String,
                required: true,
            },
        },

        paymentMethod: {
            type: String,
            enum: ["cod", "online"],
            default: "cod",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        razorpayOrderId: {
            type: String,
            default: null,
        },

        razorpayPaymentId: {
            type: String,
            default: null,
        },

        razorpaySignature: {
            type: String,
            default: null,
        },

        orderStatus: {
            type: String,
            enum: [
                "placed",
                "confirmed",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
            ],
            default: "placed",
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        deliveryCharge: {
            type: Number,
            required: true,
            min: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", orderSchema);