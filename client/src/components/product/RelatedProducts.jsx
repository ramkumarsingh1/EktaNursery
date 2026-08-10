
import { useEffect, useState } from "react";
import ProductGrid from "../shop/ProductGrid";
import { getAllProducts } from "../../api/productApi";

export default function RelatedProducts({ currentProduct }) {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (!currentProduct?.category) return;

            try {
                setLoading(true);

                const response = await getAllProducts({
                    page: 1,
                    limit: 10,
                    category: currentProduct.category,
                    sort: "newest",
                });

                const products =
                    response?.data?.products ||
                    response?.data?.data ||
                    response?.data ||
                    [];

                const filteredProducts = products.filter(
                    (item) => item._id !== currentProduct._id
                );

                setRelatedProducts(filteredProducts.slice(0, 4));
            } catch (error) {
                console.error(
                    "Failed to fetch related products:",
                    error
                );

                setRelatedProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [currentProduct]);

    if (loading || relatedProducts.length === 0) {
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

