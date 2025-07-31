"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Video {
	id: string;
	title: string;
	reward: number;
	status: "Published" | "Draft";
	createdAt: string;
}

const initialVideos: Video[] = [
	{
		id: "vid001",
		title: "আয়ের জন্য প্রথম ভিডিও",
		reward: 5,
		status: "Published",
		createdAt: "2025-07-29",
	},
	{
		id: "vid002",
		title: "দ্বিতীয় ভিডিও - বিজ্ঞাপন দেখা",
		reward: 3,
		status: "Draft",
		createdAt: "2025-07-30",
	},
	{
		id: "vid003",
		title: "ভবিষ্যতের ভিডিও",
		reward: 4,
		status: "Published",
		createdAt: "2025-07-31",
	},
];

export default function AdminVideosPage() {
	const [videos, setVideos] = useState<Video[]>(initialVideos);
	const router = useRouter();

	const handleDelete = (id: string) => {
		const confirmDelete = confirm("আপনি কি নিশ্চিতভাবে ডিলিট করতে চান?");
		if (!confirmDelete) return;

		const updated = videos.filter(video => video.id !== id);
		setVideos(updated);
	};

	const handleEdit = (id: string) => {
		router.push(`/admin/manage/videos/edit/${id}`);
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between flex-wrap gap-2">
				<h1 className="text-2xl font-bold">🎥 ভিডিও ম্যানেজমেন্ট</h1>
				<Link href="/admin/manage/videos/create">
					<button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded shadow hover:opacity-90 text-sm">
						➕ নতুন ভিডিও যোগ করুন
					</button>
				</Link>
			</div>

			<div className="overflow-x-auto rounded-xl border border-gray-300 p-4 shadow-sm bg-white">
				{videos.length === 0 ? (
					<p className="text-gray-500">কোনো ভিডিও পাওয়া যায়নি।</p>
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
							{videos.map(video => (
								<tr key={video.id} className="hover:bg-gray-50">
									<td className="px-4 py-2 border border-gray-400">{video.title}</td>
									<td className="px-4 py-2 border border-gray-400">{video.reward}</td>
									<td className="px-4 py-2 border border-gray-400">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${
												video.status === "Published"
													? "bg-green-100 text-green-700"
													: "bg-yellow-100 text-yellow-700"
											}`}>
											{video.status}
										</span>
									</td>
									<td className="px-4 py-2 border border-gray-400">{video.createdAt}</td>
									<td className="px-4 py-2 border border-gray-400">
										<div className="flex gap-3">
											<button
												onClick={() => handleEdit(video.id)}
												className="text-indigo-600 hover:underline text-xs font-semibold">
												✏️ Edit
											</button>
											<button
												onClick={() => handleDelete(video.id)}
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
