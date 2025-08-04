"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";

interface PenPackage {
	_id: string;
	title: string;
	totalTasks: number;
	rewardPerTask: number;
	status: "Published" | "Draft";
	createdAt: string;
}

export default function AdminPenPackagePage() {
	const [packages, setPackages] = useState<PenPackage[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const router = useRouter();
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

	const handleDelete = async (id: string) => {
		const confirmDelete = confirm("আপনি কি প্যাকেজটি মুছে ফেলতে চান?");
		if (!confirmDelete) return;

		try {
			const res = await baseApi(`/pen-packages/${id}`, {
				method: "DELETE",
			});

			if (res.success) {
				setPackages(packages.filter(p => p._id !== id));
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	const handleEdit = (id: string) => {
		router.push(`/admin/manage/pen-packages/edit/${id}`);
	};

	if (loading) return <p>⏳ লোড হচ্ছে...</p>;
	if (error) return <p className="text-red-500">{error}</p>;
	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between flex-wrap gap-2">
				<h1 className="text-2xl font-bold">✒️ পেন প্যাকেজ ম্যানেজমেন্ট</h1>
				<Link href="/admin/manage/pen-packages/create">
					<button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded shadow hover:opacity-90 text-sm">
						➕ নতুন প্যাকেজ যুক্ত করুন
					</button>
				</Link>
			</div>

			<div className="overflow-x-auto rounded-xl border border-gray-300 p-4 shadow-sm bg-white">
				{packages.length === 0 ? (
					<p className="text-gray-500">কোনো প্যাকেজ পাওয়া যায়নি।</p>
				) : (
					<table className="min-w-full text-sm text-left border-collapse">
						<thead>
							<tr className="bg-gray-100 text-gray-700">
								<th className="px-4 py-2 border border-gray-400">নাম</th>
								<th className="px-4 py-2 border border-gray-400">
									টাস্ক সংখ্যা
								</th>
								<th className="px-4 py-2 border border-gray-400">
									রিওয়ার্ড/টাস্ক
								</th>
								<th className="px-4 py-2 border border-gray-400">স্ট্যাটাস</th>
								<th className="px-4 py-2 border border-gray-400">তারিখ</th>
								<th className="px-4 py-2 border border-gray-400">অ্যাকশন</th>
							</tr>
						</thead>
						<tbody>
							{packages.map(pkg => (
								<tr key={pkg._id} className="hover:bg-gray-50">
									<td className="px-4 py-2 border border-gray-400">
										{pkg.title}
									</td>
									<td className="px-4 py-2 border border-gray-400">
										{pkg.totalTasks}
									</td>
									<td className="px-4 py-2 border border-gray-400">
										{pkg.rewardPerTask}৳
									</td>
									<td className="px-4 py-2 border border-gray-400">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${
												pkg.status === "Published"
													? "bg-green-100 text-green-700"
													: "bg-yellow-100 text-yellow-700"
											}`}>
											{pkg.status}
										</span>
									</td>
									<td className="px-4 py-2 border border-gray-400">
										{" "}
										{new Date(pkg?.createdAt).toLocaleDateString("bn-BD", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</td>
									<td className="px-4 py-2 border border-gray-400">
										<div className="flex gap-3">
											<button
												onClick={() => handleEdit(pkg._id)}
												className="text-indigo-600 hover:underline text-xs font-semibold">
												✏️ Edit
											</button>
											<button
												onClick={() => handleDelete(pkg._id)}
												className="text-red-600 hover:underline text-xs font-semibold">
												🗑️ Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
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
