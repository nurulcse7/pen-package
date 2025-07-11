"use client";

import { baseApi } from "@/lib/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Payment = {
	_id: string;
	number: string;
	amount: number;
	trxID: string;
	createdAt: string;
	userId: { fullName: string;   };
	status?: "pending" | "approved" | "rejected";
};

export default function AllPaymentsPage() {
	const [transactions, setTransactions] = useState<Payment[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchPayments = async () => {
		try {
			const res = await baseApi("/transaction/transactions");
			if (!res.success) throw new Error("Failed to fetch payments");
			setTransactions(res.transactions || []);
		} catch (err: any) {
			setError(err.message || "Error fetching payments");
			toast.error("পেমেন্ট ডেটা লোড করতে সমস্যা হয়েছে");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPayments();
	}, []);

	const handleStatusChange = async (
		id: string,
		status: "approved" | "rejected"
	) => {
		try {
			const res = await baseApi(`/transaction/status/${id}`, {
				method: "PUT",
				body: { status },
			});
			if (res.success) {
				toast.success(
					`পেমেন্ট ${status === "approved" ? "অ্যাপ্রুভ" : "বাতিল"} করা হয়েছে`
				);
				fetchPayments(); // refresh data
			} else {
				toast.error("স্ট্যাটাস আপডেট ব্যর্থ হয়েছে");
			}
		} catch (err:any) {
			 
			toast.error(err?.message || "সার্ভার সমস্যা হয়েছে");
		}
	};

	if (loading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;
	if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

	return (
		<main>
			<div className="pb-[20px] md:pl-8 pl-5 ">
				<h1 className="text-2xl text-gray-600">পেমেন্ট তালিকা </h1>
				<p className="text-gray-500 font-normal text-md">
					Admin <span className="px-[10px]">/</span> পেমেন্ট তালিকা
				</p>
			</div>
			<div className="p-6">
				<h2 className="text-2xl font-bold mb-4">পেমেন্ট তালিকা</h2>
				<div className="overflow-x-auto bg-white rounded shadow">
					<table className="min-w-[1200px] w-full divide-y divide-gray-200">
						<thead className="bg-black text-white">
							<tr>
								<th className="px-4 py-2 text-left">নাম</th>
								<th className="px-4 py-2 text-left">মোবাইল</th>
								<th className="px-4 py-2 text-left">পরিমাণ</th>
								<th className="px-4 py-2 text-left">ট্রাঞ্জাকশন ID</th>
								<th className="px-4 py-2 text-left">তারিখ</th>
								<th className="px-4 py-2 text-left">স্ট্যাটাস</th>
								<th className="px-4 py-2 text-left">অ্যাকশন</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{transactions.map((item, index) => (
								<tr
									key={item._id}
									className={
										index % 2 === 0
											? "bg-gray-100"
											: "bg-white hover:bg-gray-100"
									}>
									<td className="px-4 py-2">{item?.userId?.fullName}</td>
									
									<td className="px-4 py-2">{item?.number}</td>
									<td className="px-4 py-2">৳ {item.amount}</td>
									<td className="px-4 py-2">{item.trxID}</td>
									<td className="px-4 py-2">
										{new Date(item.createdAt).toLocaleString("bn-BD")}
									</td>
									<td className="px-4 py-2">
										<span
											className={`px-2 py-1 rounded text-xs font-semibold capitalize
		${item.status === "approved" && "bg-green-100 text-green-700"}
		${item.status === "rejected" && "bg-red-100 text-red-700"}
		${item.status === "pending" && "bg-yellow-100 text-yellow-700"}
	`}>
											{item.status || "pending"}
										</span>
									</td>
									<td className="px-4 py-2 space-x-2">
										{item.status === "pending" && (
											<>
												<button
													onClick={() =>
														handleStatusChange(item._id, "approved")
													}
													className="px-2 py-1 bg-green-500 text-white text-xs rounded">
													অ্যাপ্রুভ
												</button>
												<button
													onClick={() =>
														handleStatusChange(item._id, "rejected")
													}
													className="px-2 py-1 bg-red-500 text-white text-xs rounded">
													বাতিল
												</button>
											</>
										)}
									</td>
								</tr>
							))}
							{transactions.length === 0 && (
								<tr>
									<td
										colSpan={7}
										className="px-4 py-6 text-center text-gray-500">
										কোনো পেমেন্ট পাওয়া যায়নি
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
