import StatCard from "../../components/admin/StatCard";

export default function Dashboard() {
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
                    value="0"
                />

                <StatCard
                    title="Orders"
                    value="0"
                />

                <StatCard
                    title="Customers"
                    value="0"
                />

                <StatCard
                    title="Revenue"
                    value="₹0"
                />

            </div>

        </div>
    );
}