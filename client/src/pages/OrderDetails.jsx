import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import { getOrderById, cancelOrder, } from "../api/orderApi";
import toast from "react-hot-toast";
export default function OrderDetails() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await getOrderById(id);

                if (data.success) {
                    setOrder(data.order);
                }
            } catch (error) {
                console.error(
                    "Order Details Error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);
    const handleCancelOrder = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const { data } = await cancelOrder(order._id);

            if (data.success) {
                setOrder(data.order);

                toast.success(
                    data.message ||
                    "Order cancelled successfully"
                );
            }
        } catch (error) {
           
            toast.error(
                error.response?.data?.message ||
                "Failed to cancel order"
            );
        }
    };

    if (loading) {
        return (
            <Container>
                <div className="py-20 text-center">
                    Loading order...
                </div>
            </Container>
        );
    }

    if (!order) {
        return (
            <Container>
                <div className="py-20 text-center">
                    <h1 className="text-2xl font-bold">
                        Order not found
                    </h1>

                    <Link
                        to="/orders"
                        className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 text-white"
                    >
                        Back to Orders
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <section className="py-10">
            <Container>

                <div className="mb-8">
                    <Link
                        to="/my-orders"
                        className="text-green-700 hover:underline"
                    >
                        ← Back to My Orders
                    </Link>

                    <h1 className="mt-4 text-4xl font-bold">
                        Order Details
                    </h1>
                </div>

                {/* Order Information */}
                <div className="mb-8 grid gap-6 md:grid-cols-3">

                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Order ID
                        </p>

                        <p className="mt-2 break-all font-semibold">
                            {order._id}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Order Status
                        </p>

                        <p className="mt-2 font-semibold capitalize text-green-700">
                            {order.orderStatus}
                        </p>

                        {["placed", "confirmed"].includes(
                            order.orderStatus
                        ) && (
                                <button
                                    onClick={handleCancelOrder}
                                    className="mt-4 rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                                >
                                    Cancel Order
                                </button>
                            )}
                    </div>

                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Payment Status
                        </p>

                        <p className="mt-2 font-semibold capitalize">
                            {order.paymentStatus}
                        </p>
                    </div>

                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

                    {/* Products */}
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">

                        <h2 className="mb-6 text-2xl font-bold">
                            Ordered Items
                        </h2>

                        <div className="space-y-5">

                            {order.items.map((item) => (

                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 border-b pb-5"
                                >

                                    <img
                                        src={
                                            item.image ||
                                            item.product?.images?.[0]?.url ||
                                            "https://placehold.co/300x300?text=No+Image"
                                        }
                                        alt={item.name}
                                        className="h-20 w-20 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>

                                    </div>

                                    <p className="font-semibold">
                                        ₹{item.price * item.quantity}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Summary */}
                    <div className="space-y-6">

                        <div className="rounded-2xl border bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-2xl font-bold">
                                Order Summary
                            </h2>

                            <div className="space-y-3">

                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                        ₹{order.subtotal}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    <span>
                                        {order.deliveryCharge === 0
                                            ? "FREE"
                                            : `₹${order.deliveryCharge}`}
                                    </span>
                                </div>

                                <div className="flex justify-between border-t pt-4 text-xl font-bold">
                                    <span>Total</span>
                                    <span>
                                        ₹{order.totalAmount}
                                    </span>
                                </div>

                            </div>

                            <div className="mt-5 border-t pt-5">

                                <p className="text-sm text-gray-500">
                                    Payment Method
                                </p>

                                <p className="mt-1 font-semibold uppercase">
                                    {order.paymentMethod}
                                </p>

                            </div>

                        </div>

                        {/* Shipping Address */}
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-2xl font-bold">
                                Shipping Address
                            </h2>

                            <div className="space-y-1 text-gray-700">

                                <p className="font-semibold">
                                    {order.shippingAddress.fullName}
                                </p>

                                <p>
                                    {order.shippingAddress.phone}
                                </p>

                                <p>
                                    {order.shippingAddress.email}
                                </p>

                                <p className="pt-2">
                                    {order.shippingAddress.address}
                                </p>

                                <p>
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.state}
                                </p>

                                <p>
                                    PIN:{" "}
                                    {order.shippingAddress.pincode}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </Container>
        </section>
    );
}