"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReactPlayer from "react-player";
import { useUser } from "@/context/UserContext";
import { baseApi } from "@/lib/baseApi";

interface Ad {
	_id: string;
	title: string;
	url: string; // ensure videoUrl exists
	reward: number;
	status: "Published" | "Draft";
	createdAt: string;
}

export default function WatchAdsPage() {
	const { user, setUser } = useUser();
	const [ads, setAds] = useState<Ad[]>([]);
	const [watchedIds, setWatchedIds] = useState<string[]>([]);
	const [currentAd, setCurrentAd] = useState<Ad | null>(null);
	const [earned, setEarned] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// 🔄 বিজ্ঞাপন লোড
	useEffect(() => {
		const fetchAds = async () => {
			try {
				const res = await baseApi("/watched-ads/unwatched");
				if (res.success) {
					setAds(res.ads || []);
				} else {
					setError("বিজ্ঞাপন আনতে সমস্যা হয়েছে");
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

	// ✅ প্রথম ad দেখাও
	useEffect(() => {
		if (ads.length > 0) {
			const nextAd = ads.find(ad => !watchedIds.includes(ad._id));
			setCurrentAd(nextAd || null);
		}
	}, [ads, watchedIds]);

	// 🎯 ভিডিও দেখা শেষ হলে reward এবং পরবর্তী ad
	const handleAdComplete = async (id: string) => {
		if (watchedIds.includes(id)) return;

		const ad = ads.find(v => v._id === id);
		if (!ad) return;

		try {
			const res = await baseApi("/watched-ads/ad-complete", {
				method: "POST",
				body: { adsId: id, title: ad.title, reward: ad.reward },
			});

			if (!res.success) throw new Error();

			setUser({ ...user, balance: res.newBalance });
			setEarned(prev => prev + ad.reward);
			setWatchedIds(prev => [...prev, id]);
			toast.success(res.message);
		} catch (error: any) {
			toast.error(error?.message || "ইনকাম আপডেট করতে সমস্যা হয়েছে।");
		}
	};

	return (
		<div className="max-w-xl mx-auto py-10 px-4 text-center">
			<h1 className="text-3xl font-bold text-indigo-700 mb-4">
				📲 বিজ্ঞাপন দেখে ইনকাম
			</h1>

			{loading ? (
				<p className="text-gray-500">লোড হচ্ছে...</p>
			) : error ? (
				<p className="text-red-600">{error}</p>
			) : currentAd ? (
				<>
					<p className="text-gray-600 mb-6">
						একটি বিজ্ঞাপন শেষ হলে পরবর্তীটি দেখানো হবে।
					</p>
					<div className="bg-white p-5 rounded shadow">
						<h2 className="text-xl font-semibold text-blue-800 mb-3">
							{currentAd.title}
						</h2>
						<ReactPlayer
							src={currentAd.url}
							controls
							width="100%"
							onEnded={() => handleAdComplete(currentAd._id)}
						/>
						<p className="mt-2 text-green-600 font-medium">
							🎁 এই বিজ্ঞাপনের ইনকাম: {currentAd.reward} টাকা
						</p>
					</div>
				</>
			) : (
				<div className="bg-white p-6 rounded shadow text-gray-700">
					<h2 className="text-xl font-semibold text-red-600 mb-2">
						এই মুহূর্তে কোনো বিজ্ঞাপন নেই
					</h2>
					<p>নতুন বিজ্ঞাপন এলে এখানে পাওয়া যাবে।</p>
				</div>
			)}

			<p className="mt-6 text-gray-700">
				মোট ইনকাম:{" "}
				<span className="font-bold text-indigo-600">{earned} টাকা</span>
			</p>
		</div>
	);
}
