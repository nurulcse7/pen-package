"use client";

import { baseApi } from "@/lib/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Payment = {
	_id: string;
	userId?: any;
	number: number;
	amount: number;
	method: string;
	status: string;
	createdAt: string;
};

export default function PendingPayments() {
	const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const res = await baseApi("/withdraw/all?status=Pending");
				if (!res.success) throw new Error("Failed to fetch payments");
				setPendingPayments(res.requests);
			} catch (err: any) {
				setError(err.message || "Error fetching payments");
				toast.error("পেমেন্ট ডেটা লোড করতে সমস্যা হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchPayments();
	}, []);

	const handleApproveReject = async (id: string, status: string) => {
		if (status === "Rejected") {
			const confirmed = window.confirm("আপনি কি নিশ্চিতভাবে রিজেক্ট করতে চান?");
			if (!confirmed) return;
		}

		try {
			const res = await baseApi(`/withdraw/status/${id}`, {
				method: "PUT",
				body: { status },
			});

			if (res.success) {
				toast.success(res.message || "স্ট্যাটাস আপডেট সফল হয়েছে");
				setPendingPayments(prev => prev.filter(item => item._id !== id));
			} else {
				toast.error(res.message || "স্ট্যাটাস আপডেট ব্যর্থ হয়েছে");
			}
		} catch (err) {
			console.error("Approve/Reject Error:", err);
			toast.error("সার্ভার সমস্যা হয়েছে");
		}
	};

	if (loading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;
	if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-4 text-blue-600">
				পেন্ডিং পেমেন্ট তালিকা
			</h2>

			<div className="overflow-x-auto bg-white rounded shadow">
				<table className="min-w-[900px] w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								নাম
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								পেমেন্ট মেথড
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								পেমেন্ট নাম্বার
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								অ্যামাউন্ট
							</th>

							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								তারিখ
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								স্ট্যাটাস
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								অ্যাকশন
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{pendingPayments.length > 0 ? (
							pendingPayments.map(payment => (
								<tr key={payment._id}>
									<td className="px-4 py-2">{payment?.userId?.fullName}</td>
									<td className="px-4 py-2 capitalize">{payment.method}</td>
									<td className="px-4 py-2">{payment?.number}</td>
									<td className="px-4 py-2 text-green-700 font-semibold">
										৳ {payment.amount}
									</td>

									<td className="px-4 py-2">
										{new Date(payment.createdAt).toLocaleDateString("bn-BD")}
									</td>
									<td className="px-4 py-2">
										<span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
											{payment?.status}
										</span>
									</td>
									<td className="px-4 py-2 space-x-1 max-w-[50px]">
										<button
											onClick={() => handleApproveReject(payment?._id, "Paid")}
											className="text-xs font-bold px-2 py-1 bg-green-500 text-white rounded">
											Approve
										</button>
										<button
											onClick={() =>
												handleApproveReject(payment?._id, "Rejected")
											}
											className="text-xs font-bold px-2 py-1 bg-red-500 text-white rounded">
											Reject
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className="text-center py-6 text-gray-500">
									কোনো পেন্ডিং পেমেন্ট পাওয়া যায়নি
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
