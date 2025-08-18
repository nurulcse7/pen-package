"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";

export default function NewVideoPage() {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [reward, setReward] = useState(0);
	const [status, setStatus] = useState<"Published" | "Draft">("Published");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await baseApi("/videos/create-video", {
				method: "POST",
				body: { title, url, reward, status },
			});

			if (!res.success) throw new Error();

			toast.success(res.message);
			router.push("/admin/manage/videos");
		} catch (error: any) {
			toast.error(error?.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
			<h1 className="text-2xl font-bold mb-6">➕ নতুন ভিডিও যোগ করুন</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-semibold mb-1">ভিডিও শিরোনাম</label>
					<input
						type="text"
						required
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="w-full border px-3 py-2 rounded"
						placeholder="ভিডিওর নাম লিখুন"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">ভিডিও URL</label>
					<input
						type="url"
						required
						value={url}
						onChange={e => setUrl(e.target.value)}
						className="w-full border px-3 py-2 rounded"
						placeholder="ভিডিওর ইউটিউব লিঙ্ক বা অন্য লিঙ্ক"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">রিওয়ার্ড (টাকা)</label>
					<input
						type="number"
						min={0}
						step="0.01"
						required
						value={reward}
						onChange={e => setReward(parseFloat(e.target.value))}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">স্ট্যাটাস</label>
					<select
						value={status}
						onChange={e => setStatus(e.target.value as "Published" | "Draft")}
						className="w-full border px-3 py-2 rounded">
						<option value="Published">Published</option>
						<option value="Draft">Draft</option>
					</select>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded hover:opacity-90 transition">
					{loading ? "সেভ হচ্ছে..." : "সেভ করুন"}
				</button>
			</form>
		</div>
	);
}
