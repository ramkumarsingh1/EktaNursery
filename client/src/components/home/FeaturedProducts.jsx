import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../layout/Container";
import ProductCard from "../product/ProductCard";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { getAllProducts } from "../../api/productApi";
export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    alert(`${product.name} added to cart`);
  };
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await getAllProducts();

        const featuredProducts = data.products.filter(
          (product) => product.isFeatured
        );

        setProducts(featuredProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);
  return (
    <section className="py-16 bg-gray-50">
      <Container>

        <div className="flex items-center justify-between mb-10">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Products
            </h2>

            <p className="text-gray-500 mt-2">
              Explore our best-selling plants.
            </p>
          </div>

          <Link to="/shop">
            <Button
              className="hidden md:block bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl"
            >
              View All
            </Button>
          </Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {loading ? (
            <h2 className="col-span-4 text-center">
              Loading...
            </h2>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          )}

        </div>

        {/* Mobile Button */}

        <div className="mt-8 flex justify-center md:hidden">

          <Link to="/shop">
            <Button
              className="bg-green-700 text-white px-8 py-3 rounded-xl"
            >
              View All
            </Button>
          </Link>

        </div>

      </Container>
    </section>
  );
}