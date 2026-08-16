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
        <div className="text-gray-800">

            {/* Category + Rating */}
            <div className="flex items-center justify-between">

                <p className="text-[11px] font-medium text-green-700 sm:text-sm">
                    {product.category}
                </p>

                <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-700 sm:px-2 sm:py-1 sm:text-xs">
                    ⭐ {product.rating || 0}
                </span>

            </div>


            {/* Product Name */}
            <h1 className="mt-1 text-base font-semibold leading-5 sm:text-2xl sm:leading-7">
                {product.name}
            </h1>


            {/* Price */}
            <p className="mt-1 text-lg font-bold text-green-700 sm:text-2xl">
                ₹{product.price}
            </p>


            {/* Quantity */}
            <div className="mt-3 flex items-center justify-between border-y py-2.5 sm:mt-5 sm:rounded-lg sm:border sm:p-3">

                <span className="text-xs font-semibold sm:text-sm">
                    Quantity
                </span>

                <div className="flex items-center">

                    <Button
                        onClick={() =>
                            quantity > 1 &&
                            setQuantity(quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded bg-gray-200 text-sm hover:bg-gray-300 sm:h-9 sm:w-9"
                    >
                        −
                    </Button>

                    <span className="w-8 text-center text-sm font-semibold sm:text-base">
                        {quantity}
                    </span>

                    <Button
                        onClick={() =>
                            setQuantity(quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded bg-gray-200 text-sm hover:bg-gray-300 sm:h-9 sm:w-9"
                    >
                        +
                    </Button>

                </div>

            </div>


            {/* Total */}
            <div className="mt-2 flex items-center justify-between">

                <span className="text-xs font-semibold sm:text-sm">
                    Total
                </span>

                <span className="text-base font-bold text-green-700 sm:text-xl">
                    ₹{totalPrice}
                </span>

            </div>


            {/* Add To Cart */}
            <Button
                onClick={() =>
                    dispatch(
                        addToCart({
                            ...product,
                            quantity,
                        })
                    )
                }
                className="mt-3 h-10 w-full rounded-md bg-green-700 text-xs font-semibold text-white hover:bg-green-800 sm:mt-4 sm:h-11 sm:rounded-lg sm:text-sm"
            >
                Add To Cart
            </Button>


            {/* Description */}
            <p className="mt-3 text-xs leading-4 text-gray-500 sm:mt-5 sm:text-sm sm:leading-5">
                {product.description}
            </p>

        </div>
    );
}