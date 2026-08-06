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
        <section className="py-10">
            <Container>

                <h1 className="mb-8 text-4xl font-bold">
                    Checkout
                </h1>

                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

                    <div>
                        <BillingForm
                            formData={formData}
                            setFormData={setFormData}
                        />
                        <PaymentMethod
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                    </div>

                    <OrderSummary />

                </div>

            </Container>
        </section>
    );
}