return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24">

        <h2 className="mb-4 text-lg font-bold sm:text-xl">
            Order Summary
        </h2>

        {/* Products */}
        <div className="space-y-3">

            {cartItems.map((item) => (

                <div
                    key={item._id}
                    className="flex items-center gap-3 border-b pb-3"
                >

                    <img
                        src={
                            item.images?.[0]?.url ||
                            "https://placehold.co/300x300?text=No+Image"
                        }
                        alt={item.name}
                        className="h-12 w-12 shrink-0 rounded-md object-cover"
                    />

                    <div className="min-w-0 flex-1">

                        <h3 className="truncate text-sm font-medium">
                            {item.name}
                        </h3>

                        <p className="mt-0.5 text-xs text-gray-500">
                            Qty: {item.quantity}
                        </p>

                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                        ₹{item.price * item.quantity}
                    </p>

                </div>

            ))}

        </div>

        {/* Price Details */}
        <div className="mt-4 space-y-2 border-t pt-4 text-sm">

            <div className="flex justify-between">
                <span className="text-gray-600">
                    Subtotal
                </span>

                <span>
                    ₹{subtotal}
                </span>
            </div>

            <div className="flex justify-between">
                <span className="text-gray-600">
                    Delivery
                </span>

                <span className={deliveryCharge === 0 ? "font-medium text-green-700" : ""}>
                    {deliveryCharge === 0
                        ? "FREE"
                        : `₹${deliveryCharge}`}
                </span>
            </div>

            <div className="flex justify-between border-t pt-3 text-base font-bold">
                <span>
                    Total
                </span>

                <span className="text-green-700">
                    ₹{total}
                </span>
            </div>

        </div>

        {/* Place Order */}
        <Button
            onClick={handlePlaceOrder}
            className="mt-5 w-full rounded-lg bg-green-700 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
            {paymentMethod === "cod"
                ? "Place Order"
                : "Pay Now"}
        </Button>

    </div>
);