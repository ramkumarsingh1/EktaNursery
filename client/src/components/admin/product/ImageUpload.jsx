import { FiUpload, FiTrash2 } from "react-icons/fi";

export default function ImageUpload({
    state,
    dispatch,
}) {
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        dispatch({
            type: "SET_IMAGES",
            payload: files,
        });
    };

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">
                Product Images
            </h2>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 p-8 transition hover:bg-green-50">

                <FiUpload
                    size={35}
                    className="mb-3 text-green-700"
                />

                <p className="font-semibold">
                    Click to Upload Images
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    JPG • PNG • WEBP
                </p>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />

            </label>

            {state.images.length > 0 && (
                <div className="mt-6 space-y-3">

                    {state.images.map((image, index) => (

                        <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-3"
                        >

                            <div className="flex items-center gap-3">

                                <img
                                    src={
                                        image.url
                                            ? image.url
                                            : URL.createObjectURL(image)
                                    }
                                    alt=""
                                    className="h-14 w-14 rounded-lg border object-cover"
                                />

                                <span className="truncate">

                                    {image.name
                                        ? image.name
                                        : "Existing Image"}

                                </span>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    dispatch({
                                        type: "REMOVE_IMAGE",
                                        index,
                                    })
                                }
                                className="text-red-500"
                            >
                                <FiTrash2 />
                            </button>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}