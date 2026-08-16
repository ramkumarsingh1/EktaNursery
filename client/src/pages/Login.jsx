
import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { loginUser } from "../api/authApi";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "../redux/auth/authSlice";
import toast from "react-hot-toast";
export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(loginStart());

            const { data } = await loginUser(formData);

            dispatch(loginSuccess(data.user));

            toast.success("Login successfully");

            const redirectTo = location.state?.from || "/";

            navigate(redirectTo, { replace: true });

        } catch (error) {
            dispatch(loginFailure());

            // alert(
            //     error.response?.data?.message ||
            //     "Login Failed"
            // );
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
                    Login
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Welcome back to Ekta Nursery
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border px-4 py-3 pr-12 outline-none focus:border-green-600"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <FiEyeOff size={20} />
                                ) : (
                                    <FiEye size={20} />
                                )}
                            </button>
                        </div>

                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-semibold text-green-700 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        state={{ from: location.state?.from || "/" }}
                        className="font-semibold text-green-700"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

