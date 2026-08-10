import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import Container from "../components/layout/Container";

export default function OrderSuccess() {
    const location = useLocation();

    const orderId = location.state?.orderId;

    return (
        <Container>
            <div className="flex min-h-[70vh] items-center justify-center">

                <div className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">

                    <FiCheckCircle
                        size={80}
                        className="mx-auto text-green-600"
                    />

                    <h1 className="mt-6 text-4xl font-bold">
                        Order Placed!
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Thank you for shopping with
                        Ekta Nursery.
                    </p>

                    <div className="mt-6 rounded-xl bg-green-50 p-4">

                        <p className="text-gray-600">
                            Order ID
                        </p>

                        <h2 className="mt-2 break-all text-2xl font-bold text-green-700">
                            {orderId || "Order ID unavailable"}
                        </h2>

                    </div>

                    <Link
                        to="/shop"
                        className="mt-8 inline-block rounded-xl bg-green-700 px-8 py-4 text-white hover:bg-green-800"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        </Container>
    );
}