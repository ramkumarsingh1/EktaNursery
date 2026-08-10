import { useSelector, useDispatch } from "react-redux";
import Button from "../ui/Button";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orderApi";
import { useState } from "react";

export default function OrderSummary({
    formData,
    paymentMethod,
}) {
    const cartItems = useSelector((state) => state.cart.items);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        subtotal > 999 ? 0 : 99;

    const total = subtotal + deliveryCharge;

    const handlePlaceOrder = async () => {
        // Cart validation
        if (cartItems.length === 0) {
            alert("Your cart is empty");
            return;
        }

        // Billing validation
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
                alert(`Please enter ${field}`);
                return;
            }
        }

        try {
            setLoading(true);

            const orderData = {
                items: cartItems.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                })),

                shippingAddress: formData,

                paymentMethod,
            };

            const { data } = await createOrder(orderData);

            console.log("Order Created:", data);

            if (!data.success || !data.order?._id) {
                throw new Error(
                    data.message || "Order creation failed"
                );
            }

            // Clear cart only after successful order
            dispatch(clearCart());

            // Send real order ID to success page
            navigate("/order-success", {
                state: {
                    orderId: data.order._id,
                },
            });

        } catch (error) {
            console.error(
                "Place Order Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to place order"
            );
        } finally {
            setLoading(false);
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

                    <span>
                        ₹{total}
                    </span>

                </div>

            </div>

            <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-green-700 py-4 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading
                    ? "Placing Order..."
                    : "Place Order"}
            </Button>

        </div>
    );
}