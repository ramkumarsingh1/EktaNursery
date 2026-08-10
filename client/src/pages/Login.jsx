
import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { loginUser } from "../api/authApi";
import { useDispatch } from "react-redux";

import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "../redux/auth/authSlice";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

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

            alert("Login Successful");

            const redirectTo = location.state?.from || "/";

            navigate(redirectTo, { replace: true });

            console.log(data);
        } catch (error) {
            dispatch(loginFailure());

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div>
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

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
                    />
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
                    className="font-semibold text-green-700"
                >
                    Register
                </Link>
            </p>
        </div>
    );
}

