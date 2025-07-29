"use client";

import { useUser } from "@/context/UserContext";
import { baseApi } from "@/lib/baseApi";
import { useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";

const videos = [
	{
		id: 1,
		title: "কাজ শেখার ভিডিও #১",
		url: "https://youtu.be/jCVjudmnByk?si=fNoDxIEJx8QyPGJX",
		reward: 5,
	},
	{
		id: 2,
		title: "প্যাকেজিং টিপস ভিডিও",
		url: "https://youtu.be/cUmUOb7j3dc?si=bt91MOnBYTiAkg_X",
		reward: 3,
	},
];

export default function WatchVideoPage() {
	const { user, setUser } = useUser();
	const [watched, setWatched] = useState<number[]>([]);

	const handleComplete = async (id: number) => {
		if (!watched.includes(id)) {
			const video = videos.find(v => v.id === id);
			if (!video) return;

			try {
				const res = await baseApi("/videos/video-complete", {
					method: "POST",
					body: { videoId: id, title: video?.title, reward: video.reward },
				});

				if (!res.success) throw new Error();

				setUser({ ...user, balance: res.newBalance });
				setWatched(prev => [...prev, id]);
				toast.success("🎉 ভিডিও দেখেছেন! ইনকাম যুক্ত হয়েছে।");
			} catch (error: any) {
				toast.error(error?.message || "ইনকাম আপডেট করতে সমস্যা হয়েছে।");
			}
		}
	};

	const totalIncome = watched.reduce((sum, id) => {
		const video = videos.find(v => v.id === id);
		return video ? sum + video.reward : sum;
	}, 0);

	const allWatched = watched.length === videos.length;

	return (
		<div className="max-w-4xl mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-6 text-center">
				🎥 ভিডিও দেখে আয় করুন
			</h1>

			{allWatched ? (
				<div className="bg-yellow-100 p-6 rounded-md text-center text-yellow-800 font-semibold">
					আপনি আজকের সব ভিডিও দেখেছেন। নতুন ভিডিও আসলে এখানে পাওয়া যাবে।
				</div>
			) : (
				<div className="space-y-8">
					{videos.map(video => (
						<div
							key={video.id}
							className="bg-white rounded shadow p-4 relative">
							<h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
								{video.title}

								{watched.includes(video.id) && (
									<span className="text-green-700 font-bold">
										Completed - Earned: {video.reward} টাকা
									</span>
								)}
							</h3>

							{!watched.includes(video.id) && (
								<div className="h-[400px]">
									<ReactPlayer
										src={video.url}
										controls
										height="100%"
										width="100%"
										onEnded={() => handleComplete(video.id)}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			)}

			<p className="mt-8 text-center text-lg font-semibold text-indigo-700">
				মোট ইনকাম: {totalIncome} টাকা
			</p>
		</div>
	);
}
