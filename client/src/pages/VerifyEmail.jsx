import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/authApi";
import toast from "react-hot-toast";
export default function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "";
    const redirectTo = location.state?.from || "/";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error("Email information is missing");
        }

        if (!otp) {
            return toast.error("Please enter OTP");
        }

        if (otp.length !== 6) {
            return toast.error("OTP must be 6 digits");
        }

        try {
            setLoading(true);

            const { data } = await verifyEmail(email, otp);

            toast.success(data.message);

            navigate("/login", {
                state: {
                    from: redirectTo,
                    email,
                },
                replace: true,
            });
        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Email verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
                    Verify Your Email
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    We sent a 6-digit OTP to
                </p>

                <p className="mb-8 text-center font-semibold text-gray-800">
                    {email}
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block font-medium">
                            Enter OTP
                        </label>

                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            placeholder="Enter 6-digit OTP"
                            className="w-full rounded-lg border px-4 py-3 text-center text-4xl tracking-[0.5em] outline-none focus:border-green-600"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify Email"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Enter the OTP sent to your email.
                </p>

                <p className="mt-4 text-center text-sm">
                    <Link
                        to="/login"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        Back to Login
                    </Link>
                </p>

            </div>

        </div>
    );
}