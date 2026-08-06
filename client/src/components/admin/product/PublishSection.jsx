export default function PublishSection({
    state,
    dispatch,
}) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold">
                Publish
            </h2>

            <div className="mb-5">

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        checked={state.isFeatured}
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_FIELD",
                                field: "isFeatured",
                                value: e.target.checked,
                            })
                        }
                    />

                    Featured Product

                </label>

            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white hover:bg-green-800"
            >
                Save Product
            </button>

        </div>
    );
}