import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import ProductForm from "../../components/admin/product/ProductForm";

export default function EditProduct() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const { data } = await getProductById(id);
            setProduct(data.product);
        } catch (error) {
            console.error(error);
        }
    };

    if (!product) {
        return (
            <div className="p-8">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Edit Product
                </h1>

                <p className="mt-2 text-gray-500">
                    Update your product details.
                </p>
            </div>

            <ProductForm
                mode="edit"
                productData={product}
            />
        </div>
    );
}