import Container from "../components/layout/Container";
import BillingForm from "../components/checkout/BillingForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethod from "../components/checkout/PaymentMethod";
import { useState } from "react";

export default function Checkout() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");

    return (
        <section className="py-4 sm:py-8">
            <Container>

                {/* Heading */}
                <h1 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-3xl">
                    Checkout
                </h1>

                {/* Checkout Layout */}
                <div className="grid gap-4 lg:grid-cols-[2fr_1fr] lg:gap-6">

                    {/* Left */}
                    <div className="space-y-3 sm:space-y-5">

                        <BillingForm
                            formData={formData}
                            setFormData={setFormData}
                        />

                        <PaymentMethod
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />

                    </div>

                    {/* Right */}
                    <OrderSummary
                        formData={formData}
                        paymentMethod={paymentMethod}
                    />

                </div>

            </Container>
        </section>
    );
}