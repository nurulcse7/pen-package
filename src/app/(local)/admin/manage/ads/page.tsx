"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Ad {
	id: string;
	title: string;
	reward: number;
	status: "Published" | "Draft";
	createdAt: string;
}

const initialAds: Ad[] = [
	{
		id: "ad001",
		title: "প্রথম অ্যাড ভিডিও",
		reward: 2,
		status: "Published",
		createdAt: "2025-07-20",
	},
	{
		id: "ad002",
		title: "দ্বিতীয় অ্যাড",
		reward: 3,
		status: "Draft",
		createdAt: "2025-07-25",
	},
	{
		id: "ad003",
		title: "ফেসবুক অ্যাড",
		reward: 2.5,
		status: "Published",
		createdAt: "2025-07-30",
	},
];

export default function AdminAdsPage() {
	const [ads, setAds] = useState<Ad[]>(initialAds);
	const router = useRouter();

	const handleDelete = (id: string) => {
		if (confirm("আপনি কি অ্যাডটি মুছে ফেলতে চান?")) {
			setAds(ads.filter(ad => ad.id !== id));
		}
	};

	const handleEdit = (id: string) => {
		router.push(`/admin/manage/ads/edit/${id}`);
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between flex-wrap gap-2">
				<h1 className="text-2xl font-bold">📺 অ্যাড ম্যানেজমেন্ট</h1>
				<Link href="/admin/manage/ads/create">
					<button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded shadow hover:opacity-90 text-sm">
						➕ নতুন অ্যাড যুক্ত করুন
					</button>
				</Link>
			</div>

			<div className="overflow-x-auto rounded-xl border border-gray-300 p-4 shadow-sm bg-white">
				{ads.length === 0 ? (
					<p className="text-gray-500">কোনো অ্যাড পাওয়া যায়নি।</p>
				) : (
					<table className="min-w-full text-sm text-left border-collapse">
						<thead>
							<tr className="bg-gray-100 text-gray-700">
								<th className="px-4 py-2 border border-gray-400">শিরোনাম</th>
								<th className="px-4 py-2 border border-gray-400">রিওয়ার্ড (৳)</th>
								<th className="px-4 py-2 border border-gray-400">স্ট্যাটাস</th>
								<th className="px-4 py-2 border border-gray-400">তারিখ</th>
								<th className="px-4 py-2 border border-gray-400">অ্যাকশন</th>
							</tr>
						</thead>
						<tbody>
							{ads.map(ad => (
								<tr key={ad.id} className="hover:bg-gray-50">
									<td className="px-4 py-2 border border-gray-400">{ad.title}</td>
									<td className="px-4 py-2 border border-gray-400">{ad.reward}</td>
									<td className="px-4 py-2 border border-gray-400">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${
												ad.status === "Published"
													? "bg-green-100 text-green-700"
													: "bg-yellow-100 text-yellow-700"
											}`}>
											{ad.status}
										</span>
									</td>
									<td className="px-4 py-2 border border-gray-400">{ad.createdAt}</td>
									<td className="px-4 py-2 border border-gray-400">
										<div className="flex gap-3">
											<button
												onClick={() => handleEdit(ad.id)}
												className="text-indigo-600 hover:underline text-xs font-semibold">
												✏️ Edit
											</button>
											<button
												onClick={() => handleDelete(ad.id)}
												className="text-red-600 hover:underline text-xs font-semibold">
												🗑️ Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
