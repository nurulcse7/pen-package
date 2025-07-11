"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

// Component to handle search params and router logic
function ErrorContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const message = searchParams.get("message");

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/");
		}, 5000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
			<div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border border-red-200">
				<div className="flex justify-center mb-4 text-red-500">
					<AiOutlineCloseCircle size={64} />
				</div>
				<h1 className="text-3xl font-semibold text-red-600 mb-2">
					Payment Failed
				</h1>
				<p className="text-gray-700 mb-4">
					{message || "Something went wrong. Please try again."}
				</p>
				<p className="text-sm text-gray-400">
					You’ll be redirected to the homepage in a few seconds...
				</p>
			</div>
		</div>
	);
}

export default function ErrorPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ErrorContent />
		</Suspense>
	);
}

export const dynamic = "force-dynamic";
