import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductTable from "../../components/admin/ProductTable";
import {
    getAllProducts,
    deleteProduct,
} from "../../api/productApi";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await getAllProducts({limit:100});
            setProducts(data.products);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await deleteProduct(id);

            // Refresh product list
            fetchProducts();

            alert("Product deleted successfully.");
        } catch (error) {
            console.error(error);
            alert("Failed to delete product.");
        }
    };

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Products
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage all nursery products.
                    </p>
                </div>

                <Link
                    to="/admin/products/add"
                    className="rounded-xl bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800"
                >
                    + Add Product
                </Link>

            </div>

            <ProductTable
                products={products}
                handleDelete={handleDelete}
            />
        </div>
    );
}