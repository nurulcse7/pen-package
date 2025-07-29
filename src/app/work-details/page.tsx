"use client";
import FAQ from "@/components/work-details/FAQ";
import JobTypeCard from "@/components/work-details/JobTypeCard";
import WorkSteps from "@/components/work-details/WorkSteps";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const jobTypes = [
	{
		title: "ভিডিও দেখে আয়",
		description: "প্রতিদিন নির্দিষ্ট সময় ভিডিও দেখে আয় করুন সহজে।",
		icon: "🎥",
	},
	{
		title: "অ্যাড দেখে আয়",
		description: "প্রতিদিন বিভিন্ন অ্যাড দেখে ইনকাম বাড়ান।",
		icon: "📲",
	},
	{
		title: "প্যাকেজিং কাজ",
		description: "বাড়িতে বসে প্যাকেজিং করে ইনকাম করুন নির্ভরযোগ্য ভাবে।",
		icon: "📦",
	},
];

export default function WorkDetails() {
	const { user } = useUser();
	return (
		<main className="container mx-auto px-4 pb-16 pt-20">
			<title>Work Details</title>
			<h1 className="text-4xl font-bold mb-4 text-center">কাজের বিস্তারিত</h1>
			<p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
				এখানে আপনি জানতে পারবেন আমাদের প্ল্যাটফর্মে কোন ধরনের কাজ আছে, কিভাবে
				কাজ শুরু করবেন, এবং কীভাবে ইনকাম করতে পারবেন।
			</p>

			{/* কাজের ধরন */}
			<section className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
				{jobTypes.map((job, idx) => (
					<JobTypeCard
						key={idx}
						title={job.title}
						description={job.description}
						icon={job.icon}
					/>
				))}
			</section>

			{/* কাজ করার ধাপ */}
			<WorkSteps />

			{/* FAQ */}
			<FAQ />

			{/* CTA */}
			<div className="text-center mt-12">
				{user?.role && user?.email ? (
					<>
						<Link
							href={`/${user?.role}/dashboard`}
							className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
							কাজ শুরু করুন
						</Link>
					</>
				) : (
					<Link
						href="/register"
						className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
						আজই রেজিস্টার করুন
					</Link>
				)}
			</div>
		</main>
	);
}
