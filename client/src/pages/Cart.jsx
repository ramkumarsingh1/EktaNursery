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
            <section className="py-10">

                <h1 className="text-4xl font-bold">
                    Shopping Cart
                </h1>
                {cartItems.length === 0 ? (
                    <div className="mt-10 rounded-xl border border-dashed p-10 text-center">
                        <h2 className="text-2xl font-bold">
                            Your Cart is Empty
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Add some plants to continue shopping.
                        </p>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">

                        <div className="space-y-5">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>

                        <CartSummary />

                    </div>
                )}

            </section>
        </Container>
    );
}