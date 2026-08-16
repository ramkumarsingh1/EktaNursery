import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/layout/Container";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";

import { getProductById } from "../api/productApi";

export default function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getProductById(id);

                const fetchedProduct =
                    response?.data?.product ||
                    response?.data?.data ||
                    response?.data;

                if (!fetchedProduct?._id) {
                    throw new Error("Product not found");
                }

                setProduct(fetchedProduct);
                setQuantity(1);

                const imageUrls =
                    fetchedProduct.images
                        ?.map((image) => image?.url)
                        .filter(Boolean) || [];

                setSelectedImage(imageUrls[0] || "");
            } catch (error) {
               
                setProduct(null);
                setError(
                    error?.response?.data?.message ||
                    "Unable to load product"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <Container>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-lg font-semibold text-gray-500">
                        Loading product...
                    </p>
                </div>
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">
                            Product Not Found
                        </h2>

                        <p className="mt-3 text-gray-500">
                            {error || "The requested product does not exist."}
                        </p>
                    </div>
                </div>
            </Container>
        );
    }

    const imageUrls =
        product.images
            ?.map((image) => image?.url)
            .filter(Boolean) || [];

    const totalPrice = product.price * quantity;

    const handleQuantityChange = (newQuantity) => {
        const safeQuantity = Math.max(
            1,
            Math.min(newQuantity, product.stock)
        );

        setQuantity(safeQuantity);
    };

    return (
        <Container>
            <div className="grid gap-4 py-6 lg:grid-cols-2 lg:gap-12 lg:py-12">

                {/* Left Side */}
                <div>
                    <ProductGallery
                        images={imageUrls}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        name={product.name}
                    />
                </div>

                {/* Right Side */}
                <ProductInfo
                    product={product}
                    quantity={quantity}
                    setQuantity={handleQuantityChange}
                    totalPrice={totalPrice}
                />
            </div>

            <RelatedProducts
                currentProduct={product}
            />
        </Container>
    );
}

