"use client";

import { useState, useEffect } from "react";

type Earning = {
	id: number;
	source: string;
	amount: number;
	date: string; // ISO string
	status: "Paid" | "Pending" | "Rejected";
};

const dummyEarnings: Earning[] = [
	{
		id: 1,
		source: "প্যাকেজিং",
		amount: 500,
		date: "2025-07-15T10:00:00Z",
		status: "Paid",
	},
	{
		id: 2,
		source: "ভিডিও দেখে আয়",
		amount: 300,
		date: "2025-07-18T15:30:00Z",
		status: "Pending",
	},
	{
		id: 3,
		source: "অ্যাড দেখে আয়",
		amount: 200,
		date: "2025-07-19T09:45:00Z",
		status: "Paid",
	},
	{
		id: 4,
		source: "প্যাকেজিং",
		amount: 700,
		date: "2025-07-20T12:15:00Z",
		status: "Rejected",
	},
];

export default function EarningsHistoryPage() {
	const [earnings, setEarnings] = useState<Earning[]>([]);

	useEffect(() => {
		// আসলে API থেকে ডেটা নিয়ে আসবে
		// setEarnings(await fetch('/api/earnings').then(res => res.json()));
		setEarnings(dummyEarnings);
	}, []);

	// সোর্স অনুযায়ী টোটাল ইনকাম হিসাব
	const totalBySource = earnings.reduce((acc, cur) => {
		acc[cur.source] = (acc[cur.source] || 0) + cur.amount;
		return acc;
	}, {} as Record<string, number>);

	// মোট ইনকাম
	const totalIncome = earnings.reduce((acc, cur) => acc + cur.amount, 0);

	return (
		<main className="max-w-5xl mx-auto p-6">
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
									তারিখ
								</th>
								<th className="p-3 border-b border-gray-300 text-left">
									সোর্স
								</th>
								<th className="p-3 border-b border-gray-300 text-right">
									টাকা
								</th>
								<th className="p-3 border-b border-gray-300 text-left">
									স্ট্যাটাস
								</th>
							</tr>
						</thead>
						<tbody>
							{earnings.map(({ id, date, source, amount, status }) => (
								<tr
									key={id}
									className="hover:bg-indigo-50 transition-colors cursor-default">
									<td className="p-3 border-b border-gray-300">
										{new Date(date).toLocaleDateString("bn-BD", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</td>
									<td className="p-3 border-b border-gray-300">{source}</td>
									<td className="p-3 border-b border-gray-300 text-right">
										{amount.toLocaleString()} টাকা
									</td>
									<td
										className={`p-3 border-b border-gray-300 font-semibold ${
											status === "Paid"
												? "text-green-600"
												: status === "Pending"
												? "text-yellow-600"
												: "text-red-600"
										}`}>
										{status}
									</td>
								</tr>
							))}
							{earnings.length === 0 && (
								<tr>
									<td
										colSpan={4}
										className="p-4 text-center text-gray-500 italic">
										কোন আয় পাওয়া যায়নি।
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</section>
		</main>
	);
}
