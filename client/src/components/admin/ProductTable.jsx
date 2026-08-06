import ProductTableRow from "./ProductTableRow";

export default function ProductTable({
    products,
    handleDelete,
}) {
    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-green-700 text-white">
                        <tr>
                            <th className="px-5 py-4 text-left">
                                Image
                            </th>

                            <th className="px-5 py-4 text-left">
                                Product
                            </th>

                            <th className="px-5 py-4 text-left">
                                Category
                            </th>

                            <th className="px-5 py-4 text-left">
                                Price
                            </th>

                            <th className="px-5 py-4 text-left">
                                Stock
                            </th>

                            <th className="px-5 py-4 text-left">
                                Status
                            </th>

                            <th className="px-5 py-4 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductTableRow
                                    key={product._id}
                                    product={product}
                                    handleDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-10 text-center text-gray-500"
                                >
                                    No Products Found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    );
}