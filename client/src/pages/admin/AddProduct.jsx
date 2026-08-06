import ProductForm from "../../components/admin/product/ProductForm";
export default function AddProduct() {
    return (
        <div>
            <h1 className="text-3xl font-bold">
                Add New Product
            </h1>

            <p className="mt-2 text-gray-500">
                Fill the product details below.
            </p>

            <div className="mt-8">
                <ProductForm />
            </div>
        </div>
    );
}