import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartSummary() {
    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const delivery = subtotal > 999 ? 0 : 99;

    const gst = Math.round(subtotal * 0.18);

    const grandTotal =
        subtotal + delivery + gst;

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 sm:rounded-xl sm:p-5">

            {/* Heading */}
            <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
                Price Details
            </h2>


            {/* Price Details */}
            <div className="mt-3 space-y-2.5 text-sm">

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                        Subtotal
                    </span>

                    <span className="font-medium text-gray-800">
                        ₹{subtotal}
                    </span>
                </div>


                {/* Delivery */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                        Delivery
                    </span>

                    <span
                        className={
                            delivery === 0
                                ? "font-medium text-green-700"
                                : "font-medium text-gray-800"
                        }
                    >
                        {delivery === 0
                            ? "FREE"
                            : `₹${delivery}`}
                    </span>
                </div>


                {/* GST */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                        GST (18%)
                    </span>

                    <span className="font-medium text-gray-800">
                        ₹{gst}
                    </span>
                </div>

            </div>


            {/* Divider */}
            <div className="my-3 border-t border-dashed border-gray-300" />


            {/* Total */}
            <div className="flex items-center justify-between">

                <span className="text-base font-semibold text-gray-800">
                    Total
                </span>

                <span className="text-lg font-bold text-green-700">
                    ₹{grandTotal}
                </span>

            </div>


            {/* Checkout */}
            <Link
                to="/checkout"
                className="mt-3 block w-full rounded-md bg-green-700 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-green-800 sm:py-3"
            >
                Proceed to Checkout
            </Link>

        </div>
    );
}