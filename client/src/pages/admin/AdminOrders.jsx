import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllOrders,
} from "../../api/orderApi";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const { data } =
                    await getAllOrders();

                if (data.success) {
                    setOrders(data.orders || []);
                }

            } catch (error) {
                console.error(
                    "Admin Orders Error:",
                    error
                );

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
            <div className="p-6">
                <p className="text-lg font-semibold">
                    Loading orders...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold">
                    Unable to Load Orders
                </h2>

                <p className="mt-2 text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Orders
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage customer orders
                    </p>
                </div>

                <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                    {orders.length} Orders
                </span>
            </div>

            {orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed p-10 text-center">
                    <h2 className="text-xl font-bold">
                        No Orders Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Customer orders will appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

                    <table className="w-full min-w-[900px]">

                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="px-5 py-4 text-left">
                                    Order
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Customer
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Payment
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b last:border-b-0 hover:bg-gray-50"
                                >

                                    <td className="px-5 py-4">
                                        <p className="max-w-[180px] truncate font-semibold">
                                            {order._id}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="font-semibold">
                                            {order.user?.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {order.user?.email}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 font-semibold">
                                        ₹{order.totalAmount}
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="font-medium uppercase">
                                            {order.paymentMethod}
                                        </p>

                                        <p className="text-sm capitalize text-gray-500">
                                            {order.paymentStatus}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold capitalize text-green-700">
                                            {order.orderStatus}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <Link
                                            to={`/admin/orders/${order._id}`}
                                            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                                        >
                                            View
                                        </Link>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}