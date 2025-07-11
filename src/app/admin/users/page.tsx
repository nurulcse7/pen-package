"use client";

import { baseApi } from "@/lib/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
	_id: string;
	fullName: string;
	amount: number;
	phone: number;
	email: string;
	role: string;
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
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{users.map(user => (
							<tr key={user._id}>
								<td className="px-4 py-2">{user.fullName}</td>
								<td className="px-4 py-2">৳ {user?.amount}</td>
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
