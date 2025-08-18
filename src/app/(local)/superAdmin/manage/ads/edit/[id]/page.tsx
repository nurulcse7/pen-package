"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";

type Ad = {
	_id?: string;
	title: string;
	url: string;
	reward: number;
	status: "Published" | "Draft";
};

export default function EditAdPage() {
	const router = useRouter();
	const { id } = useParams();
	const [ad, setAd] = useState<Ad>({
		title: "",
		url: "",
		reward: 0,
		status: "Published",
	});
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(true);

	useEffect(() => {
		setLoadingData(true);
		if (!id) return;
		const fetchAd = async () => {
			try {
				const res = await baseApi(`/ads/${id}`);
				if (!res.success) throw new Error("Failed to fetch ad");
				setAd(res.ad);
			} catch (error:any) {
				toast.error(error.message||"অ্যাড আনতে সমস্যা হয়েছে!" );
				router.push("/admin/manage/ads");
			} finally {
				setLoadingData(false);
			}
		};
		fetchAd();
	}, [router,id]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setAd(prev => ({
			...prev,
			[name]: name === "reward" ? parseFloat(value) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await baseApi(`/ads/${id}`, {
				method: "PUT",
				body: ad,
			});

			if (!res.success) throw new Error("Failed to update");

			router.push("/admin/manage/ads");
			toast(res.message);
		} catch {
			alert("ত্রুটি হয়েছে, আবার চেষ্টা করুন");
		} finally {
			setLoading(false);
		}
	};

	if (loadingData) return <div className="p-6 text-center">লোড হচ্ছে...</div>;

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
			<h1 className="text-2xl font-bold mb-6">✏️ অ্যাড এডিট করুন</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block font-semibold mb-1">অ্যাড শিরোনাম</label>
					<input
						type="text"
						required
						name="title"
						value={ad?.title}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">অ্যাড URL</label>
					<input
						type="url"
						required
						name="url"
						value={ad.url}
						onChange={handleChange}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">রিওয়ার্ড (টাকা)</label>
					<input
						type="number"
						name="reward"
						value={ad.reward}
						onChange={handleChange}
						min={0}
						step={0.01}
						className="w-full border px-3 py-2 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">স্ট্যাটাস</label>
					<select
						name="status"
						value={ad.status}
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
