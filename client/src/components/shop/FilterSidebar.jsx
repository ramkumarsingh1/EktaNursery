export default function FilterSidebar({
    categories,
    selectedCategory,
    setSelectedCategory,
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
                        onClick={() =>
                            setSelectedCategory(category)
                        }
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