"use client";

import { useState } from "react";
import Link from "next/link";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Register = () => {
	const [form, setForm] = useState({
		fullName: "",
		phone: "",
		email: "",
		password: "",
		gender: "",
		dob: "",
		nid: "",
		referral: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		// Basic validation - চাইলে আরো বাড়ানো যাবে
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
		if (!form.dob) {
			setError("Date of Birth is required");
			return false;
		}
		if (!form.nid.trim()) {
			setError("National ID is required");
			return false;
		}
		// শর্তাবলী চেক করার জন্য চেকবক্স থাকলে সে ভ্যালিডেশন এখানে যুক্ত করতে হবে
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

			toast.success(response.message);
			router.push(`/${response.role}/dashboard`);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className=" flex items-center justify-center bg-gray-100 px-4 pt-18 pb-8">
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
						<label
							htmlFor="fullName"
							className="block mb-1 text-sm font-medium">
							Full Name *
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={form.fullName}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Phone Number */}
					<div>
						<label htmlFor="phone" className="block mb-1 text-sm font-medium">
							Phone Number *
						</label>
						<input
							type="tel"
							id="phone"
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
						<label htmlFor="email" className="block mb-1 text-sm font-medium">
							Email *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={form.email}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Password */}
					<div>
						<label
							htmlFor="password"
							className="block mb-1 text-sm font-medium">
							Password (Min: 6 Characters) *
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={form.password}
							onChange={handleChange}
							required
							minLength={6}
						/>
					</div>

					{/* Gender */}
					<div>
						<label htmlFor="gender" className="block mb-1 text-sm font-medium">
							Gender *
						</label>
						<select
							id="gender"
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

					{/* DOB */}
					<div>
						<label htmlFor="dob" className="block mb-1 text-sm font-medium">
							Date of Birth *
						</label>
						<input
							type="date"
							id="dob"
							name="dob"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={form.dob}
							onChange={handleChange}
							required
						/>
					</div>

					{/* NID */}
					<div>
						<label htmlFor="nid" className="block mb-1 text-sm font-medium">
							National ID *
						</label>
						<input
							type="text"
							id="nid"
							name="nid"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={form.nid}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Promo Code */}
					<div>
						<label
							htmlFor="referral"
							className="block mb-1 text-sm font-medium">
							Referral Code (optional)
						</label>
						<input
							type="text"
							id="referral"
							name="referral"
							className="w-full border border-gray-300 rounded-md px-4 py-2"
							value={form.referral}
							onChange={handleChange}
						/>
					</div>

					{/* Error Message */}
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
		</div>
	);
};

export default Register;
