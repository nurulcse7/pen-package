"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAdPage() {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [reward, setReward] = useState(0);
	const [status, setStatus] = useState<"Published" | "Draft">("Draft");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch("/api/admin/ads", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, url, reward, status }),
			});

			if (!res.ok) throw new Error("Failed to add ad");

			alert("নতুন অ্যাড সফলভাবে যোগ করা হয়েছে!");
			router.push("/admin/content/ads");
		} catch (error) {
			alert("ত্রুটি হয়েছে, আবার চেষ্টা করুন!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
			<h1 className="text-2xl font-bold mb-6">➕ নতুন অ্যাড যোগ করুন</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-semibold mb-1">অ্যাড শিরোনাম</label>
					<input
						type="text"
						required
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="w-full border px-3 py-2 rounded"
						placeholder="অ্যাডের নাম লিখুন"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">অ্যাড URL</label>
					<input
						type="url"
						required
						value={url}
						onChange={e => setUrl(e.target.value)}
						className="w-full border px-3 py-2 rounded"
						placeholder="অ্যাডের লিঙ্ক দিন"
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
					className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded hover:opacity-90 transition">
					{loading ? "সেভ হচ্ছে..." : "সেভ করুন"}
				</button>
			</form>
		</div>
	);
}
