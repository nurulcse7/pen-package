"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";

export default function NewPenPackagePage() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [totalTasks, setTotalTasks] = useState(1);
	const [rewardPerTask, setRewardPerTask] = useState(0.5);
	const [status, setStatus] = useState<"Published" | "Draft">("Published");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await baseApi("/pen-packages", {
				method: "POST",
				body: { title, totalTasks, rewardPerTask, status },
			});

			if (!res.success) throw new Error("Failed to add package");

			toast.success(res.message || "নতুন প্যাকেজ সফলভাবে যোগ করা হয়েছে!");
			router.push("/admin/manage/pen-packages");
		} catch (error: any) {
			toast.error(error.message || "ত্রুটি হয়েছে, আবার চেষ্টা করুন!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
			<h1 className="text-2xl font-bold mb-6">➕ নতুন পেন প্যাকেজ যোগ করুন</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-semibold mb-1">প্যাকেজ নাম</label>
					<input
						type="text"
						required
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="w-full border px-3 py-2 rounded"
						placeholder="প্যাকেজের নাম লিখুন"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">টাস্ক সংখ্যা</label>
					<input
						type="number"
						min={1}
						required
						value={totalTasks}
						onChange={e => setTotalTasks(parseInt(e.target.value))}
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
					className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded hover:opacity-90 transition">
					{loading ? "সেভ হচ্ছে..." : "সেভ করুন"}
				</button>
			</form>
		</div>
	);
}
