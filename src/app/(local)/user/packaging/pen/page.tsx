"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { baseApi } from "@/lib/baseApi";

type PenPackage = {
	_id: string;
	title: string;
	rewardPerTask: number;
	totalTasks: number;
	createdAt: string;
};

export default function PenPackagesPage() {
	const [packages, setPackages] = useState<PenPackage[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchPenPackage = async (pageNum: number) => {
		setLoading(true);
		try {
			const res = await baseApi(`/pen-packages?page=${pageNum}&limit=6`);
			if (res.success) {
				setPackages(res.packages || []);
				setTotalPages(res.totalPages);
			} else {
				setError("অ্যাড আনতে সমস্যা হয়েছে");
			}
		} catch (err) {
			console.error(err);
			setError("সার্ভার ত্রুটি হয়েছে");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPenPackage(page);
	}, [page]);

	if (loading) return <p className="text-center py-10">লোড হচ্ছে...</p>;

	return (
		<div className="p-6">
			<h1 className="text-3xl font-extrabold text-center mb-6">
				📦 পাবলিশড পেন প্যাকেজসমূহ
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{packages.length === 0 ? (
					<p className="text-center col-span-full">কোনো প্যাকেজ পাওয়া যায়নি।</p>
				) : (
					packages.map(pkg => (
						<div
							key={pkg._id}
							className="group bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl hover:border-blue-500 transition-all duration-300">
							<h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">
								📦 {pkg.title}
							</h2>
							<div className="mt-4 space-y-1 text-sm text-gray-700">
								<p>
									🧮 মোট টাস্ক:{" "}
									<span className="font-medium">{pkg.totalTasks}</span>
								</p>
								<p>
									💸 প্রতি টাস্কে ইনকাম:{" "}
									<span className="font-medium text-green-600">
										{pkg.rewardPerTask}৳
									</span>
								</p>
							</div>

							<div className="mt-4 flex items-center justify-between">
								<span className="text-xs text-gray-500">
									🕓 তৈরি হয়েছে: {new Date(pkg.createdAt).toLocaleDateString()}
								</span>
								<Link href={`/user/packaging/${pkg._id}/submit-work`}>
									<button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700">
										✅ কাজ করুন
									</button>
								</Link>
							</div>
						</div>
					))
				)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-8 flex justify-center gap-2">
					<button
						disabled={page === 1}
						onClick={() => setPage(prev => prev - 1)}
						className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
						← পূর্ববর্তী
					</button>
					{Array.from({ length: totalPages }, (_, i) => (
						<button
							key={i + 1}
							onClick={() => setPage(i + 1)}
							className={`px-3 py-1 rounded ${
								page === i + 1
									? "bg-blue-600 text-white"
									: "bg-gray-100 hover:bg-gray-200"
							}`}>
							{i + 1}
						</button>
					))}
					<button
						disabled={page === totalPages}
						onClick={() => setPage(prev => prev + 1)}
						className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
						পরবর্তী →
					</button>
				</div>
			)}
		</div>
	);
}
