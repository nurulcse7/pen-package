"use client";

import Link from "next/link";
import { useState } from "react";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showResend, setShowResend] = useState(false);
	const [showResendMessage, setShowResendMessage] = useState<string | null>(
		null
	);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setShowResend(false);
		setShowResendMessage(null);

		try {
			const response = await baseApi("/auth/login", {
				method: "POST",
				body: { email, password },
			});

			if (response.success && response?.isVerified) {
				toast.success("লগইন সফল হয়েছে!");
				window.location.href = `/${response.role}/dashboard`;
			} else {
				setError(response.message || "লগইন ব্যর্থ হয়েছে।");
				if (response?.isVerified === false) {
					setShowResend(true);
				}
			}
		} catch (err: any) {
			setShowResend(true);
			setError(err?.message || "লগইন ব্যর্থ হয়েছে।");
		} finally {
			setLoading(false);
		}
	};

	const handleResend = async () => {
		try {
			const resendRes = await baseApi("/auth/resend-verification", {
				method: "POST",
				body: { email },
			});
			setShowResendMessage(
				resendRes?.message || "ভেরিফিকেশন লিংক পাঠানো হয়েছে।"
			);
		} catch (err: any) {
			toast.error(err.message || "রিসেন্ড করতে সমস্যা হয়েছে।");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white text-black p-8 rounded-md shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-4">লগইন করুন</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						placeholder="আপনার ইমেইল দিন"
						className="w-full border border-gray-300 rounded-md px-4 py-2"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
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

					{error && !showResend && (
						<p className="text-red-500 text-sm">{error}</p>
					)}

					{showResend && !showResendMessage && (
						<p className="text-sm text-center text-red-600">
							আপনার ইমেইল এখনো ভেরিফাই হয়নি। নিচে থেকে আবার ভেরিফিকেশন লিংক
							পাঠাতে পারেন।
						</p>
					)}

					{showResend && (
						<div className="mt-2">
							{showResendMessage ? (
								<p className="text-green-600 text-sm">{showResendMessage}</p>
							) : (
								<button
									type="button"
									onClick={handleResend}
									className="text-sm cursor-pointer text-blue-600 underline">
									ভেরিফিকেশন লিংক আবার পাঠান
								</button>
							)}
						</div>
					)}

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
