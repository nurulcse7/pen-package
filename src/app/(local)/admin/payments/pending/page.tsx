"use client";

import { baseApi } from "@/lib/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Payment = {
	_id: string;
	userName: string;
	userEmail: string;
	amount: number;
	method: string;
	status: string;
	date: string;
};

export default function PendingPayments() {
	const [pendingPayments, setPendingPayments] = useState<Payment[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const res = await baseApi("/payments");
				if (!res.success) throw new Error("Failed to fetch payments");

				// Filter only pending payments
				const pending = (res.payments || []).filter(
					(payment: Payment) => payment.status === "pending"
				);

				setPendingPayments(pending);
			} catch (err: any) {
				setError(err.message || "Error fetching payments");
				toast.error("পেমেন্ট ডেটা লোড করতে সমস্যা হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchPayments();
	}, []);

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
								ইমেইল
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								অ্যামাউন্ট
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								পেমেন্ট মেথড
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								তারিখ
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								স্ট্যাটাস
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{pendingPayments.length > 0 ? (
							pendingPayments.map(payment => (
								<tr key={payment._id}>
									<td className="px-4 py-2">{payment.userName}</td>
									<td className="px-4 py-2">{payment.userEmail}</td>
									<td className="px-4 py-2 text-green-700 font-semibold">
										৳ {payment.amount}
									</td>
									<td className="px-4 py-2 capitalize">{payment.method}</td>
									<td className="px-4 py-2">
										{new Date(payment.date).toLocaleDateString("bn-BD")}
									</td>
									<td className="px-4 py-2">
										<span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
											Pending
										</span>
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
