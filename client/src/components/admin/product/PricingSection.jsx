import ToggleSwitch from "../../../components/ui/ToggleSwitch";

export default function PricingSection({
    state,
    dispatch,
}) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-bold">
                Pricing & Inventory
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {/* Price */}

                <div>

                    <label className="mb-2 block font-medium">
                        Price (₹)
                    </label>

                    <input
                        type="number"
                        min="0"
                        value={state.price}
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_FIELD",
                                field: "price",
                                value: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border p-3"
                    />

                </div>

                {/* Stock */}

                <div>

                    <label className="mb-2 block font-medium">
                        Stock
                    </label>

                    <input
                        type="number"
                        min="0"
                        value={state.stock}
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_FIELD",
                                field: "stock",
                                value: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border p-3"
                    />

                </div>


            </div>

            {/* Featured */}

            <div className="mt-8 flex items-center justify-between rounded-xl border p-4">

                <div>

                    <h3 className="font-semibold">
                        Featured Product
                    </h3>

                    <p className="text-sm text-gray-500">
                        Show this product on homepage
                    </p>

                </div>

                <ToggleSwitch
                    checked={state.isFeatured}
                    onChange={() =>
                        dispatch({
                            type: "UPDATE_FIELD",
                            field: "isFeatured",
                            value: !state.isFeatured,
                        })
                    }
                />

            </div>

            {/* Status */}

            <div className="mt-5 flex items-center justify-between rounded-xl border p-4">

                <div>

                    <h3 className="font-semibold">
                        Product Status
                    </h3>

                    <p className="text-sm text-gray-500">
                        Active products are visible in the shop
                    </p>

                </div>

                <ToggleSwitch
                    checked={state.isActive}
                    onChange={() =>
                        dispatch({
                            type: "UPDATE_FIELD",
                            field: "isActive",
                            value: !state.isActive,
                        })
                    }
                />

            </div>

        </div>
    );
}