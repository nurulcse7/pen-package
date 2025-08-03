"use client";

import { useUser } from "@/context/UserContext";
import { baseApi } from "@/lib/baseApi";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";

interface Video {
	_id: string;
	title: string;
	url: string; // ✅ ensure this exists
	reward: number;
	status: "Published" | "Draft";
	createdAt: string;
}

export default function WatchVideoPage() {
	const { user, setUser } = useUser();
	const [watched, setWatched] = useState<string[]>([]);

	const [videos, setVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const res = await baseApi("/watched-videos/unwatched");
				if (res.success) {
					setVideos(res.videos || []);
				} else {
					setError("ভিডিও আনতে সমস্যা হয়েছে");
				}
			} catch (err) {
				console.error(err);
				setError("সার্ভার ত্রুটি হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchVideos();
	}, []);

	const handleComplete = async (id: string) => {
		// ✅ এটা string হওয়া উচিত
		if (!watched.includes(id)) {
			const video = videos.find(v => v._id === id);
			if (!video) return;

			try {
				const res = await baseApi("/watched-videos/video-complete", {
					method: "POST",
					body: {
						videoId: id,
						title: video.title,
						reward: video.reward,
					},
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
		const video = videos.find(v => v._id === id);
		return video ? sum + video.reward : sum;
	}, 0);

	const allWatched = watched.length === videos.length;

	if (loading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;
	if (error) return <p className="text-center text-red-400 mt-10">{ error}</p>;
	return (
		<div className="max-w-4xl mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-6 text-center">
				🎥 ভিডিও দেখে আয় করুন
			</h1>

			{allWatched ? (
				<div className="bg-yellow-100 p-6 rounded-md text-center text-yellow-800 font-semibold">
					এই মুহূর্তে কোনো ভিডিও নেই । নতুন ভিডিও আসলে এখানে পাওয়া যাবে।
				</div>
			) : (
				<div className="space-y-8">
					{videos.map(video => (
						<div
							key={video._id}
							className="bg-white rounded shadow p-4 relative">
							<h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
								{video.title}

								{watched.includes(video._id) && (
									<span className="text-green-700 font-bold">
										Completed - Earned: {video.reward} টাকা
									</span>
								)}

								{!watched.includes(video._id) && (
									<p className="mt-2 text-green-600 font-medium">
										🎁 এই ভিডিও ইনকাম: {video.reward} টাকা
									</p>
								)}
							</h3>

							{!watched.includes(video._id) && (
								<div className="h-[400px]">
									<ReactPlayer
										src={video.url}
										controls
										height="100%"
										width="100%"
										onEnded={() => handleComplete(video._id)}
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
