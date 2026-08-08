import ProductCard from "../product/ProductCard";

export default function ProductGrid({ products }) {
    if (products.length === 0) {
        return (
            <div>
                <h2 className="text-3xl font-bold text-gray-700">
                    No Products Found
                </h2>

                <p className="mt-3 text-gray-500">
                    Try changing your search or category.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                />
            ))}
        </div>
    );
}