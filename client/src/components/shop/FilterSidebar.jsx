export default function FilterSidebar({
    categories,
    categoryCounts,
    totalProducts,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
}) {
    return (
        <aside className="h-fit rounded-2xl border p-6">

            <h2 className="mb-5 text-xl font-bold">
                Categories
            </h2>

            <div className="space-y-3">

                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full rounded-lg border px-4 py-2 transition flex items-center justify-between
        ${selectedCategory === category
                                ? "bg-green-700 text-white"
                                : "hover:bg-green-100"
                            }`}
                    >
                        <span>{category}</span>

                        <span className="text-sm opacity-80">
                            {category === "All"
                                ? totalProducts
                                : categoryCounts[category]}
                        </span>
                    </button>

                ))}

            </div>

            <div className="mt-8">

                <h2 className="mb-5 text-xl font-bold">
                    Price Range
                </h2>

                <div className="space-y-3">

                    {[
                        "All",
                        "0-500",
                        "500-1000",
                        "1000-5000",
                        "5000+",
                    ].map((price) => (

                        <button
                            key={price}
                            onClick={() => setPriceRange(price)}
                            className={`w-full rounded-lg border px-4 py-2 text-left transition
                ${priceRange === price
                                    ? "bg-green-700 text-white"
                                    : "hover:bg-green-100"
                                }`}
                        >
                            {price === "All"
                                ? "All Prices"
                                : `₹${price}`}
                        </button>

                    ))}

                </div>

            </div>
        </aside>
    );
}