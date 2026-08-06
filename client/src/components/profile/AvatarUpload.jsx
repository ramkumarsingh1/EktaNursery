import { useSelector, useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { updateAvatar } from "../../api/authApi";
import { setUser } from "../../redux/auth/authSlice";
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
        if (!avatar) {
            return alert("Please select an image");
        }

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

            alert(data.message);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Avatar Upload Failed"
            );
        }
    };
    return (
        <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-semibold">
                Profile Picture
            </h2>

            <div className="flex flex-col items-center">

                {preview || user?.avatar?.url ? (

                    <img
                        src={preview || user?.avatar?.url}
                        alt="Avatar"
                        className="h-40 w-40 rounded-full border-4 border-green-600 object-cover"
                    />

                ) : (

                    <div className="flex h-40 w-40 items-center justify-center rounded-full bg-green-100">
                        <FiUser
                            size={70}
                            className="text-green-700"
                        />
                    </div>

                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                />

                <button
                    onClick={handleUpload}
                    className="mt-4 w-full rounded-lg bg-green-700 py-2 text-white hover:bg-green-800"
                >
                    Upload Avatar
                </button>

            </div>

        </div>
    );
}