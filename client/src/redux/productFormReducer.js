export const initialState = {
    name: "",
    slug: "",
    category: "Indoor Plant",
    description: "",

    price: "",
    stock: "",

    rating: 0,

    isFeatured: false,

    isActive: true,

    images: [],

    specifications: [
        {
            key: "",
            value: "",
        },
    ],
};

export function productFormReducer(state, action) {

    switch (action.type) {

        case "UPDATE_FIELD":

            return {
                ...state,
                [action.field]: action.value,
            };

        case "SET_IMAGES":

            return {
                ...state,
                images: action.payload,
            };

        case "REMOVE_IMAGE":

            return {
                ...state,
                images: state.images.filter(
                    (_, i) => i !== action.index
                ),
            };

        case "ADD_SPEC":

            return {
                ...state,
                specifications: [
                    ...state.specifications,
                    {
                        key: "",
                        value: "",
                    },
                ],
            };

        case "UPDATE_SPEC":

            return {
                ...state,
                specifications: state.specifications.map(
                    (spec, index) =>
                        index === action.index
                            ? {
                                ...spec,
                                [action.field]: action.value,
                            }
                            : spec
                ),
            };

        case "REMOVE_SPEC":

            if (state.specifications.length === 1) {
                return state;
            }

            return {
                ...state,
                specifications: state.specifications.filter(
                    (_, i) => i !== action.index
                ),
            };

        case "SET_PRODUCT":

            return {
                ...state,

                name: action.payload.name || "",

                slug: action.payload.slug || "",

                category: action.payload.category || "Indoor Plant",

                description: action.payload.description || "",

                price: action.payload.price || "",

                stock: action.payload.stock || "",

                rating: action.payload.rating ?? 0,

                isFeatured: action.payload.isFeatured ?? false,

                isActive: action.payload.isActive ?? true,

                specifications:
                    action.payload.specifications &&
                    Object.keys(action.payload.specifications).length > 0
                        ? Object.entries(action.payload.specifications).map(
                              ([key, value]) => ({
                                  key,
                                  value,
                              })
                          )
                        : [
                              {
                                  key: "",
                                  value: "",
                              },
                          ],

                // Existing images sirf preview ke liye
                images: action.payload.images || [],
            };

        case "RESET":

            return initialState;

        default:
            return state;
    }
}