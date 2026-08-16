import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import Button from "../ui/Button";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const itemTotal = item.price * item.quantity;

  return (
    <div className="border-b border-gray-200 bg-white py-3 sm:rounded-lg sm:border sm:p-4">

      <div className="flex gap-3">

        {/* Product Image */}
        <img
          src={
            item.images?.[0]?.url ||
            "https://placehold.co/300x300?text=No+Image"
          }
          alt={item.name}
          className="h-[72px] w-[72px] shrink-0 rounded-md object-cover sm:h-24 sm:w-24 sm:rounded-lg"
        />

        {/* Product Content */}
        <div className="min-w-0 flex-1">

          {/* Category */}
          <p className="text-[10px] font-medium text-green-700 sm:text-xs">
            {item.category}
          </p>

          {/* Name */}
          <h2 className="mt-0.5 line-clamp-2 text-sm font-medium leading-5 text-gray-800 sm:text-base">
            {item.name}
          </h2>

          {/* Price */}
          <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
            ₹{item.price}
          </p>

          {/* Mobile Actions */}
          <div className="mt-2 flex items-center justify-between">

            {/* Quantity */}
            <div className="flex items-center rounded border border-gray-300">

              <Button
                onClick={() =>
                  dispatch(decreaseQuantity(item._id))
                }
                className="flex h-7 w-7 items-center justify-center bg-gray-50 text-sm hover:bg-gray-100"
              >
                −
              </Button>

              <span className="w-7 text-center text-xs font-semibold">
                {item.quantity}
              </span>

              <Button
                onClick={() =>
                  dispatch(increaseQuantity(item._id))
                }
                disabled={item.quantity >= item.stock}
                className="flex h-7 w-7 items-center justify-center bg-gray-50 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </Button>

            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() =>
                dispatch(removeFromCart(item._id))
              }
              className="text-xs font-medium text-gray-500 hover:text-red-600"
            >
              Remove
            </button>

          </div>

        </div>

        {/* Total */}
        <div className="shrink-0 text-right">

          <p className="text-sm font-bold text-green-700 sm:text-base">
            ₹{itemTotal}
          </p>

        </div>

      </div>

    </div>
  );
}