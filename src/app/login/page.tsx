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
	const [showResendMessage, setShowResendMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await baseApi("/auth/login", {
				method: "POST",
				body: { email, password },
			});

			if (response.success && response?.isVerified) {
				toast.success("Login successful!");
				window.location.href = `/${response.role}/dashboard`;
			}
		} catch (err: any) {
			setError(err.message || "Email not verified.");
			if (err?.code === 403) {
				setShowResend(true);
			}
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			{(showResend && (
				<div>
					<h1>{error}</h1>
					{showResendMessage ? (
						<div>
							<h1 className="text-red-500 font-bold ">{showResendMessage}</h1>
						</div>
					) : (
						<button
							type="button"
							onClick={async () => {
								try {
									const resendRes = await baseApi("/auth/resend-verification", {
										method: "POST",
										body: { email },
									});
									setShowResendMessage(resendRes?.message);
								} catch (err: any) {
									toast.error(
										err.message || "Failed to resend verification email."
									);
								}
							}}
							className="mt-2 text-sm text-blue-600 underline">
							Resend Verification Email
						</button>
					)}
				</div>
			)) || (
				<div className="bg-white text-black p-8 rounded-md shadow-md w-full max-w-md">
					<h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="email"
							placeholder="Email"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>

						{error && <p className="text-red-500 text-sm">{error}</p>}

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="remember"
								className="accent-blue-500"
							/>
							<label htmlFor="remember" className="text-sm text-gray-600">
								Remember me
							</label>
						</div>

						<button
							type="submit"
							disabled={loading}
							className={`w-full py-2 rounded-md text-white ${
								loading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-green-600 hover:bg-green-700"
							} transition`}>
							{loading ? "Login..." : "Login"}
						</button>

						<div className="flex justify-between text-sm mt-3">
							<Link href="/register" className="text-blue-600 hover:underline">
								Register
							</Link>
							<button type="button" className="text-blue-600 hover:underline">
								Forgot Password?
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Login;
