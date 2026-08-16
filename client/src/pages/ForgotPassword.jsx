import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    forgotPassword,
    verifyResetOTP,
    resetPassword,
} from "../api/authApi";
import toast from "react-hot-toast";
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error("Please enter your email");
        }

        try {
            setLoading(true);

            const { data } = await forgotPassword(email);

            toast.success(data.message);

            setOtpSent(true);

        } catch (error) {
            
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        if (!otp) {
            return toast.error("Please enter OTP");
        }

        if (otp.length !== 6) {
            return toast.error("OTP must be 6 digits");
        }

        try {
            setLoading(true);

            const { data } = await verifyResetOTP(email, otp);

            toast.success(data.message);

            setOtpVerified(true);

        } catch (error) {
           
            toast.error(
                error.response?.data?.message ||
                "Invalid OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    // Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            return toast.error("Please fill both password fields");
        }

        if (newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setLoading(true);

            const { data } = await resetPassword(
                email,
                otp,
                newPassword
            );

            toast.success(data.message);

            navigate("/login", {
                replace: true,
            });

        } catch (error) {
           
            toast.error(
                error.response?.data?.message ||
                "Password reset failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-green-700">
                    Forgot Password
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Reset your Ekta Nursery account password
                </p>

                {/* EMAIL */}
                <form
                    onSubmit={handleSendOTP}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your registered email"
                            disabled={otpSent}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600 disabled:bg-gray-100"
                        />
                    </div>

                    {!otpSent && (
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Sending OTP..."
                                : "Send OTP"}
                        </button>
                    )}

                </form>

                {/* OTP */}
                {otpSent && !otpVerified && (
                    <form
                        onSubmit={handleVerifyOTP}
                        className="mt-5 space-y-5"
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
                                className="w-full rounded-lg border px-4 py-3 text-center text-xl tracking-[0.5em] outline-none focus:border-green-600"
                            />

                            <p className="mt-2 text-sm text-gray-500">
                                OTP sent to {email}
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify OTP"}
                        </button>

                    </form>
                )}

                {/* NEW PASSWORD */}
                {otpVerified && (
                    <form
                        onSubmit={handleResetPassword}
                        className="mt-5 space-y-5"
                    >

                        <div>
                            <label className="mb-2 block font-medium">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                placeholder="Enter new password"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm new password"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Resetting..."
                                : "Reset Password"}
                        </button>

                    </form>
                )}

                <p className="mt-6 text-center text-sm">
                    Remember your password?{" "}

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