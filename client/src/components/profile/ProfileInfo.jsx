// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { updateProfile } from "../../api/authApi";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/auth/authSlice";
// import toast from "react-hot-toast";
// export default function ProfileInfo() {
//     const { user } = useSelector((state) => state.auth);

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//     });
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 name: user.name || "",
//                 email: user.email || "",
//                 phone: user.phone || "",
//             });
//         }
//     }, [user]);

//     const handleChange = (e) => {
//         setFormData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };


//     const handleSubmit = async () => {
//         try {
//             const { data } = await updateProfile({
//                 name: formData.name,
//                 phone: formData.phone,
//             });

//             dispatch(setUser(data.user));

//             toast.success(data.message);

//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message ||
//                 "Profile Update Failed"
//             );
//         }
//     };
//     return (
//         <div className="rounded-xl bg-white p-6 shadow">

//             <h2 className="mb-6 text-xl font-semibold">
//                 Personal Information
//             </h2>

//             <div className="space-y-5">

//                 <div>
//                     <label className="mb-2 block font-medium">
//                         Name
//                     </label>

//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-2 block font-medium">
//                         Email
//                     </label>

//                     <input
//                         type="email"
//                         value={formData.email}
//                         disabled
//                         className="w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-3"
//                     />
//                 </div>

//                 <div>
//                     <label className="mb-2 block font-medium">
//                         Phone
//                     </label>

//                     <input
//                         type="text"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
//                     />
//                 </div>

//                 <button
//                     onClick={handleSubmit}
//                     className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
//                 >
//                     Save Changes
//                 </button>

//             </div>
//         </div>
//     );
// }



import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateProfile } from "../../api/authApi";
import { setUser } from "../../redux/auth/authSlice";
import toast from "react-hot-toast";

export default function ProfileInfo() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const { data } = await updateProfile({
                name: formData.name,
                phone: formData.phone,
            });

            dispatch(setUser(data.user));

            toast.success(data.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Profile Update Failed"
            );
        }
    };

    return (
            <div className="space-y-4 sm:space-y-5">
                {/* Name */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-lg
                            border border-gray-300
                            px-3.5 py-2.5
                            text-sm
                            outline-none
                            transition
                            focus:border-green-700
                            focus:ring-1
                            focus:ring-green-700
                            sm:px-4 sm:py-3
                            sm:text-base
                        "
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="
                            w-full
                            cursor-not-allowed
                            rounded-lg
                            border border-gray-200
                            bg-gray-100
                            px-3.5 py-2.5
                            text-sm
                            text-gray-500
                            sm:px-4 sm:py-3
                            sm:text-base
                        "
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Phone
                    </label>

                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-lg
                            border border-gray-300
                            px-3.5 py-2.5
                            text-sm
                            outline-none
                            transition
                            focus:border-green-700
                            focus:ring-1
                            focus:ring-green-700
                            sm:px-4 sm:py-3
                            sm:text-base
                        "
                    />
                </div>

                {/* Save Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="
                        w-full
                        rounded-lg
                        bg-green-700
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        active:scale-[0.98]
                        hover:bg-green-800
                        sm:w-auto
                        sm:px-6
                        sm:py-3
                        sm:text-base
                    "
                >
                    Save Changes
                </button>

            </div>
    );
}

