"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const Register = () => {
	const searchParams = useSearchParams();
	const referralFromUrl = searchParams.get("referral");

	const [form, setForm] = useState({
		fullName: "",
		phone: "",
		email: "",
		password: "",
		gender: "",
		referral: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(null);

	useEffect(() => {
		if (referralFromUrl) {
			setForm(prev => ({ ...prev, referral: referralFromUrl }));
		}
	}, [referralFromUrl]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		if (!form.fullName.trim()) {
			setError("Full Name is required");
			return false;
		}
		if (!form.phone.trim() || !/^\+?\d{10,15}$/.test(form.phone)) {
			setError("Valid phone number is required");
			return false;
		}
		if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
			setError("Valid email is required");
			return false;
		}
		if (form.password.length < 6) {
			setError("Password must be at least 6 characters");
			return false;
		}
		if (!form.gender) {
			setError("Please select gender");
			return false;
		}
		if (!form.referral) {
			setError("Please provide a referral code!");
			return false;
		}

		setError("");
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setLoading(true);
		setError("");

		try {
			const response = await baseApi("/auth/register", {
				method: "POST",
				body: form,
			});

			if (!response.success) {
				throw new Error(response.message || "Registration failed");
			}
			setIsSuccess(response?.message);
			toast.success(response.message);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center bg-gray-100 px-4 pt-18 pb-8">
			{isSuccess ? (
				<div className="h-[500px] pt-[20] font-bold">
					<div className="max-w-[500]">
						<h1>{isSuccess}</h1>
					</div>
				</div>
			) : (
				<div className="bg-white text-gray-700 p-8 rounded-md shadow-md w-full max-w-md">
					<h1 className="text-3xl font-bold text-center text-gray-700 mb-2">
						Create Your Account
					</h1>
					<p className="text-center text-sm text-gray-500 mb-6">
						Please fill in the details to register.
					</p>

					<form onSubmit={handleSubmit} className="space-y-4" noValidate>
						{/* Full Name */}
						<div>
							<label className="block mb-1 text-sm font-medium">
								Full Name *
							</label>
							<input
								type="text"
								name="fullName"
								className="w-full border border-gray-300 rounded-md px-4 py-2"
								value={form.fullName}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Phone Number */}
						<div>
							<label className="block mb-1 text-sm font-medium">
								Phone Number *
							</label>
							<input
								type="tel"
								name="phone"
								className="w-full border border-gray-300 rounded-md px-4 py-2"
								value={form.phone}
								onChange={handleChange}
								placeholder="+8801XXXXXXXXX"
								required
							/>
						</div>

						{/* Email */}
						<div>
							<label className="block mb-1 text-sm font-medium">Email *</label>
							<input
								type="email"
								name="email"
								className="w-full border border-gray-300 rounded-md px-4 py-2"
								value={form.email}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Password */}
						<div>
							<label className="block mb-1 text-sm font-medium">
								Password *
							</label>
							<input
								type="password"
								name="password"
								className="w-full border border-gray-300 rounded-md px-4 py-2"
								value={form.password}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Gender */}
						<div>
							<label className="block mb-1 text-sm font-medium">Gender *</label>
							<select
								name="gender"
								value={form.gender}
								onChange={handleChange}
								required
								className="w-full border border-gray-300 rounded-md px-4 py-2">
								<option value="">Select One</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
						</div>

						{/* Referral Code */}
						<div>
							<label className="block mb-1 text-sm font-medium">
								Referral Code *
							</label>
							<input
								type="text"
								name="referral"
								className="w-full border border-gray-300 rounded-md px-4 py-2"
								value={form.referral}
								onChange={handleChange}
								required
								readOnly={!!referralFromUrl}
								disabled={!!referralFromUrl}
							/>
						</div>

						{error && <p className="text-red-500 text-sm">{error}</p>}

						<button
							type="submit"
							disabled={loading}
							className={`w-full py-2 rounded-md text-white ${
								loading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-green-600 hover:bg-green-700"
							} transition`}>
							{loading ? "Registering..." : "Register"}
						</button>
					</form>

					<p className="mt-6 text-center text-sm text-gray-600">
						Already have an account?{" "}
						<Link href="/login" className="text-blue-600 hover:underline">
							Login
						</Link>
					</p>
				</div>
			)}
		</div>
	);
};

export default Register;
