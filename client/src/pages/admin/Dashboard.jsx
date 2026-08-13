import { useEffect, useState } from "react";
import StatCard from "../../components/admin/StatCard";
import { getDashboardStats } from "../../api/dashboardApi";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalRevenue: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setLoading(true);
                setError("");

                const { data } =
                    await getDashboardStats();

                if (!data.success) {
                    throw new Error(
                        data.message ||
                        "Failed to load dashboard stats"
                    );
                }

                setStats(data.stats);
            } catch (error) {
                console.error(
                    "Dashboard Stats Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Unable to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-2 text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div>

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Welcome back, Admin 👋
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                />

                <StatCard
                    title="Orders"
                    value={stats.totalOrders}
                />

                <StatCard
                    title="Customers"
                    value={stats.totalCustomers}
                />

                <StatCard
                    title="Revenue"
                    value={`₹${stats.totalRevenue}`}
                />

            </div>

        </div>
    );
}