import { useSelector, useDispatch } from "react-redux";
import Button from "../ui/Button";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import {
    createOrder,
    createRazorpayOrder,
    verifyRazorpayPayment,
} from "../../api/orderApi";
import toast from "react-hot-toast";

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
                toast.error(
                    `Please enter ${field}`
                );
                return false;
            }
        }

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
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

            toast.error(
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

                        toast.success("Payment successful! Order placed successfully.");

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

                        toast.error(
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

                    toast.error(
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

            toast.error(
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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">

        <h2 className="mb-4 text-lg font-bold sm:text-xl">
            Order Summary
        </h2>

        {/* Products */}
        <div className="space-y-3">

            {cartItems.map((item) => (

                <div
                    key={item._id}
                    className="flex items-center gap-3 border-b pb-3"
                >

                    <img
                        src={
                            item.images?.[0]?.url ||
                            "https://placehold.co/300x300?text=No+Image"
                        }
                        alt={item.name}
                        className="h-12 w-12 shrink-0 rounded-md object-cover"
                    />

                    <div className="min-w-0 flex-1">

                        <h3 className="truncate text-sm font-medium">
                            {item.name}
                        </h3>

                        <p className="mt-0.5 text-xs text-gray-500">
                            Qty: {item.quantity}
                        </p>

                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                        ₹{item.price * item.quantity}
                    </p>

                </div>

            ))}

        </div>

        {/* Price Details */}
        <div className="mt-4 space-y-2 border-t pt-4 text-sm">

            <div className="flex justify-between">
                <span className="text-gray-600">
                    Subtotal
                </span>

                <span>
                    ₹{subtotal}
                </span>
            </div>

            <div className="flex justify-between">
                <span className="text-gray-600">
                    Delivery
                </span>

                <span className={deliveryCharge === 0 ? "font-medium text-green-700" : ""}>
                    {deliveryCharge === 0
                        ? "FREE"
                        : `₹${deliveryCharge}`}
                </span>
            </div>

            <div className="flex justify-between border-t pt-3 text-base font-bold">
                <span>
                    Total
                </span>

                <span className="text-green-700">
                    ₹{total}
                </span>
            </div>

        </div>

        {/* Place Order */}
        <Button
            onClick={handlePlaceOrder}
            className="mt-5 w-full rounded-lg bg-green-700 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
            {paymentMethod === "cod"
                ? "Place Order"
                : "Pay Now"}
        </Button>

    </div>
);
}