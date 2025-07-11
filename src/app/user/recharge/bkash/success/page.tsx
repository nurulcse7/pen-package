"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

function SuccessContent() {
	const { user } = useUser();
	const router = useRouter();
	const [seconds, setSeconds] = useState(20);

	useEffect(() => {
		if (seconds <= 0) {
			router.push(`/${user?.role}/dashboard`);
		}

		const timer = setInterval(() => {
			setSeconds(prev => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [seconds, router]);

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
			<div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border border-green-200">
				<div className="flex justify-center mb-4 text-green-500">
					<AiOutlineCheckCircle size={64} />
				</div>
				<h1 className="text-3xl font-semibold text-green-600 mb-2">
					পেমেন্ট সফল হয়েছে!
				</h1>
				<p className="text-gray-700 mb-4">
					আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। আপনাকে হোমপেজে নিয়ে যাওয়া হবে{" "}
					{seconds} সেকেন্ডের মধ্যে।
				</p>
				<p className="text-sm text-gray-500 mb-2">
					কোনো সমস্যায় আমাদের সাপোর্ট নম্বরে যোগাযোগ করুনঃ <br />
					<span className="font-semibold text-pink-600 text-lg">
						01910-924868
					</span>
				</p>
				<p className="text-xs text-gray-400">
					ধন্যবাদ আমাদের সার্ভিস ব্যবহারের জন্য।
				</p>
			</div>
		</div>
	);
}

export default function SuccessPage() {
	return (
		<Suspense fallback={<div>লোড হচ্ছে...</div>}>
			<SuccessContent />
		</Suspense>
	);
}

export const dynamic = "force-dynamic";
