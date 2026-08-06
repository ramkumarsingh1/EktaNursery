import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            return alert("Please fill all fields");
        }

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            };

            const { data } = await registerUser(payload);

            alert(data.message);

            navigate("/login");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message || "Registration Failed"
            );
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
                    Create Account
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Join Ekta Nursery and start shopping
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
                        />
                    </div>

                    {/* Email */}
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

                    {/* Phone */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        Create Account
                    </button>

                </form>

                <p className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}