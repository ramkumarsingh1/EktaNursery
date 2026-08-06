import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ProductTableRow({
    product,
    handleDelete,
}) {
    return (
        <tr className="border-b hover:bg-gray-50">

            <td className="px-5 py-4">
                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg border object-cover"
                />
            </td>

            <td className="px-5 py-4 font-medium">
                {product.name}
            </td>

            <td className="px-5 py-4">
                {product.category}
            </td>

            <td className="px-5 py-4">
                ₹{product.price}
            </td>

            <td className="px-5 py-4">
                {product.stock}
            </td>

            <td className="px-5 py-4">
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        product.isFeatured
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                >
                    {product.isFeatured ? "Featured" : "Normal"}
                </span>
            </td>

            <td className="px-5 py-4">
                <div className="flex justify-center gap-3">

                    <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                    >
                        <FiEdit2 size={18} />
                    </Link>

                    <button
                        onClick={() => handleDelete(product._id)}
                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                    >
                        <FiTrash2 size={18} />
                    </button>

                </div>
            </td>

        </tr>
    );
}