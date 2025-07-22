"use client";

import { useUser } from "@/context/UserContext";
import { useState } from "react";

const ProfileSettingsForm = () => {
	const { user } = useUser();
	const [copied, setCopied] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		console.log(e);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handleCopy = () => {
		if (user?.referralCode) {
			navigator.clipboard.writeText(user.referralCode);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md border border-gray-200 mt-10">
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
				<span className="text-gray-700">👤 Profile Setting</span>
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block mb-1 font-medium">Name *</label>
						<input
							type="text"
							name="name"
							value={user?.fullName}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
							required
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium">Email *</label>
						<input
							type="email"
							name="email"
							value={user?.email}
							disabled
							className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded cursor-not-allowed"
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium">Phone *</label>
						<input
							type="text"
							name="number"
							value={user?.phone}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium">Gender *</label>
						<select
							name="gender"
							value={user?.gender}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400">
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
					</div>
				</div>

				<div className="space-y-3">
					<div>
						<label className="block mb-1 font-medium">My Referrer Code</label>
						<div className="flex items-center gap-3">
							<input
								type="text"
								value={"5454"}
								disabled
								className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded"
							/>
							<button
								type="button"
								onClick={handleCopy}
								className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
								{copied ? "Copied!" : "Copy"}
							</button>
						</div>
					</div>

					<button
						type="submit"
						className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
						Update Profile
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileSettingsForm;
