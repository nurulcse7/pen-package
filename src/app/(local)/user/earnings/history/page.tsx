"use client";

import { baseApi } from "@/lib/baseApi";
import { useState, useEffect } from "react";

type Earning = {
	_id: number;
	title: string;
	source: string;
	amount: number;
	date: string;
	status: "Paid" | "Pending" | "Rejected";
};

export default function EarningsHistoryPage() {
	const [earnings, setEarnings] = useState<Earning[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const res = await baseApi(
					`/histories/get-history?page=${page}&limit=6`
				);

				if (res.success) {
					setEarnings(res.history);
					setTotalPages(res.totalPages);
				} else {
					setError("ইতিহাস আনতে সমস্যা হয়েছে");
				}
			} catch (err: any) {
				setError(err?.message);
			} finally {
				setLoading(false);
			}
		};
		fetchHistory();
	}, [page]);

	const totalBySource = earnings.reduce((acc, cur) => {
		acc[cur.source] = (acc[cur.source] || 0) + cur.amount;
		return acc;
	}, {} as Record<string, number>);

	// মোট ইনকাম
	const totalIncome = earnings.reduce((acc, cur) => acc + cur.amount, 0);

	if (loading) return <p>⏳ লোড হচ্ছে...</p>;
	if (error)
		return <p className="text-red-500 text-center font-bold pt-5">{error}</p>;
	return (
		<main>
			<div className="max-w-5xl mx-auto p-6">
				<h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
					💰 আমার আয়ের হিস্টোরি
				</h1>

				{/* Summary */}
				<section className="mb-10 bg-white p-6 rounded-md shadow-md">
					<h2 className="text-xl font-semibold mb-4">সারাংশ</h2>
					<p className="text-lg font-medium mb-3">
						মোট আয়:{" "}
						<span className="text-green-600">
							{totalIncome.toLocaleString()} টাকা
						</span>
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{Object.entries(totalBySource).map(([source, amount]) => (
							<div
								key={source}
								className="bg-indigo-100 p-4 rounded shadow text-center font-medium">
								<p className="text-indigo-800">{source}</p>
								<p className="text-green-700">{amount.toLocaleString()} টাকা</p>
							</div>
						))}
					</div>
				</section>

				{/* Earnings History Table */}
				<section className="bg-white p-6 rounded-md shadow-md">
					<h2 className="text-xl font-semibold mb-4">বিস্তারিত আয়</h2>
					<div className="overflow-x-auto">
						<table className="min-w-full border border-gray-300">
							<thead className="bg-indigo-50">
								<tr>
									<th className="p-3 border-b border-gray-300 text-left">
										Title
									</th>
									<th className="p-3 border-b border-gray-300 text-right">
										টাকা
									</th>
									<th className="p-3 border-b border-gray-300 text-left">
										তারিখ
									</th>
									<th className="p-3 border-b border-gray-300 text-left">
										সোর্স
									</th>

									<th className="p-3 border-b border-gray-300 text-left">
										স্ট্যাটাস
									</th>
								</tr>
							</thead>
							<tbody>
								{earnings.map(
									({ _id, date, source, amount, status, title }) => (
										<tr
											key={_id}
											className="hover:bg-indigo-50 transition-colors  cursor-default">
											<td className="p-3 border-b border-gray-300 align-top">
												<div
													className="max-w-[220px] capitalize  font-medium text-gray-800"
													title={title}>
													{title}
												</div>
											</td>

											<td className="p-3 border-b border-gray-300 text-right align-top">
												{source === "Withdraw" && status === "Paid" ? (
													<span className="text-red-600">-৳ {amount}</span>
												) : (
													<span className="text-green-600">+৳ {amount}</span>
												)}
											</td>

											<td className="p-3 border-b border-gray-300 align-top">
												{new Date(date).toLocaleDateString("bn-BD", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</td>

											<td className="p-3 border-b border-gray-300 align-top">
												{source === "Video" && (
													<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
														🎥 ভিডিও
													</span>
												)}
												{source === "Ads" && (
													<span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
														📢 বিজ্ঞাপন
													</span>
												)}
												{source === "Packaging" && (
													<span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
														✍️ পেন প্যাকেজ
													</span>
												)}
												{source === "Withdraw" && (
													<span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">
														💸 উত্তোলন
													</span>
												)}
											</td>

											<td
												className={`p-3 border-b border-gray-300 font-semibold align-top ${
													status === "Paid"
														? "text-green-600"
														: status === "Pending"
														? "text-yellow-600"
														: "text-red-600"
												}`}>
												{status}
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				</section>
			</div>
			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-8 flex justify-center gap-2">
					<button
						disabled={page === 1}
						onClick={() => setPage(prev => prev - 1)}
						className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
						← পূর্ববর্তী
					</button>
					{Array.from({ length: totalPages }, (_, i) => (
						<button
							key={i + 1}
							onClick={() => setPage(i + 1)}
							className={`px-3 py-1 rounded ${
								page === i + 1
									? "bg-blue-600 text-white"
									: "bg-gray-100 hover:bg-gray-200"
							}`}>
							{i + 1}
						</button>
					))}
					<button
						disabled={page === totalPages}
						onClick={() => setPage(prev => prev + 1)}
						className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
						পরবর্তী →
					</button>
				</div>
			)}
		</main>
	);
}
