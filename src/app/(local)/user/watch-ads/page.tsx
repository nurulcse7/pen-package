"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReactPlayer from "react-player";
import { useUser } from "@/context/UserContext";
import { baseApi } from "@/lib/baseApi";

const ads = [
	{
		id: 111,
		title: "নতুন পণ্যের বিজ্ঞাপন",
		videoUrl: "https://youtu.be/GQy3mSk3l28?si=ja6U1Eylt2gVqI_5",
		reward: 2,
	},
	{
		id: 121,
		title: "ডিসকাউন্ট অফার বিজ্ঞাপন",
		videoUrl: "https://youtu.be/q3cyERrHrDw?si=TgY5R0cF0V39sr6W",
		reward: 3,
	},
];

export default function WatchAdsPage() {
	const { user, setUser } = useUser();
	const [watchedIds, setWatchedIds] = useState<number[]>([]);
	const [currentAd, setCurrentAd] = useState<any | null>(null);
	const [earned, setEarned] = useState(0);

	useEffect(() => {
		const nextAd = ads.find(ad => !watchedIds.includes(ad.id));
		setCurrentAd(nextAd || null);
	}, [watchedIds]);

	const handleAdComplete = async (id: number) => {
		if (!watchedIds.includes(id)) {
			const video = ads.find(v => v.id === id);
			if (!video) return;

			try {
				const res = await baseApi("/videos/video-complete", {
					method: "POST",
					body: { videoId: id, title: video?.title, reward: video.reward },
				});

				if (!res.success) throw new Error();

				setUser({ ...user, balance: res.newBalance });
				setEarned(earned + video?.reward);
				setWatchedIds(prev => [...prev, id]);
				toast.success("🎉 ভিডিও দেখেছেন! ইনকাম যুক্ত হয়েছে।");
			} catch (error: any) {
				toast.error(error?.message || "ইনকাম আপডেট করতে সমস্যা হয়েছে।");
			}
		}
	};
	return (
		<div className="max-w-xl mx-auto py-10 px-4 text-center">
			<h1 className="text-3xl font-bold text-indigo-700 mb-4">
				📲 বিজ্ঞাপন দেখে ইনকাম
			</h1>

			{currentAd ? (
				<>
					<p className="text-gray-600 mb-6">
						একটি বিজ্ঞাপন শেষ হলে পরবর্তীটি দেখানো হবে।
					</p>
					<div className="bg-white p-5 rounded shadow">
						<h2 className="text-xl font-semibold text-blue-800 mb-3">
							{currentAd.title}
						</h2>
						<ReactPlayer
							src={currentAd.videoUrl}
							controls
							width="100%"
							onEnded={() => handleAdComplete(currentAd?.id)}
						/>
						<p className="mt-2 text-green-600 font-medium">
							🎁 এই বিজ্ঞাপনের ইনকাম: {currentAd.reward} টাকা
						</p>
					</div>
				</>
			) : (
				<div className="bg-white p-6 rounded shadow text-gray-700">
					<h2 className="text-xl font-semibold text-red-600 mb-2">
						আজকের সব বিজ্ঞাপন আপনি দেখে ফেলেছেন
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
