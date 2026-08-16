export default function PaymentMethod({
    paymentMethod,
    setPaymentMethod,
}) {
    return (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mt-6">

            <h2 className="mb-3 text-lg font-bold sm:text-xl">
                Payment Method
            </h2>

            <div className="space-y-2.5">

                {/* Cash on Delivery */}
                <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition
                    ${
                        paymentMethod === "cod"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-green-500"
                    }`}
                >
                    <div className="min-w-0">

                        <h3 className="text-sm font-semibold">
                            Cash on Delivery
                        </h3>

                        <p className="mt-0.5 text-xs text-gray-500">
                            Pay when your order arrives.
                        </p>

                    </div>

                    <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                        className="h-4 w-4 accent-green-700"
                    />

                </label>

                {/* Online Payment */}
                <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition
                    ${
                        paymentMethod === "online"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-green-500"
                    }`}
                >
                    <div className="min-w-0">

                        <h3 className="text-sm font-semibold">
                            Online Payment
                        </h3>

                        <p className="mt-0.5 text-xs text-gray-500">
                            UPI / Card / Net Banking
                        </p>

                    </div>

                    <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                        className="h-4 w-4 accent-green-700"
                    />

                </label>

            </div>

        </div>
    );
}