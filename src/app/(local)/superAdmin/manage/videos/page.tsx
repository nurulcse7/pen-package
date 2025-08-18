"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";

interface Video {
	_id: string;
	title: string;
	reward: number;
	status: "Published" | "Draft";
	createdAt: string;
}

export default function AdminVideosPage() {
	const router = useRouter();

	const [videos, setVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const res = await baseApi("/videos");
				if (res.success) {
					setVideos(res.videos || []);
				} else {
					setError("ভিডিও আনতে সমস্যা হয়েছে");
				}
			} catch (err) {
				console.error(err);
				setError("সার্ভার ত্রুটি হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchVideos();
	}, []);

	const handleDelete = async (id: string) => {
		const confirmDelete = confirm("আপনি কি নিশ্চিতভাবে ডিলিট করতে চান?");
		if (!confirmDelete) return;

		try {
			const res = await baseApi(`/videos/${id}`, {
				method: "DELETE",
			});

			if (res.success) {
				const updated = videos.filter(video => video._id !== id);
				setVideos(updated);
				toast.success(res.message);
			} else {
				toast.error(res.message || "ডিলিট করা যায়নি।");
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	const handleEdit = (id: string) => {
		router.push(`/admin/manage/videos/edit/${id}`);
	};

	if (loading) return <p>⏳ লোড হচ্ছে...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

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
								<th className="px-4 py-2 border border-gray-400">
									রিওয়ার্ড (৳)
								</th>
								<th className="px-4 py-2 border border-gray-400">স্ট্যাটাস</th>
								<th className="px-4 py-2 border border-gray-400">তারিখ</th>
								<th className="px-4 py-2 border border-gray-400">অ্যাকশন</th>
							</tr>
						</thead>
						<tbody>
							{videos.map(video => (
								<tr key={video._id} className="hover:bg-gray-50">
									<td className="px-4 py-2 border border-gray-400">
										{video.title}
									</td>
									<td className="px-4 py-2 border border-gray-400">
										{video.reward}
									</td>
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
									<td className="px-4 py-2 border border-gray-400">
										{new Date(video?.createdAt).toLocaleDateString("bn-BD", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</td>
									<td className="px-4 py-2 border border-gray-400">
										<div className="flex gap-3">
											<button
												onClick={() => handleEdit(video._id)}
												className="text-indigo-600 hover:underline text-xs font-semibold">
												✏️ Edit
											</button>
											<button
												onClick={() => handleDelete(video._id)}
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
