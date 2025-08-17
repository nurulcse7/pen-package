"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");  
	const [message, setMessage] = useState("");

	const handleSubmit = async (e:any) => {
		e.preventDefault();
		if (!email) {
			setMessage("Please enter your email address");
			setStatus("error");
			return;
		}

		setStatus("loading");
		setMessage("");
		try {
			const res = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data?.message || "Something went wrong");
			}

			setStatus("success");
			setMessage(
				"If this email exists in our system, a reset link has been sent."
			);
			setEmail("");
		} catch (err:any) {
			setStatus("error");
			setMessage(err.message || "Request failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="max-w-md w-full bg-white p-6 rounded-xl shadow">
				<h1 className="text-2xl font-semibold text-gray-800">
					Forgot Password
				</h1>
				<p className="mt-2 text-gray-600 text-sm">
					Enter your account email. We&apos;ll send you a reset link.
				</p>

				{status === "success" && (
					<div className="mt-4 p-3 rounded bg-green-100 text-green-700 text-sm">
						{message}
					</div>
				)}
				{status === "error" && (
					<div className="mt-4 p-3 rounded bg-red-100 text-red-700 text-sm">
						{message}
					</div>
				)}

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700">
							Email Address
						</label>
						<input
							id="email"
							type="email"
							className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 text-sm"
							placeholder="you@example.com"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						disabled={status === "loading"}
						className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
						{status === "loading" ? "Sending..." : "Send Reset Link"}
					</button>
				</form>

				<div className="mt-4 text-sm">
					<a href="/login" className="text-blue-600 hover:underline">
						Back to Login
					</a>
				</div>
			</div>
		</div>
	);
}
