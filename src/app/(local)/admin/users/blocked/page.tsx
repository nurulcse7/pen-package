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
	status?: string; // এখানে ধরে নিচ্ছি ব্লক করা ইউজারে এটা "blocked" হবে
};

export default function BlockedUser() {
	const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await baseApi("/users");
				if (!res.success) throw new Error("Failed to fetch users");

				// Filter blocked users
				const blocked = (res.users || []).filter(
					(user: User) => user.status === "blocked"
				);

				setBlockedUsers(blocked);
			} catch (err: any) {
				setError(err.message || "Error fetching users");
				toast.error("ইউজার ডেটা লোড করতে সমস্যা হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	if (loading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;
	if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-4 text-red-600">ব্লকড ইউজার</h2>
			<div className="overflow-x-auto bg-white rounded shadow">
				<table className="min-w-[900px] w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								নাম
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								ব্যালেন্স
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								মোবাইল
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								ইমেইল
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								স্ট্যাটাস
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{blockedUsers.length > 0 ? (
							blockedUsers.map(user => (
								<tr key={user._id}>
									<td className="px-4 py-2">{user.fullName}</td>
									<td className="px-4 py-2">৳ {user.balance}</td>
									<td className="px-4 py-2">{user.phone}</td>
									<td className="px-4 py-2">{user.email}</td>
									<td className="px-4 py-2">
										<span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
											{user.status}
										</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className="text-center py-6 text-gray-500">
									কোনো ব্লকড ইউজার পাওয়া যায়নি
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
