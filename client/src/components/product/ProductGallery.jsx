export default function ProductGallery({
    images,
    selectedImage,
    setSelectedImage,
    name,
}) {
    return (
        <div>

            <img
                src={selectedImage}
                alt={name}
                className="h-64 w-full rounded-2xl object-cover shadow-lg sm:h-80 lg:h-[450px]"
            />

            <div className="mt-2 flex gap-3 overflow-x-auto">

                {images.map((image, index) => (

                    <img
                        key={index}
                        src={image}
                        alt={`${name}-${index}`}
                        onClick={() => setSelectedImage(image)}
                        className={`h-16 w-16 cursor-pointer rounded-lg border-2 object-cover transition

                        ${
                            selectedImage === image
                                ? "border-green-700"
                                : "border-gray-300"
                        }`}
                    />

                ))}

            </div>

        </div>
    );
}