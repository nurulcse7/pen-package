"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditPenPackagePage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id") || "";

	const [title, setTitle] = useState("");
	const [taskCount, setTaskCount] = useState(1);
	const [rewardPerTask, setRewardPerTask] = useState(0.5);
	const [status, setStatus] = useState<"Published" | "Draft">("Draft");
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(true);

	useEffect(() => {
		if (!id) return;

		// Fetch the package data by id to prefill the form
		const fetchPackage = async () => {
			setLoadingData(true);
			try {
				const res = await fetch(`/api/admin/pen-packages/${id}`);
				if (!res.ok) throw new Error("Failed to fetch data");
				const data = await res.json();
				setTitle(data.title);
				setTaskCount(data.taskCount);
				setRewardPerTask(data.rewardPerTask);
				setStatus(data.status);
			} catch (error) {
				alert("ডেটা আনতে সমস্যা হয়েছে");
				router.push("/admin/content/pen-packages");
			} finally {
				setLoadingData(false);
			}
		};

		fetchPackage();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch(`/api/admin/pen-packages/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, taskCount, rewardPerTask, status }),
			});

			if (!res.ok) throw new Error("Failed to update");

			alert("প্যাকেজ সফলভাবে আপডেট হয়েছে!");
			router.push("/admin/content/pen-packages");
		} catch (error) {
			alert("ত্রুটি হয়েছে, আবার চেষ্টা করুন");
		} finally {
			setLoading(false);
		}
	};

	if (loadingData) {
		return <div className="p-6 text-center">লোড হচ্ছে...</div>;
	}

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
			<h1 className="text-2xl font-bold mb-6">✏️ প্যাকেজ এডিট করুন</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-semibold mb-1">প্যাকেজ নাম</label>
					<input
						type="text"
						required
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">টাস্ক সংখ্যা</label>
					<input
						type="number"
						min={1}
						required
						value={taskCount}
						onChange={e => setTaskCount(parseInt(e.target.value))}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">
						রিওয়ার্ড (টাকা / টাস্ক)
					</label>
					<input
						type="number"
						min={0}
						step="0.01"
						required
						value={rewardPerTask}
						onChange={e => setRewardPerTask(parseFloat(e.target.value))}
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
					className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded hover:opacity-90 transition">
					{loading ? "সেভ হচ্ছে..." : "সেভ করুন"}
				</button>
			</form>
		</div>
	);
}
