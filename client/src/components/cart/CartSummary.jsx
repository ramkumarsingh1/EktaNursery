import { useSelector } from "react-redux";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
export default function CartSummary() {
    const cartItems = useSelector((state) => state.cart.items);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const delivery = subtotal > 999 ? 0 : 99;

    const gst = Math.round(subtotal * 0.18);

    const grandTotal = subtotal + delivery + gst;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold">
                Order Summary
            </h2>

            <div className="mt-6 space-y-4">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Delivery</span>

                    <span className={delivery === 0 ? "text-green-700 font-semibold" : ""}>
                        {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{gst}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-green-700">
                        ₹{grandTotal}
                    </span>
                </div>

            </div>

            <Link
                to="/checkout"
                className="mt-2 block w-full rounded-xl bg-green-700 py-3 text-center font-semibold text-white hover:bg-green-800"
            >
                Proceed to Checkout
            </Link>

        </div>
    );
}