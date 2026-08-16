// import Button from "../ui/Button";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/slices/cartSlice";
// export default function ProductCard({product}) {

//     const dispatch = useDispatch();

//     const handleAddToCart = (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         dispatch(addToCart(product));
//         console.log("Added to cart:", product.name);
//     };
//     return (
//         <div className="rounded-2xl border overflow-hidden">

//             <Link to={`/product/${product._id}`}>

//                 {/* Image */}
//                 <div className="relative overflow-hidden">

//                     <span className="absolute left-3 top-3 z-10 rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
//                         {product.category}
//                     </span>

//                     <img
//                         src={
//                             product.images?.[0]?.url ||
//                             "https://placehold.co/600x600?text=No+Image"
//                         }
//                         alt={product.name}
//                         className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
//                     />

//                 </div>

//                 {/* Product Info */}
//                 <div className="p-5">

//                     <div className="text-sm text-green-500">
//                         {product.category}
//                     </div>

//                     <h3 className="mt-1 text-xl font-semibold">
//                         {product.name}
//                     </h3>

//                     <div className="mt-3 flex justify-between">

//                         <span className="text-yellow-500">
//                             ⭐ {product.rating || 0}
//                         </span>

//                         <span className="font-bold text-green-700">
//                             ₹{product.price}
//                         </span>

//                     </div>

//                 </div>

//             </Link>

//             {/* Add To Cart */}
//             <div className="px-5 pb-5">

//                 <Button
//                     onClick={handleAddToCart}
//                     className="w-full rounded-xl bg-green-700 py-3 text-white hover:bg-green-800"
//                 >
//                     Add To Cart
//                 </Button>

//             </div>

//         </div>
//     );
// }

import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(addToCart(product));
        toast.success("Item Added");
    };

    return (
        <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md">

            <Link to={`/product/${product._id}`}>

                {/* Image */}
                <div className="relative bg-gray-50">

                    <span className="absolute left-2 top-2 z-10 rounded bg-green-700 px-2 py-1 text-[10px] font-medium text-white">
                        {product.category}
                    </span>

                    <img
                        src={
                            product.images?.[0]?.url ||
                            "https://placehold.co/600x600?text=No+Image"
                        }
                        alt={product.name}
                        className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03] sm:h-48"
                    />

                </div>

                {/* Product Info */}
                <div className="px-3 py-2.5">

                    {/* Product Name */}
                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-medium leading-5 text-gray-800">
                        {product.name}
                    </h3>

                    {/* Rating + Price */}
                    <div className="mt-0.5 flex items-center justify-between gap-2">

                        <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[11px] font-medium text-yellow-700">
                            ⭐ {product.rating || 0}
                        </span>

                        <span className="text-base font-bold text-green-700">
                            ₹{product.price}
                        </span>

                    </div>

                </div>

            </Link>

            {/* Add To Cart */}
            <div className="px-3 pb-3">

                <Button
                    onClick={handleAddToCart}
                    className="w-full rounded-md bg-green-700 py-2 text-xs font-semibold text-white transition hover:bg-green-800 sm:text-sm"
                >
                    Add To Cart
                </Button>

            </div>

        </div>
    );
}