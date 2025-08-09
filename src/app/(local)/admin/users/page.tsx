"use client";

import { baseApi } from "@/lib/baseApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type User = {
	_id: string;
	fullName: string;
	balance: number;
	phone: number;
	email: string;
	role: string;
	status: string;
	isPaid: boolean;
	isVerified: boolean;
};

export default function AllUsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				openDropdown &&
				dropdownRefs.current[openDropdown] &&
				!dropdownRefs.current[openDropdown].contains(event.target as Node)
			) {
				setOpenDropdown(null);
			}
		};
		window.addEventListener("mousedown", handleClickOutside);
		return () => {
			window.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openDropdown]);

	const toggleDropdown = (userId: string) => {
		setOpenDropdown(prev => (prev === userId ? null : userId));
	};
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

	const handleMakePaid = async (userId: string) => {
		try {
			const res = await baseApi(`/users/mark-paid/${userId}`, {
				method: "PATCH",
			});

			if (res.success) {
				toast.success("ইউজার পেইড মার্ক করা হয়েছে");
				setUsers(prev =>
					prev.map(user =>
						user._id === userId ? { ...user, isPaid: true } : user
					)
				);
			} else {
				toast.error(res.message || "অপারেশন ব্যর্থ");
			}
		} catch (err) {
			toast.error("সার্ভার ত্রুটি");
		}
	};

	const handleChangeStatus = async (userId: string, targetStatus: string) => {
		let confirmMessage = "";

		switch (targetStatus) {
			case "active":
				confirmMessage = "আপনি কি ইউজারটিকে সক্রিয় করতে চান?";
				break;
			case "in-active":
				confirmMessage = "আপনি কি ইউজারটিকে নিষ্ক্রিয় করতে চান?";
				break;
			case "blocked":
				confirmMessage = "আপনি কি ইউজারটিকে ব্লক করতে চান?";
				break;
			default:
				confirmMessage = "আপনি কি স্ট্যাটাস পরিবর্তন করতে চান?";
		}

		const confirmToggle = confirm(confirmMessage);
		if (!confirmToggle) return;

		try {
			const res = await baseApi(`/users/toggle-status/${userId}`, {
				method: "PATCH",
				body: { status: targetStatus },
			});

			if (res.success) {
				setUsers(prev =>
					prev.map(user =>
						user._id === userId
							? {
									...user,
									status: targetStatus,
							  }
							: user
					)
				);

				toast.success(res?.message);
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
			<div className="h-full bg-white rounded shadow">
				<table className="min-w-full  border-collapse border border-gray-200">
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
								ভেরিফাইড স্ট্যাটাস
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								স্ট্যাটাস
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								পেমেন্ট স্ট্যাটাস
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								অ্যাকশন
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user._id} className="border-b border-gray-200">
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
								<td className="px-4 py-2 text-center">
									<span
										className={`px-2 py-1 rounded text-xs font-semibold ${
											user.isVerified
												? "bg-green-100 text-green-700"
												: "bg-red-100 text-red-700"
										}`}>
										{user.isVerified ? "Verified" : "Not Verified"}
									</span>
								</td>

								<td className="px-4 py-2">
									{user.status === "active" && (
										<span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
											Active
										</span>
									)}
									{user.status === "in-active" && (
										<span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
											Inactive
										</span>
									)}
									{user.status === "blocked" && (
										<span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
											Blocked
										</span>
									)}
								</td>

								<td className="px-4 py-2">
									{user.isPaid ? (
										<span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
											Paid
										</span>
									) : (
										<span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
											Not Paid
										</span>
									)}
								</td>

								<td className="px-4 py-2 relative">
									<div className="inline-block text-left">
										<button
											type="button"
											className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
											onClick={() => toggleDropdown(user._id)}>
											Action
											<svg
												className="-mr-1 ml-2 h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>

										<div
											ref={el => {
												dropdownRefs.current[user._id] = el;
											}}
											className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 transition-transform duration-200 ${
												openDropdown === user._id
													? "scale-100 opacity-100"
													: "scale-95 opacity-0 pointer-events-none"
											}`}
											style={{ transformOrigin: "top right" }}>
											<div className="py-1">
												{!user.isPaid && (
													<button
														onClick={() => handleMakePaid(user._id)}
														className="block w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-100">
														Mark as Paid
													</button>
												)}

												{user.isPaid && (
													<>
														{user.status !== "active" && (
															<button
																onClick={() =>
																	handleChangeStatus(user._id, "active")
																}
																className="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-100">
																Set Active
															</button>
														)}
														{user.status !== "in-active" && (
															<button
																onClick={() =>
																	handleChangeStatus(user._id, "in-active")
																}
																className="block w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-100">
																Set Inactive
															</button>
														)}
														{user.status !== "blocked" && (
															<button
																onClick={() =>
																	handleChangeStatus(user._id, "blocked")
																}
																className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100">
																Set Blocked
															</button>
														)}
													</>
												)}

												<button
													onClick={() => handleDelete(user._id)}
													className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100">
													Delete User
												</button>
											</div>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
