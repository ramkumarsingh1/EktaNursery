export default function StatCard({
    title,
    value,
}) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-gray-500">
                {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-700">
                {value}
            </h2>

        </div>
    );
}
