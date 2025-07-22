"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReactPlayer from "react-player";

const ads = [
	{
		id: 1,
		title: "নতুন পণ্যের বিজ্ঞাপন",
		videoUrl: "https://youtu.be/jCVjudmnByk?si=fNoDxIEJx8QyPGJX",
		reward: 2,
	},
	{
		id: 2,
		title: "ডিসকাউন্ট অফার বিজ্ঞাপন",
		videoUrl: "https://youtu.be/jCVjudmnByk?si=fNoDxIEJx8QyPGJX",
		reward: 3,
	},
];

export default function WatchAdsPage() {
	const [watchedIds, setWatchedIds] = useState<number[]>([]);
	const [currentAd, setCurrentAd] = useState<any | null>(null);
	const [earned, setEarned] = useState(0);

	useEffect(() => {
		const nextAd = ads.find(ad => !watchedIds.includes(ad.id));
		setCurrentAd(nextAd || null);
	}, [watchedIds]);

	const handleAdComplete = () => {
		if (!currentAd) return;

		toast.success(`✅ ${currentAd.reward} টাকা ইনকাম হয়েছে!`);
		setEarned(prev => prev + currentAd.reward);
		setWatchedIds(prev => [...prev, currentAd.id]);
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
							onEnded={handleAdComplete}
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
