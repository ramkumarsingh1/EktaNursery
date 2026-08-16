import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
export default function ProductInfo({
    product,
    quantity,
    setQuantity,
    totalPrice,
}) {
    const dispatch = useDispatch();
    return (
        <div>

            {/* Category + Rating */}
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium md:font-semibold text-green-700">
                    {product.category}
                </p>

                <div className="whitespace-nowrap rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    ⭐ {product.rating}
                </div>
            </div>

            {/* Name + Pricing */}
            <div className="mt-2 flex items-start justify-between gap-4">

                <h1 className="text-sm font-bold sm:text-3xl lg:text-4xl">
                    {product.name}
                </h1>

                <p className=" text-base font-bold text-green-700">
                    ₹{product.price}
                </p>
            </div>


            {/* Quantity */}
            <div className="mt-4 flex items-center justify-between rounded-xl border p-4">

                <h3 className="font-semibold">
                    Quantity
                </h3>

                <div className="flex items-center gap-3">

                    <Button
                        onClick={() =>
                            quantity > 1 &&
                            setQuantity(quantity - 1)
                        }
                        className="h-10 w-10 rounded-lg bg-gray-200 hover:bg-gray-300"
                    >
                        -
                    </Button>

                    <span className="w-8 text-center text-lg font-bold">
                        {quantity}
                    </span>

                    <Button
                        onClick={() =>
                            setQuantity(quantity + 1)
                        }
                        className="h-10 w-10 rounded-lg bg-gray-200 hover:bg-gray-300"
                    >
                        +
                    </Button>

                </div>

            </div>

            {/* Total */}
            <div className="mt-4 flex items-center justify-between">

                <h3 className="font-semibold">
                    Total
                </h3>

                <p className="text-sm md:text-2xl font-bold text-green-700">
                    ₹{totalPrice}
                </p>

            </div>

            {/* Add to Cart */}
            <Button

                onClick={() => dispatch(addToCart({ ...product, quantity, })
                )
                }
                className="mt-4 w-full rounded-xl bg-green-700 py-4 text-white hover:bg-green-800"
            >
                Add To Cart
            </Button>

            {/* Description */}
            <p className="mt-4 leading-5 text-gray-600">
                Healthy nursery plant grown with proper care.
                Suitable for homes, offices, balconies and gardens.
                Easy to maintain and perfect for adding greenery
                to your surroundings.
            </p>

        </div>
    );
}