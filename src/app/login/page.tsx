"use client";

import Link from "next/link";
import { useState } from "react";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showResend, setShowResend] = useState(false);
	const [showResendMessage, setShowResendMessage] = useState<string | null>(
		null
	);
	const [resendCooldown, setResendCooldown] = useState(0);
	const [loading, setLoading] = useState(false);

	// Login handler
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setShowResend(false);
		setShowResendMessage(null);

		// ✅ Frontend validation
		if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
			setError("সঠিক ইমেইল দিন।");
			setLoading(false);
			return;
		}
		if (!password || password.length < 6) {
			setError("পাসওয়ার্ড কমপক্ষে 6 অক্ষরের হতে হবে।");
			setLoading(false);
			return;
		}

		try {
			const response = await baseApi("/auth/login", {
				method: "POST",
				body: { email, password },
			});

			// ✅ Successful login & verified
			if (response.success && response?.isVerified) {
				Cookies.set("token", response.token, { expires: 7 });
				toast.success("লগইন সফল হয়েছে!");
				window.location.href = `/${response.role}/dashboard`;
				return;
			}

			// ✅ Backend validation responses
			if (!response.success) {
				setError(response.message || "লগইন ব্যর্থ হয়েছে।");

				if (response?.isVerified === false) {
					setShowResend(true);
					setShowResendMessage(
						"আপনার ইমেইল এখনো ভেরিফাই হয়নি। ইমেইল পুনরায় পাঠাতে পারেন।"
					);
				}
				return;
			}
		} catch (err: any) {
			setError(err?.message || "লগইন ব্যর্থ হয়েছে।");
			if (err?.isVerified === false) {
				setShowResend(true);
				setShowResendMessage(
					err?.message ||
						"আপনার ইমেইল এখনো ভেরিফাই হয়নি। ইমেইল পুনরায় পাঠাতে পারেন।"
				);
			}
		} finally {
			setLoading(false);
		}
	};

	// Resend verification handler
	const handleResend = async () => {
		if (resendCooldown > 0) return;
		setLoading(true);

		try {
			const resendRes = await baseApi("/auth/resend-verification", {
				method: "POST",
				body: { email },
			});
			setShowResendMessage(
				resendRes?.message || "ভেরিফিকেশন লিংক পাঠানো হয়েছে।"
			);

			setResendCooldown(60);
			const interval = setInterval(() => {
				setResendCooldown(prev => {
					if (prev <= 1) {
						clearInterval(interval);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} catch (err: any) {
			toast.error(err.message || "রিসেন্ড করতে সমস্যা হয়েছে।");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white text-black p-8 rounded-md shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-4">লগইন করুন</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email */}
					<input
						type="email"
						placeholder="আপনার ইমেইল দিন"
						className="w-full border border-gray-300 rounded-md px-4 py-2"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>

					{/* Password */}
					{!showResend && (
						<input
							type="password"
							placeholder="পাসওয়ার্ড দিন"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					)}

					{/* Error message */}
					{error && !showResend && (
						<p className="text-red-500 text-sm">{error}</p>
					)}

					{/* Resend verification UI */}
					{showResend && showResendMessage && (
						<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-center">
							<p className="text-sm text-red-700 mb-2">{showResendMessage}</p>
							<button
								type="button"
								onClick={handleResend}
								disabled={resendCooldown > 0 || loading}
								className={`inline-block px-4 py-2 text-white text-sm font-medium rounded transition-colors ${
									resendCooldown > 0 || loading
										? "bg-gray-400 cursor-not-allowed"
										: "bg-blue-600 hover:bg-blue-700"
								}`}>
								{resendCooldown > 0
									? `পুনরায় পাঠানো যাবে ${resendCooldown}s পরে`
									: "ভেরিফিকেশন লিংক আবার পাঠান"}
							</button>
						</div>
					)}

					{/* Remember me */}
					{!showResend && (
						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="remember"
								className="accent-blue-500"
							/>
							<label htmlFor="remember" className="text-sm text-gray-600">
								আমাকে মনে রাখুন
							</label>
						</div>
					)}

					{/* Login button */}
					{!showResend && (
						<button
							type="submit"
							disabled={loading}
							className={`w-full py-2 rounded-md text-white ${
								loading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-green-600 hover:bg-green-700"
							} transition`}>
							{loading ? "প্রসেসিং..." : "লগইন"}
						</button>
					)}

					{/* Links */}
					{!showResend && (
						<div className="flex justify-between text-sm mt-3">
							<Link href="/register" className="text-blue-600 hover:underline">
								নতুন অ্যাকাউন্ট খুলুন
							</Link>
							<Link
								href="/forgot-password"
								className="text-blue-600 hover:underline">
								পাসওয়ার্ড ভুলে গেছেন?
							</Link>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Login;
