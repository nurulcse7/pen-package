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
	status: "pending" | "approved" | "rejected";
	date: string;
};

export default function PaymentHistory() {
	const [payments, setPayments] = useState<Payment[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const res = await baseApi("/payments");
				if (!res.success) throw new Error("Failed to fetch payments");
				setPayments(res.payments || []);
			} catch (err: any) {
				setError(err.message || "Error fetching payments");
				toast.error("পেমেন্ট হিস্টোরি লোড করতে সমস্যা হয়েছে");
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
			<h2 className="text-2xl font-bold mb-4 text-blue-700">
				পেমেন্ট হিস্টোরি
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
								মেথড
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
						{payments.length > 0 ? (
							payments.map(payment => (
								<tr key={payment._id}>
									<td className="px-4 py-2">{payment.userName}</td>
									<td className="px-4 py-2">{payment.userEmail}</td>
									<td className="px-4 py-2 text-green-700 font-semibold">
										৳ {payment.amount}
									</td>
									<td className="px-4 py-2 capitalize">{payment.method}</td>
									<td className="px-4 py-2">
										{new Date(payment.date).toLocaleDateString("bn-BD", {
											day: "numeric",
											month: "long",
											year: "numeric",
										})}
									</td>
									<td className="px-4 py-2">
										<span
											className={`px-2 py-1 rounded text-xs font-semibold ${
												payment.status === "pending"
													? "bg-yellow-100 text-yellow-800"
													: payment.status === "approved"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-700"
											}`}>
											{payment.status}
										</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className="text-center py-6 text-gray-500">
									কোনো পেমেন্ট পাওয়া যায়নি
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
