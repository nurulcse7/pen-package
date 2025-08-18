"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";

interface Ad {
	_id: string;
	title: string;
	reward: number;
	status: "Published" | "Draft";
	createdAt: string;
}

export default function AdminAdsPage() {
	const router = useRouter();
	const [ads, setAds] = useState<Ad[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchAds = async () => {
			try {
				const res = await baseApi("/ads");
				if (res.success) {
					setAds(res.ads || []);
				} else {
					setError("অ্যাড আনতে সমস্যা হয়েছে");
				}
			} catch (err) {
				console.error(err);
				setError("সার্ভার ত্রুটি হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchAds();
	}, []);

	const handleDelete = async (id: string) => {
		const confirmDelete = confirm("আপনি কি নিশ্চিতভাবে ডিলিট করতে চান?");
		if (!confirmDelete) return;

		try {
			const res = await baseApi(`/ads/${id}`, {
				method: "DELETE",
			});

			if (res.success) {
				const updated = ads.filter(ad => ad._id !== id);
				setAds(updated);
				toast.success(res.message);
			} else {
				toast.error(res.message || "অ্যাড করা যায়নি।");
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	const handleEdit = (id: string) => {
		router.push(`/admin/manage/ads/edit/${id}`);
	};

	if (loading) return <p>⏳ লোড হচ্ছে...</p>;
	if (error) return <p className="text-red-500">{error}</p>;
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
								<th className="px-4 py-2 border border-gray-400">
									রিওয়ার্ড (৳)
								</th>
								<th className="px-4 py-2 border border-gray-400">স্ট্যাটাস</th>
								<th className="px-4 py-2 border border-gray-400">তারিখ</th>
								<th className="px-4 py-2 border border-gray-400">অ্যাকশন</th>
							</tr>
						</thead>
						<tbody>
							{ads.map(ad => (
								<tr key={ad._id} className="hover:bg-gray-50">
									<td className="px-4 py-2 border border-gray-400">
										{ad.title}
									</td>
									<td className="px-4 py-2 border border-gray-400">
										{ad.reward}
									</td>
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
									<td className="px-4 py-2 border border-gray-400">
										{" "}
										{new Date(ad?.createdAt).toLocaleDateString("bn-BD", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</td>
									<td className="px-4 py-2 border border-gray-400">
										<div className="flex gap-3">
											<button
												onClick={() => handleEdit(ad._id)}
												className="text-indigo-600 hover:underline text-xs font-semibold">
												✏️ Edit
											</button>
											<button
												onClick={() => handleDelete(ad._id)}
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
