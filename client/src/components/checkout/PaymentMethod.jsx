import { useState } from "react";

export default function PaymentMethod({paymentMethod,setPaymentMethod}) {


    return (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
                Payment Method
            </h2>

            <div className="space-y-4">

                <label className="flex cursor-pointer items-center justify-between rounded-xl border p-4 hover:border-green-700">

                    <div>

                        <h3 className="font-semibold">
                            Cash on Delivery
                        </h3>

                        <p className="text-sm text-gray-500">
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
                    />

                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-xl border p-4 hover:border-green-700">

                    <div>

                        <h3 className="font-semibold">
                            Online Payment
                        </h3>

                        <p className="text-sm text-gray-500">
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
                    />

                </label>

            </div>

        </div>
    );
}