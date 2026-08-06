import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  images,
  category,
  name,
  price,
  rating,
}) {
  return (
    <Link
      to={`/product/${id}`}
      className="block"
    >
      <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">

        {/* Image */}
        <div className="relative overflow-hidden">

          <span className="absolute left-3 top-3 z-10 rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
            Sale
          </span>

          <img
            src={
              images?.[0]?.url ||
              "https://placehold.co/600x600?text=No+Image"
            }
            alt={name}
            className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

        </div>

        {/* Content */}

        <div className="p-5">

          <p className="text-sm font-medium text-green-700">
            {category}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-gray-800">
            {name}
          </h3>

          <div className="mt-4 flex items-center justify-between">

            <span className="font-semibold text-yellow-500">
              ⭐ {rating || 0}
            </span>

            <span className="text-2xl font-bold text-green-700">
              ₹{price ?? 0}
            </span>

          </div>

          <Button
            className="mt-6 w-full rounded-xl bg-green-700 py-3 text-white hover:bg-green-800"
          >
            Add To Cart
          </Button>

        </div>

      </div>
    </Link>
  );
}