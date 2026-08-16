export default function BillingForm({ formData, setFormData }) {

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-5">

            <h2 className="mb-3 text-lg font-bold sm:text-xl">
                Billing Details
            </h2>

            <div className="space-y-3">

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-green-700"
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-green-700"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-green-700"
                />

                <textarea
                    rows="2"
                    name="address"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-green-700"
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-green-700"
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        className="rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-green-700"
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="PIN Code"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="col-span-2 rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-green-700 sm:col-span-1"
                    />

                </div>

            </div>

        </div>
    );
}