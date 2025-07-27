"use client";

import { useEffect, useState } from "react";
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
		url: "https://youtu.be/jCVjudmnByk?si=fNoDxIEJx8QyPGJX",
		reward: 3,
	},
];

export default function WatchVideoPage() {
	const [watched, setWatched] = useState<number[]>([]);

	const handleComplete = (id: number) => {
		if (!watched.includes(id)) {
			setWatched(prev => [...prev, id]);
			toast.success("🎉 ভিডিও দেখেছেন! ইনকাম যুক্ত হয়েছে।");
		}
	};

	// মোট ইনকাম হিসাব
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
					{videos.map(video =>
						watched.includes(video.id) ? null : (
							<div key={video.id} className="bg-white rounded shadow p-4">
								<h3 className="text-xl font-semibold mb-2">{video.title}</h3>
								<ReactPlayer
									src={video.url}
									controls
									width="100%"
									onEnded={() => handleComplete(video.id)}
								/>
								<p className="mt-2 text-green-700">
									🎁 এই ভিডিও ইনকাম: {video.reward} টাকা
								</p>
							</div>
						)
					)}
				</div>
			)}

			{/* মোট ইনকাম দেখানো */}
			<p className="mt-8 text-center text-lg font-semibold text-indigo-700">
				মোট ইনকাম: {totalIncome} টাকা
			</p>
		</div>
	);
}
