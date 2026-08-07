import { useParams } from "react-router-dom";
import { useState } from "react";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
export default function ProductDetails() {
    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return (
            <Container>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <h2 className="text-3xl font-bold">
                        Product Not Found
                    </h2>
                </div>
            </Container>
        );
    }

    const [quantity, setQuantity] = useState(1);

    const [selectedImage, setSelectedImage] = useState(
        product.images[0]
    );

    const totalPrice = product.price * quantity;

    return (
        <Container>
            <div className="grid gap-4 py-6 lg:grid-cols-2 lg:gap-12 lg:py-12">

                {/* Left Side */}
                <div>

                    {/* Main Image */}
                    <ProductGallery
                        images={product.images}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        name={product.name}
                    />
                </div>

                {/* Right Side */}
                <ProductInfo
                    product={product}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    totalPrice={totalPrice}
                />

            </div>
            <RelatedProducts
                currentProduct={product}
            />
        </Container>
    );
}