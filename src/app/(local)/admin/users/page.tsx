"use client";

import { baseApi } from "@/lib/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
	_id: string;
	fullName: string;
	balance: number;
	phone: number;
	email: string;
	role: string;
	status: string;
};

export default function AllUsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await baseApi("/users");
				if (!res.success) throw new Error("Failed to fetch users");
				setUsers(res.users || []);
			} catch (err: any) {
				setError(err.message || "Error fetching users");
				toast.error("ইউজার ডেটা লোড করতে সমস্যা হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const handleDelete = async (userId: string) => {
		const confirmDelete = confirm(
			"আপনি কি নিশ্চিতভাবে ইউজারটি ডিলিট করতে চান?"
		);
		if (!confirmDelete) return;

		try {
			const res = await baseApi(`/users/delete/${userId}`, {
				method: "DELETE",
			});

			if (res.success) {
				setUsers(prev => prev.filter(user => user._id !== userId));
				toast.success("ইউজার সফলভাবে ডিলিট করা হয়েছে");
			} else {
				toast.error("ডিলিট করতে সমস্যা হয়েছে");
			}
		} catch (err) {
			console.error(err);
			toast.error("সার্ভার ত্রুটি");
		}
	};

const handleBlock = async (userId: string, currentStatus: string) => {
	const confirmToggle = confirm(
		currentStatus === "blocked"
			? "আপনি কি ইউজারটিকে আনব্লক করতে চান?"
			: "আপনি কি ইউজারটিকে ব্লক করতে চান?"
	);
	if (!confirmToggle) return;

	try {
		const res = await baseApi(`/users/toggle-block/${userId}`, {
			method: "PATCH",
		});

		if (res.success) {
			setUsers(prev =>
				prev.map(user =>
					user._id === userId
						? {
								...user,
								status: user.status === "blocked" ? "active" : "blocked",
						  }
						: user
				)
			);
			toast.success(
				currentStatus === "blocked"
					? "ইউজার আনব্লক করা হয়েছে"
					: "ইউজার ব্লক করা হয়েছে"
			);
		} else {
			toast.error("অপারেশন সম্পন্ন হয়নি");
		}
	} catch (err) {
		console.error(err);
		toast.error("সার্ভার ত্রুটি");
	}
};

	if (loading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;
	if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-4">সকল ইউজার</h2>
			<div className="overflow-x-auto bg-white rounded shadow">
				<table className="min-w-[900px] w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								নাম
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								বর্তমান ব্যালেন্স
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								মোবাইল
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								ইমেইল
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								রোল
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								অ্যাকশন
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{users.map(user => (
							<tr key={user._id}>
								<td className="px-4 py-2">{user.fullName}</td>
								<td className="px-4 py-2">৳ {user?.balance}</td>
								<td className="px-4 py-2">{user?.phone}</td>
								<td className="px-4 py-2">{user.email}</td>
								<td className="px-4 py-2 capitalize">
									<span
										className={`px-2 py-1 rounded text-xs font-semibold ${
											user.role === "admin"
												? "bg-green-100 text-green-700"
												: "bg-blue-100 text-blue-700"
										}`}>
										{user.role}
									</span>
								</td>
								<td className="px-4 py-2 space-x-2">
									<button
										onClick={() => handleBlock(user._id, user.status)}
										className={`px-3 py-1 rounded text-white ${
											user.status === "blocked"
												? "bg-green-600 hover:bg-green-700"
												: "bg-yellow-500 hover:bg-yellow-600"
										}`}>
										{user.status === "blocked" ? "Unblock" : "Block"}
									</button>

									<button
										onClick={() => handleDelete(user._id)}
										className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
										Delete
									</button>
								</td>
							</tr>
						))}
						{users.length === 0 && (
							<tr>
								<td colSpan={3} className="px-4 py-6 text-center text-gray-500">
									কোনো ইউজার পাওয়া যায়নি
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
