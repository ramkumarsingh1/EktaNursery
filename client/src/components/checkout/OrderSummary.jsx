import { useSelector, useDispatch } from "react-redux";
import Button from "../ui/Button";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import {
    createOrder,
    createRazorpayOrder,
    verifyRazorpayPayment,
} from "../../api/orderApi";

export default function OrderSummary({
    formData,
    paymentMethod,
}) {
    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        subtotal > 999 ? 0 : 99;

    const total = subtotal + deliveryCharge;

    const validateForm = () => {
        const requiredFields = [
            "fullName",
            "phone",
            "email",
            "address",
            "city",
            "state",
            "pincode",
        ];

        for (const field of requiredFields) {
            if (!formData[field]?.trim()) {
                alert(
                    `Please enter ${field}`
                );
                return false;
            }
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty");
            return false;
        }

        return true;
    };

    const handleCodOrder = async () => {
        try {
            const orderData = {
                items: cartItems.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                })),

                shippingAddress: formData,

                paymentMethod: "cod",
            };

            const { data } = await createOrder(
                orderData
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to place order"
                );
            }

            dispatch(clearCart());

            navigate("/order-success");
        } catch (error) {
            console.error(
                "COD Order Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to place order"
            );
        }
    };

    const handleOnlinePayment = async () => {
        try {
            // 1. Create Razorpay order from backend
            const { data } = await createRazorpayOrder(total);

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Unable to create payment"
                );
            }

            const razorpayOrder = data.order;

            // 2. Razorpay Checkout
            const options = {
                key: import.meta.env
                    .VITE_RAZORPAY_KEY_ID,

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency,

                name: "Ekta Nursery",

                description:
                    "Plant Order Payment",

                order_id: razorpayOrder.id,

                handler: async function (response) {
                    try {
                        // 3. Verify payment + create order
                        const verifyResponse =
                            await verifyRazorpayPayment({
                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,

                                items: cartItems.map(
                                    (item) => ({
                                        product:
                                            item._id,
                                        quantity:
                                            item.quantity,
                                    })
                                ),

                                shippingAddress:
                                    formData,
                            });

                        if (
                            !verifyResponse.data
                                .success
                        ) {
                            throw new Error(
                                "Payment verification failed"
                            );
                        }

                        // 4. Order created successfully
                        const createdOrder = verifyResponse.data.order;

                        dispatch(clearCart());

                        alert("Payment successful! Order placed successfully.");

                        navigate("/order-success", {
                            state: {
                                orderId: createdOrder._id,
                            },
                        });

                    } catch (error) {
                        console.error(
                            "Payment Verification Error:",
                            error
                        );

                        alert(
                            error.response?.data
                                ?.message ||
                            error.message ||
                            "Payment verification failed"
                        );
                    }
                },

                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.phone,
                },

                theme: {
                    color: "#15803d",
                },
            };

            const razorpay =
                new window.Razorpay(options);

            razorpay.on(
                "payment.failed",
                function (response) {
                    console.error(
                        "Payment Failed:",
                        response.error
                    );

                    alert(
                        response.error?.description ||
                        "Payment failed"
                    );
                }
            );

            razorpay.open();

        } catch (error) {
            console.error(
                "Razorpay Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Unable to start payment"
            );
        }
    };



    const handlePlaceOrder = () => {
        if (!validateForm()) {
            return;
        }

        if (paymentMethod === "cod") {
            handleCodOrder();
        } else {
            handleOnlinePayment();
        }
    };

    return (
        <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
                Order Summary
            </h2>

            <div className="space-y-4">

                {cartItems.map((item) => (

                    <div
                        key={item._id}
                        className="flex items-center gap-4 border-b pb-4"
                    >

                        <img
                            src={
                                item.images?.[0]?.url ||
                                "https://placehold.co/300x300?text=No+Image"
                            }
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-cover"
                        />

                        <div className="flex-1">

                            <h3 className="font-semibold">
                                {item.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                Qty : {item.quantity}
                            </p>

                        </div>

                        <p className="font-semibold">
                            ₹{item.price * item.quantity}
                        </p>

                    </div>

                ))}

            </div>

            <div className="mt-2 space-y-2 border-t pt-6">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Delivery</span>

                    <span>
                        {deliveryCharge === 0
                            ? "FREE"
                            : `₹${deliveryCharge}`}
                    </span>
                </div>

                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>

            </div>

            <Button
                onClick={handlePlaceOrder}
                className="mt-8 w-full rounded-xl bg-green-700 py-4 text-white hover:bg-green-800"
            >
                {paymentMethod === "cod"
                    ? "Place Order"
                    : "Pay Now"}
            </Button>

        </div>
    );
}