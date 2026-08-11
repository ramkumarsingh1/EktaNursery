import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import { getMyOrders } from "../api/orderApi";
import { Link } from "react-router-dom";
export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const { data } = await getMyOrders();

                setOrders(data.orders || []);
            } catch (error) {
                console.error("Failed to fetch orders:", error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load orders"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Container>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-lg font-semibold text-gray-500">
                        Loading orders...
                    </p>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">
                            Unable to Load Orders
                        </h2>

                        <p className="mt-2 text-gray-500">
                            {error}
                        </p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <section className="py-10">

                <h1 className="text-4xl font-bold">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="mt-10 rounded-xl border border-dashed p-10 text-center">
                        <h2 className="text-2xl font-bold">
                            No Orders Yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Your placed orders will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="mt-8 space-y-6">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="rounded-2xl border bg-white p-6 shadow-sm"
                            >

                                {/* Header */}
                                <div className="flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order ID
                                        </p>

                                        <h2 className="mt-1 break-all font-bold">
                                            {order._id}
                                        </h2>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <p className="text-sm text-gray-500">
                                            Order Status
                                        </p>

                                        <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold capitalize text-green-700">
                                            {order.orderStatus}
                                        </span>
                                    </div>

                                </div>

                                {/* Products */}
                                <div className="mt-5 space-y-4">

                                    {order.items?.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center gap-4 border-b pb-4 last:border-b-0"
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

                                                <p className="mt-1 font-semibold text-green-700">
                                                    ₹{item.price}
                                                </p>
                                            </div>

                                            <p className="font-bold">
                                                ₹{item.price * item.quantity}
                                            </p>

                                        </div>
                                    ))}

                                </div>

                                {/* Summary */}
                                <div className="mt-5 border-t pt-5">

                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{order.subtotal}</span>
                                    </div>

                                    <div className="mt-2 flex justify-between">
                                        <span>Delivery</span>
                                        <span>
                                            {order.deliveryCharge === 0
                                                ? "FREE"
                                                : `₹${order.deliveryCharge}`}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex justify-between text-xl font-bold">
                                        <span>Total</span>

                                        <span className="text-green-700">
                                            ₹{order.totalAmount}
                                        </span>
                                    </div>

                                </div>

                                {/* View Details */}
                                <div className="mt-6 flex justify-end border-t pt-5">
                                    <Link
                                        to={`/orders/${order._id}`}
                                        className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                                    >
                                        View Details
                                    </Link>
                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </section>
        </Container>
    );
}