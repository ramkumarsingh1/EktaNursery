import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import Button from "../ui/Button";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">

      {/* Product Image */}
      <img
        src={
          item.images?.[0]?.url ||
          "https://placehold.co/300x300?text=No+Image"
        }
        alt={item.name}
        className="h-28 w-28 rounded-xl object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">

        <p className="text-sm font-medium text-green-700">
          {item.category}
        </p>

        <h2 className="mt-1 text-xl font-semibold">
          {item.name}
        </h2>

        <p className="mt-2 text-lg font-bold text-green-700">
          ₹{item.price}
        </p>

      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">

        <Button
          onClick={() => dispatch(decreaseQuantity(item._id))}
          className="h-10 w-10 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          -
        </Button>

        <span className="w-8 text-center font-bold">
          {item.quantity}
        </span>

        <Button
          onClick={() => dispatch(increaseQuantity(item._id))}
          disabled={item.quantity >= item.stock}
          className="h-10 w-10 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          +
        </Button>

      </div>

      {/* Total */}
      <div className="w-28 text-center">

        <p className="font-bold text-green-700">
          ₹{item.price * item.quantity}
        </p>

      </div>

      {/* Remove */}
      <Button
        onClick={() => dispatch(removeFromCart(item._id))}
        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Remove
      </Button>

    </div>
  );
}