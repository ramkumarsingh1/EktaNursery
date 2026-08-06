import Categories from "../components/home/Categories";
import FeatureCard from "../components/home/FeatureCard";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Features from "../components/home/Features";
import Hero from "../components/home/Hero";
import Container from "../components/layout/Container";
import ProductCard from "../components/product/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const { data } = await getAllProducts();

                setProducts(data.products);

            } catch (err) {

                setError("Failed to load products.");

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);

    if (loading) {

        return (

            <Container>

                <div className="py-20 text-center text-xl">

                    Loading Products...

                </div>

            </Container>

        );

    }

    if (error) {

        return (

            <Container>

                <div className="py-20 text-center text-red-500">

                    {error}

                </div>

            </Container>

        );

    }
    return (
        <>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <Container>
                <section className="py-10">
                    <h1 className="text-4xl font-bold text-center mb-10">
                        Featured Plants
                    </h1>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                images={product.images}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                                rating={product.rating}
                            />
                        ))}
                    </div>
                </section>
            </Container>
        </>

    );
}