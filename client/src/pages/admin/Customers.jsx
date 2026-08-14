import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/authApi";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                setError("");

                const { data } = await getAllUsers();

                if (data.success) {
                    setCustomers(data.users || []);
                }
            } catch (error) {
                console.error(
                    "Admin Customers Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load customers"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-lg font-semibold">
                    Loading customers...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold">
                    Unable to Load Customers
                </h2>

                <p className="mt-2 text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Customers
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage registered customers.
                    </p>
                </div>

                <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                    {customers.length} Customers
                </span>
            </div>

            {/* Empty State */}
            {customers.length === 0 ? (
                <div className="rounded-2xl border border-dashed p-10 text-center">
                    <h2 className="text-xl font-bold">
                        No Customers Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Registered customers will appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
                    <table className="w-full min-w-[700px]">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="px-5 py-4 text-left">
                                    Customer
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Email
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Phone
                                </th>

                                <th className="px-5 py-4 text-left">
                                    Joined
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.map((customer) => (
                                <tr
                                    key={customer._id}
                                    className="border-b last:border-b-0 hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {customer.avatar?.url ? (
                                                <img
                                                    src={customer.avatar.url}
                                                    alt={customer.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                                                    {customer.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>
                                            )}

                                            <p className="font-semibold">
                                                {customer.name}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {customer.email}
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {customer.phone || "No phone"}
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {new Date(
                                            customer.createdAt
                                        ).toLocaleDateString()}
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