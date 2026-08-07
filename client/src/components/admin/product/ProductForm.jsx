
import GeneralInfo from "./GeneralInfo";
import PricingSection from "./PricingSection";
import ImageUpload from "./ImageUpload";
import Specifications from "./Specifications";
import PublishSection from "./PublishSection";
import { createProduct, updateProduct } from "../../../api/productApi";
import { useEffect, useReducer } from "react";
import {
    initialState,
    productFormReducer,
} from "../../../redux/productFormReducer";
export default function ProductForm({
    mode = "add",
    productData = null,
}) {
    const [state, dispatch] = useReducer(
        productFormReducer,
        initialState
    );

    useEffect(() => {
        if (mode === "edit" && productData) {
            dispatch({
                type: "SET_PRODUCT",
                payload: productData,
            });
        }
    }, [mode, productData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("name", state.name);
            formData.append("slug", state.slug);
            formData.append("category", state.category);
            formData.append("description", state.description);

            formData.append("price", state.price);
            formData.append("stock", state.stock);

            formData.append("isFeatured", state.isFeatured);
            formData.append("isActive",state.isActive);
            formData.append("rating",state.rating)
            const specs = {};

            state.specifications.forEach((item) => {
                if (item.key && item.value) {
                    specs[item.key] = item.value;
                }
            });

            formData.append(
                "specifications",
                JSON.stringify(specs)
            );

            state.images.forEach((image) => {
                if (image instanceof File) {
                    formData.append("images", image);
                }
            });

            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            console.log(formData.entries())
            let response;

            if (mode === "add") {
                response = await createProduct(formData);
            } else {
                response = await updateProduct(
                    productData._id,
                    formData
                );
            }

            console.log(response.data);

            dispatch({
                type: "RESET",
            });

            alert(
                mode === "add"
                    ? "Product Added Successfully"
                    : "Product Updated Successfully"
            );
        } catch (error) {

            console.error(error);
            console.error("Server said:", error.response?.data);
            alert(
                mode === "add"
                    ? "Failed to add product"
                    : "Failed to update product"
            );

        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >
            <GeneralInfo
                state={state}
                dispatch={dispatch}
            />

            <PricingSection
                state={state}
                dispatch={dispatch}
            />

            <ImageUpload
                state={state}
                dispatch={dispatch}
            />

            <Specifications
                state={state}
                dispatch={dispatch}
            />

            <PublishSection
                state={state}
                dispatch={dispatch}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded-xl bg-green-700 px-8 py-3 font-semibold text-white hover:bg-green-800"
                >
                    {/* Save Product */}
                    {mode === "edit"
                        ? "Update Product"
                        : "Save Product"}
                </button>
            </div>
        </form>
    );
}