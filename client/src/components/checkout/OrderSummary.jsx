import { useSelector } from "react-redux";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const deliveryCharge = subtotal > 999 ? 0 : 99;

    const total = subtotal + deliveryCharge;

    return (
        <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
                Order Summary
            </h2>

            <div className="space-y-4">

                {cartItems.map((item) => (

                    <div
                        key={item.id}
                        className="flex items-center gap-4 border-b pb-4"
                    >

                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-cover"
                        />

                        <div className="flex-1">

                            <h3 className="font-semibold">
                                {item.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                Qty : {item.quantity}
                            </p>

                        </div>

                        <p className="font-semibold">
                            ₹{item.price * item.quantity}
                        </p>

                    </div>

                ))}

            </div>

            <div className="mt-2 space-y-2 border-t pt-6">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>₹{subtotal}</span>

                </div>

                <div className="flex justify-between">

                    <span>Delivery</span>

                    <span>
                        {deliveryCharge === 0
                            ? "FREE"
                            : `₹${deliveryCharge}`}
                    </span>

                </div>

                <div className="flex justify-between text-xl font-bold">

                    <span>Total</span>

                    <span>₹{total}</span>

                </div>

            </div>

            <Button
                onClick={() => {

                    dispatch(clearCart());

                    navigate("/order-success");

                }}
                className="mt-8 w-full rounded-xl bg-green-700 py-4 text-white hover:bg-green-800"
            >
                Place Order
            </Button>

        </div>
    );
}