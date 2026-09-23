
import { useState } from "react";
import { changePassword, logoutUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";
import toast from "react-hot-toast";

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const { data } = await changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            });

            toast.success(data.message);

            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            await logoutUser();

            dispatch(logout());

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Password Change Failed"
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
        >
            {/* Old Password */}
            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Old Password
                </label>

                <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    autoComplete="current-password"
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

            {/* New Password */}
            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    New Password
                </label>

                <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
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

            {/* Confirm Password */}
            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>

                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
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

            {/* Submit */}
            <button
                type="submit"
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
                Change Password
            </button>
        </form>
    );
}
