"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PenPackage {
	id: string;
	title: string;
	taskCount: number;
	rewardPerTask: number;
	status: "Published" | "Draft";
	createdAt: string;
}

const initialPackages: PenPackage[] = [
	{
		id: "pkg001",
		title: "বেসিক প্যাকেজ",
		taskCount: 10,
		rewardPerTask: 1,
		status: "Published",
		createdAt: "2025-07-20",
	},
	{
		id: "pkg002",
		title: "প্রিমিয়াম প্যাকেজ",
		taskCount: 25,
		rewardPerTask: 1.5,
		status: "Draft",
		createdAt: "2025-07-28",
	},
	{
		id: "pkg003",
		title: "ডেইলি প্যাকেজ",
		taskCount: 5,
		rewardPerTask: 0.5,
		status: "Published",
		createdAt: "2025-07-30",
	},
];

export default function AdminPenPackagePage() {
	const [packages, setPackages] = useState<PenPackage[]>(initialPackages);
	const router = useRouter();

	const handleDelete = (id: string) => {
		if (confirm("আপনি কি প্যাকেজটি মুছে ফেলতে চান?")) {
			setPackages(packages.filter(p => p.id !== id));
		}
	};

	const handleEdit = (id: string) => {
		router.push(`/admin/manage/pen-packages/edit/${id}`);
	};

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
								<th className="px-4 py-2 border border-gray-400">টাস্ক সংখ্যা</th>
								<th className="px-4 py-2 border border-gray-400">রিওয়ার্ড/টাস্ক</th>
								<th className="px-4 py-2 border border-gray-400">স্ট্যাটাস</th>
								<th className="px-4 py-2 border border-gray-400">তারিখ</th>
								<th className="px-4 py-2 border border-gray-400">অ্যাকশন</th>
							</tr>
						</thead>
						<tbody>
							{packages.map(pkg => (
								<tr key={pkg.id} className="hover:bg-gray-50">
									<td className="px-4 py-2 border border-gray-400">{pkg.title}</td>
									<td className="px-4 py-2 border border-gray-400">{pkg.taskCount}</td>
									<td className="px-4 py-2 border border-gray-400">{pkg.rewardPerTask}৳</td>
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
									<td className="px-4 py-2 border border-gray-400">{pkg.createdAt}</td>
									<td className="px-4 py-2 border border-gray-400">
										<div className="flex gap-3">
											<button
												onClick={() => handleEdit(pkg.id)}
												className="text-indigo-600 hover:underline text-xs font-semibold">
												✏️ Edit
											</button>
											<button
												onClick={() => handleDelete(pkg.id)}
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
		</div>
	);
}
