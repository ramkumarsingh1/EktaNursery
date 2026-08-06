import { useState } from "react";
import { changePassword } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import { logout } from "../../redux/auth/authSlice";
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
            return alert("Passwords do not match");
        }

        try {
            const { data } = await changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            });

            alert(data.message);

            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            await logoutUser();

            dispatch(logout());

            navigate("/login");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Password Change Failed"
            );
        }
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-semibold">
                Change Password
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>
                    <label className="mb-2 block font-medium">
                        Old Password
                    </label>

                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        New Password
                    </label>

                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800"
                >
                    Change Password
                </button>

            </form>

        </div>
    );
}