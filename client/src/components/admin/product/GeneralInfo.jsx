export default function GeneralInfo({
    state,
    dispatch,
}) {

    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-bold">
                General Information
            </h2>

            {/* Product Name */}

            <div className="mb-5">

                <label className="mb-2 block font-medium">
                    Product Name
                </label>

                <input
                    type="text"
                    value={state.name}
                    onChange={(e) => {
                        const value = e.target.value;

                        dispatch({
                            type: "UPDATE_FIELD",
                            field: "name",
                            value,
                        });

                        dispatch({
                            type: "UPDATE_FIELD",
                            field: "slug",
                            value: value
                                .toLowerCase()
                                .trim()
                                .replace(/\s+/g, "-"),
                        });
                    }}
                    placeholder="Money Plant"
                    className="w-full rounded-xl border p-3 outline-none focus:border-green-700"
                />

            </div>

            {/* Slug */}

            <div className="mb-5">

                <label className="mb-2 block font-medium">
                    Slug
                </label>

                <input
                    type="text"
                    value={state.slug}
                    readOnly
                    className="w-full rounded-xl border bg-gray-100 p-3"
                />

            </div>

            {/* Category */}

            <div className="mb-5">

                <label className="mb-2 block font-medium">
                    Category
                </label>

                <select
                    value={state.category}
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_FIELD",
                            field: "category",
                            value: e.target.value,
                        })
                    }
                    className="w-full rounded-xl border p-3"
                >
                    <option value="Plant">Plant</option>

                    <option value="Pot">Pot</option>

                    <option value="Fertilizer">
                        Fertilizer
                    </option>

                    <option value="Seed">
                        Seed
                    </option>

                </select>

            </div>

            {/* Rating */}

            <div className="mb-5">

                <label className="mb-2 block font-medium">
                    Rating
                </label>

                <select
                    value={state.rating}
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_FIELD",
                            field: "rating",
                            value: Number(e.target.value),
                        })
                    }
                    className="w-full rounded-xl border p-3"
                >
                    <option value={0}>0 Star</option>
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Star</option>
                    <option value={3}>3 Star</option>
                    <option value={4}>4 Star</option>
                    <option value={5}>5 Star</option>
                </select>

            </div>

            {/* Product Status */}

            <div className="mb-5">

                <label className="mb-2 block font-medium">
                    Status
                </label>

                <select
                    value={state.isActive.toString()}
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_FIELD",
                            field: "isActive",
                            value: e.target.value === "true",
                        })
                    }
                    className="w-full rounded-xl border p-3"
                >
                    <option value="true">
                        Active
                    </option>

                    <option value="false">
                        Inactive
                    </option>

                </select>

            </div>

            {/* Description */}

            <div>

                <label className="mb-2 block font-medium">
                    Description
                </label>

                <textarea
                    rows="6"
                    value={state.description}
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_FIELD",
                            field: "description",
                            value: e.target.value,
                        })
                    }
                    className="w-full rounded-xl border p-3"
                />

            </div>

        </div>

    );

}