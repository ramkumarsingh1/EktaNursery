// import { useSelector, useDispatch } from "react-redux";
// import { FiUser } from "react-icons/fi";
// import { useState } from "react";
// import { updateAvatar } from "../../api/authApi";
// import { setUser } from "../../redux/auth/authSlice";
// import toast from "react-hot-toast";
// export default function AvatarUpload() {
//     const [avatar, setAvatar] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const dispatch = useDispatch();

//     const { user } = useSelector((state) => state.auth);
//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];

//         if (!file) return;

//         setAvatar(file);

//         setPreview(URL.createObjectURL(file));
//     };
//     const handleUpload = async () => {
//         if (!avatar) {
//             return toast.error("Please select an image");
//         }

//         try {
//             const formData = new FormData();

//             formData.append("avatar", avatar);

//             const { data } = await updateAvatar(formData);

//             dispatch(
//                 setUser({
//                     ...user,
//                     avatar: data.avatar,
//                 })
//             );

//             setPreview(null);
//             setAvatar(null);

//             toast.success(data.message);

//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message ||
//                 "Avatar Upload Failed"
//             );
//         }
//     };
//     return (
//         <div className="rounded-xl bg-white p-6 shadow">

//             <h2 className="mb-6 text-xl font-semibold">
//                 Profile Picture
//             </h2>

//             <div className="flex flex-col items-center">

//                 {preview || user?.avatar?.url ? (

//                     <img
//                         src={preview || user?.avatar?.url}
//                         alt="Avatar"
//                         className="h-40 w-40 rounded-full border-4 border-green-600 object-cover"
//                     />

//                 ) : (

//                     <div className="flex h-40 w-40 items-center justify-center rounded-full bg-green-100">
//                         <FiUser
//                             size={70}
//                             className="text-green-700"
//                         />
//                     </div>

//                 )}

//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleAvatarChange}
//                 />

//                 <button
//                     onClick={handleUpload}
//                     className="mt-4 w-full rounded-lg bg-green-700 py-2 text-white hover:bg-green-800"
//                 >
//                     Upload Avatar
//                 </button>

//             </div>

//         </div>

        
//     );
// }



import { useSelector, useDispatch } from "react-redux";
import {
    FiUser,
    FiCamera,
    FiCheck,
    FiX,
} from "react-icons/fi";
import { useState } from "react";
import { updateAvatar } from "../../api/authApi";
import { setUser } from "../../redux/auth/authSlice";
import toast from "react-hot-toast";

export default function AvatarUpload() {
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!avatar) return;

        try {
            const formData = new FormData();

            formData.append("avatar", avatar);

            const { data } = await updateAvatar(formData);

            dispatch(
                setUser({
                    ...user,
                    avatar: data.avatar,
                })
            );

            setPreview(null);
            setAvatar(null);

            toast.success(data.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Avatar Upload Failed"
            );
        }
    };

    const cancelPreview = () => {
        setPreview(null);
        setAvatar(null);
    };

    return (
            <div className="flex flex-col items-center">

                <div className="relative">

                    {/* Avatar */}
                    {preview || user?.avatar?.url ? (
                        <img
                            src={preview || user?.avatar?.url}
                            alt="Profile"
                            className="
                                h-32 w-32
                                rounded-full
                                object-cover
                                ring-4 ring-white
                                shadow-md
                                sm:h-40 sm:w-40
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-32 w-32
                                items-center justify-center
                                rounded-full
                                bg-green-100
                                ring-4 ring-white
                                shadow-md
                                sm:h-40 sm:w-40
                            "
                        >
                            <FiUser
                                size={55}
                                className="text-green-700 sm:hidden"
                            />

                            <FiUser
                                size={70}
                                className="hidden text-green-700 sm:block"
                            />
                        </div>
                    )}

                    {/* Camera Button */}
                    <label
                        htmlFor="avatar-upload"
                        className="
                            absolute
                            bottom-0 right-0
                            flex
                            h-11 w-11
                            cursor-pointer
                            items-center justify-center
                            rounded-full
                            border-4 border-white
                            bg-green-700
                            text-white
                            shadow-md
                            transition
                            active:scale-95
                            hover:bg-green-800
                            sm:h-12 sm:w-12
                        "
                    >
                        <FiCamera size={19} />

                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </label>

                </div>

                {/* Selected Image Actions */}
                {avatar && (
                    <div className="mt-5 flex items-center gap-4">

                        {/* Cancel */}
                        <button
                            type="button"
                            onClick={cancelPreview}
                            aria-label="Cancel"
                            className="
                                flex
                                h-11 w-11
                                items-center justify-center
                                rounded-full
                                border
                                border-gray-300
                                text-gray-600
                                transition
                                active:scale-95
                                hover:bg-gray-100
                            "
                        >
                            <FiX size={25} />
                        </button>

                        {/* Save */}
                        <button
                            type="button"
                            onClick={handleUpload}
                            aria-label="Save profile picture"
                            className="
                                flex
                                h-11 w-11
                                items-center justify-center
                                rounded-full
                                bg-green-700
                                text-white
                                shadow-sm
                                transition
                                active:scale-95
                                hover:bg-green-800
                            "
                        >
                            <FiCheck size={25} />
                        </button>

                    </div>
                )}

            </div>

    );
}