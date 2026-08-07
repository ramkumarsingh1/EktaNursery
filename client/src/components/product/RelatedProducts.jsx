import ProductGrid from "../shop/ProductGrid";

export default function RelatedProducts({ currentProduct }) {
    const relatedProducts = products.filter(
        (item) =>
            item.category === currentProduct.category &&
            item.id !== currentProduct.id
    );

    if (relatedProducts.length === 0) {
        return null;
    }

    return (
        <section className="mt-16">

            <h2 className="mb-6 text-2xl font-bold">
                Related Products
            </h2>

            <ProductGrid products={relatedProducts} />

        </section>
    );
}