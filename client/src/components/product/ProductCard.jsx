import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
export default function ProductCard({product}) {

    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(addToCart(product));
        console.log("Added to cart:", product.name);
    };
    return (
        <div className="rounded-2xl border overflow-hidden">

            <Link to={`/product/${product._id}`}>

                {/* Image */}
                <div className="relative overflow-hidden">

                    <span className="absolute left-3 top-3 z-10 rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
                        {product.category}
                    </span>

                    <img
                        src={
                            product.images?.[0]?.url ||
                            "https://placehold.co/600x600?text=No+Image"
                        }
                        alt={product.name}
                        className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                </div>

                {/* Product Info */}
                <div className="p-5">

                    <div className="text-sm text-green-500">
                        {product.category}
                    </div>

                    <h3 className="mt-1 text-xl font-semibold">
                        {product.name}
                    </h3>

                    <div className="mt-3 flex justify-between">

                        <span className="text-yellow-500">
                            ⭐ {product.rating || 0}
                        </span>

                        <span className="font-bold text-green-700">
                            ₹{product.price}
                        </span>

                    </div>

                </div>

            </Link>

            {/* Add To Cart */}
            <div className="px-5 pb-5">

                <Button
                    onClick={handleAddToCart}
                    className="w-full rounded-xl bg-green-700 py-3 text-white hover:bg-green-800"
                >
                    Add To Cart
                </Button>

            </div>

        </div>
    );
}