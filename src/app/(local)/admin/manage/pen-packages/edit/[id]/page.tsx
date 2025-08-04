"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";

type PenPackage = {
	_id?: string;
	title: string;
	totalTasks: number;
	rewardPerTask: number;
	status: "Published" | "Draft";
};

export default function EditPenPackagePage() {
	const router = useRouter();
	const { id } = useParams();
	const [pkg, setPkg] = useState<PenPackage>({
		title: "",
		totalTasks: 1,
		rewardPerTask: 0.5,
		status: "Draft",
	});
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(true);

	useEffect(() => {
		if (!id) return;

		const fetchData = async () => {
			setLoadingData(true);
			try {
				const res = await baseApi(`/pen-packages/${id}`);
				if (!res.success) throw new Error("Failed to fetch package");
				setPkg(res.data);
			} catch (err: any) {
				toast.error(err.message || "ডেটা আনতে সমস্যা হয়েছে");
				router.push("/admin/manage/pen-packages");
			} finally {
				setLoadingData(false);
			}
		};

		fetchData();
	}, [id, router]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setPkg(prev => ({
			...prev,
			[name]:
				name === "taskCount" || name === "rewardPerTask"
					? parseFloat(value)
					: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await baseApi(`/pen-packages/${id}`, {
				method: "PUT",
				body: pkg,
			});
			if (!res.success) throw new Error("Failed to update package");
			toast.success(res.message || "প্যাকেজ আপডেট সফল হয়েছে");
			router.push("/admin/manage/pen-packages");
		} catch (err: any) {
			toast.error(err.message || "আপডেট করতে সমস্যা হয়েছে");
		} finally {
			setLoading(false);
		}
	};

	if (loadingData) return <div className="p-6 text-center">লোড হচ্ছে...</div>;

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
			<h1 className="text-2xl font-bold mb-6">✏️ প্যাকেজ এডিট করুন</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-semibold mb-1">প্যাকেজ নাম</label>
					<input
						type="text"
						name="title"
						required
						value={pkg.title}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">টাস্ক সংখ্যা</label>
					<input
						type="number"
						name="totalTasks"
						min={1}
						required
						value={pkg.totalTasks}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">
						রিওয়ার্ড (টাকা / টাস্ক)
					</label>
					<input
						type="number"
						name="rewardPerTask"
						min={0}
						step="0.01"
						required
						value={pkg.rewardPerTask}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">স্ট্যাটাস</label>
					<select
						name="status"
						value={pkg.status}
						onChange={handleChange}
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
