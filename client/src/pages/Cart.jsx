import { useSelector } from "react-redux";
import Container from "../components/layout/Container";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

export default function Cart() {
    const cartItems = useSelector(
        (state) => state.cart.items
    );

    return (
        <Container>

            <section className="py-4 sm:py-8">

                {/* Heading */}
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Shopping Cart
                </h1>


                {cartItems.length === 0 ? (

                    /* Empty Cart */
                    <div className="mt-5 rounded-lg border border-dashed p-6 text-center sm:mt-8 sm:p-10">

                        <h2 className="text-lg font-semibold text-gray-800 sm:text-2xl">
                            Your Cart is Empty
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add some plants to continue shopping.
                        </p>

                    </div>

                ) : (

                    /* Cart Content */
                    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px] lg:items-start sm:mt-6 sm:gap-6">

                        {/* Cart Items */}
                        <div className="space-y-2 sm:space-y-4">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                />
                            ))}
                        </div>


                        {/* Price Details */}
                        <CartSummary />

                    </div>

                )}

            </section>

        </Container>
    );
}