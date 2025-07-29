"use client"
import { FaUsers, FaShareAlt, FaGift } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const ReferralSection = () => {
	const { user } = useUser();
	return (
		<section className="py-12 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
					রেফার করুন, ইনকাম বাড়ান
				</h2>
				<p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
					আপনার বন্ধুদের রেফার করে প্রতি রেজিস্ট্রেশনে আয় করুন নির্দিষ্ট পরিমাণ
					কমিশন। বন্ধুরা যত কাজ করবে, আপনার ইনকাম তত বাড়বে!
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
					<div className="bg-blue-50 p-6 rounded-lg text-center shadow">
						<FaUsers size={30} className="mx-auto text-blue-600 mb-3" />
						<h3 className="text-xl font-semibold text-gray-800 mb-1">
							বন্ধু ইনভাইট করুন
						</h3>
						<p className="text-sm text-gray-600">
							আপনার রেফারেল লিংক শেয়ার করুন Facebook, WhatsApp বা মেসেজে।
						</p>
					</div>

					<div className="bg-green-50 p-6 rounded-lg text-center shadow">
						<FaShareAlt size={30} className="mx-auto text-green-600 mb-3" />
						<h3 className="text-xl font-semibold text-gray-800 mb-1">
							তারা কাজ শুরু করবে
						</h3>
						<p className="text-sm text-gray-600">
							বন্ধুরা কাজ শুরু করলে আপনি পাবেন ইনকাম কমিশন।
						</p>
					</div>

					<div className="bg-purple-50 p-6 rounded-lg text-center shadow">
						<FaGift size={30} className="mx-auto text-purple-600 mb-3" />
						<h3 className="text-xl font-semibold text-gray-800 mb-1">
							রেফার বোনাস নিন
						</h3>
						<p className="text-sm text-gray-600">
							প্রতি রেজিস্ট্রেশনে ৳২০ থেকে শুরু করে আরও বেশি বোনাস!
						</p>
					</div>
				</div>

				<div className="text-center">
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
							এখনই রেজিস্টার করে রেফার করুন
						</Link>
					)}
				</div>
			</div>
		</section>
	);
};

export default ReferralSection;
