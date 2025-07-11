"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";
import Image from "next/image";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [challenge, setChallenge] = useState({ a: 0, b: 0 });
	const [userAnswer, setUserAnswer] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		generateChallenge();
	}, []);

	const generateChallenge = () => {
		const a = Math.floor(Math.random() * 10);
		const b = Math.floor(Math.random() * 10);
		setChallenge({ a, b });
		setUserAnswer("");
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		if (parseInt(userAnswer) !== challenge.a + challenge.b) {
			setError("Incorrect challenge answer.");
			generateChallenge(); // Reset challenge
			return;
		}
		const response = await baseApi("/auth/login", {
			method: "POST",
			body: { email, password },
		});
		if (!response.success) {
			throw new Error(response.message || "Registration failed");
		}
		toast.success("Login successful!");
		window.location.href = `/${response.role}/dashboard`;
		setLoading(false);
		setError("");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white text-black p-8 rounded-md shadow-md w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-6">
					<Image
						width={30}
						height={30}
						src="/images/kakuservice.png"
						alt="Logo"
						className="h-12 mx-auto"
					/>
				</div>

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

					<div>
						<label className="block mb-1 font-medium">
							Challenge: {challenge.a} + {challenge.b} = ?
						</label>
						<input
							type="number"
							placeholder="Answer"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={userAnswer}
							onChange={e => setUserAnswer(e.target.value)}
							required
						/>
					</div>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<div className="flex items-center space-x-2">
						<input type="checkbox" id="remember" className="accent-blue-500" />
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
		</div>
	);
};

export default Login;
