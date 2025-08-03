"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { baseApi } from "@/lib/baseApi";

type Video = {
	_id?: string;
	title: string;
	url: string;
	reward: number;
	status: "Published" | "Draft";
};

export default function EditVideoPage() {
	const router = useRouter();
	const { id } = useParams();
	const [video, setVideo] = useState<Video>({
		title: "",
		url: "",
		reward: 0,
		status: "Published",
	});
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(true);

	// ✅ Fetch existing video by ID
	useEffect(() => {
		setLoadingData(true);
		if (!id) return;
		const fetchVideo = async () => {
			try {
				const res = await baseApi(`/videos/${id}`);
				if (!res.success) throw new Error("Failed to fetch video");
				setVideo(res.video);
			} catch (error: any) {
				toast.error(error?.message || "ভিডিও আনতে সমস্যা হয়েছে!");
				router.push("/admin/manage/videos");
			} finally {
				setLoadingData(false);
			}
		};
		fetchVideo();
	}, [router, id]);


	// ✅ Handle input change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setVideo(prev => ({
			...prev,
			[name]: name === "reward" ? parseFloat(value) : value,
		}));
	};
 
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await baseApi(`/videos/${id}`, {
				method: "PUT",
				body: video,
			});
			if (res.success) {
				toast.success("✅ ভিডিও সফলভাবে আপডেট হয়েছে!");
				router.push("/admin/manage/videos");
			} else {
				toast.error("❌ ভিডিও আপডেট ব্যর্থ হয়েছে!");
			}
		} catch (err:any) {
			toast.error(err.message || "⚠️ সার্ভার সমস্যা!");
		} finally {
			setLoading(false);
		}
	};

	if (loadingData)
		return <div className="p-6 text-center">⏳ ভিডিও লোড হচ্ছে...</div>;

	// ✅ Form design
	return (
		<div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
			<h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
				🎬 ভিডিও আপডেট করুন
			</h2>
			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
					<label className="block font-semibold mb-1">📌 ভিডিও শিরোনাম</label>
					<input
						type="text"
						name="title"
						value={video.title}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">🔗 ভিডিও URL</label>
					<input
						type="url"
						name="url"
						value={video.url}
						onChange={handleChange}
						required
						className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">💰 রিওয়ার্ড (৳)</label>
					<input
						type="number"
						name="reward"
						value={video.reward}
						onChange={handleChange}
						min={0}
						step={0.01}
						required
						className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">📃 স্ট্যাটাস</label>
					<select
						name="status"
						value={video.status}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
						<option value="Published">✅ Published</option>
						<option value="Draft">📝 Draft</option>
					</select>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded hover:opacity-90 transition">
					{loading ? "⏳ সেভ হচ্ছে..." : "💾 সেভ করুন"}
				</button>
			</form>
		</div>
	);
}
