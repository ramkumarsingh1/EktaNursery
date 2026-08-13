import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import {
    getAdminOrderById,
} from "../../api/orderApi";

export default function AdminOrderDetails() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const { data } = await getAdminOrderById(id);

                if (data.success) {
                    setOrder(data.order);
                }
            } catch (error) {
                console.error(
                    "Admin Order Details Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load order"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-lg font-semibold">
                    Loading order...
                </p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold">
                    Order Not Found
                </h2>

                <p className="mt-2 text-red-600">
                    {error || "Order does not exist"}
                </p>

                <Link
                    to="/admin/orders"
                    className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white"
                >
                    ← Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <section className="py-8">
            <Container>

                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/orders"
                        className="text-green-700 hover:underline"
                    >
                        ← Back to Orders
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold">
                        Order Details
                    </h1>

                    <p className="mt-2 break-all text-sm text-gray-500">
                        Order ID: {order._id}
                    </p>
                </div>

                {/* Customer + Status + Payment */}
                <div className="mb-8 grid gap-6 md:grid-cols-3">

                    {/* Customer */}
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold">
                            Customer
                        </h2>

                        <p className="font-semibold">
                            {order.user?.name}
                        </p>

                        <p className="mt-1 text-gray-600">
                            {order.user?.email}
                        </p>

                        <p className="mt-1 text-gray-600">
                            {order.user?.phone || "No phone"}
                        </p>
                    </div>

                    {/* Order Status */}
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold">
                            Order Status
                        </h2>

                        <span className="inline-block rounded-full bg-green-100 px-4 py-2 font-semibold capitalize text-green-700">
                            {order.orderStatus}
                        </span>
                    </div>

                    {/* Payment */}
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold">
                            Payment
                        </h2>

                        <p className="font-semibold uppercase">
                            {order.paymentMethod}
                        </p>

                        <p className="mt-1 capitalize text-gray-600">
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

                            {order.items?.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 border-b pb-5 last:border-b-0"
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

                                        <p className="mt-1 text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Price: ₹{item.price}
                                        </p>
                                    </div>

                                    <p className="font-bold">
                                        ₹{item.price * item.quantity}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="space-y-6">

                        {/* Summary */}
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

                                    <span className="text-green-700">
                                        ₹{order.totalAmount}
                                    </span>
                                </div>

                            </div>

                        </div>

                        {/* Shipping */}
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-2xl font-bold">
                                Shipping Address
                            </h2>

                            <div className="space-y-1 text-gray-700">

                                <p className="font-semibold">
                                    {order.shippingAddress?.fullName}
                                </p>

                                <p>
                                    {order.shippingAddress?.phone}
                                </p>

                                <p>
                                    {order.shippingAddress?.email}
                                </p>

                                <p className="pt-2">
                                    {order.shippingAddress?.address}
                                </p>

                                <p>
                                    {order.shippingAddress?.city},{" "}
                                    {order.shippingAddress?.state}
                                </p>

                                <p>
                                    PIN:{" "}
                                    {order.shippingAddress?.pincode}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </Container>
        </section>
    );
}