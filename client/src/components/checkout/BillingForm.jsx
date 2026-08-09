
export default function BillingForm({formData,setFormData}) {
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-2xl font-bold">
                Billing Details
            </h2>

            <div className="space-y-4">

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-2 outline-none focus:border-green-700"
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-2 outline-none focus:border-green-700"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-2 outline-none focus:border-green-700"
                />

                <textarea
                    rows="2"
                    name="address"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-2 outline-none focus:border-green-700"
                />

                <div className="grid gap-4 md:grid-cols-3">

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="rounded-lg border p-2 outline-none focus:border-green-700"
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        className="rounded-lg border p-2 outline-none focus:border-green-700"
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="PIN Code"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="rounded-lg border p-2 outline-none focus:border-green-700"
                    />

                </div>

            </div>

        </div>
    );
}