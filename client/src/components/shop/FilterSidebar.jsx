export default function FilterSidebar({
    selectedCategory,
    setSelectedCategory,
}) {
    const categories = [
        "All",
        "Indoor Plant",
        "Outdoor Plant",
        "Flowering",
        "Pots",
    ];

    return (
        <aside className="rounded-2xl border p-6 h-fit">

            <h2 className="text-xl font-bold mb-5">
                Categories
            </h2>

            <div className="space-y-3">

                {categories.map((category) => (

                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full rounded-lg border px-4 py-2 text-left transition
                            ${
                                selectedCategory === category
                                    ? "bg-green-700 text-white"
                                    : "hover:bg-green-100"
                            }`}
                    >
                        {category}
                    </button>

                ))}

            </div>

        </aside>
    );
}