"use client";

import { FiEdit, FiTrash2, FiPrinter } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { baseApi } from "@/lib/baseApi";
import { GlobalModal } from "../GlobalModal/GlobalModal";
import { toast } from "sonner";

const LandInfo = () => {
	const [landsData, setLandsData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchLands = async () => {
			try {
				const res = await baseApi("/land", {
					method: "GET",
				});
				setLandsData(res.data);
			} catch (err: any) {
				setError(err.message || "ডেটা লোড করতে সমস্যা হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchLands();
	}, [isDeleteConfirmation]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	const handleDelete = async () => {
		try {
			const res = await baseApi(`/land/${isDeleteConfirmation}`, {
				method: "DELETE",
			});
			if (res?.success) {
				setIsDeleteConfirmation(false);
				toast.success(res?.message);
			}
		} catch (err: any) {
			setError(err.message || "Delete করতে সমস্যা হয়েছে");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="md:p-[20px] p-2 border border-gray-300 rounded ">
				{/* Add Button */}
				<div className="flex justify-end  ">
					<Link
						href="/user/land/create"
						className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
						<span className="text-lg mr-1">＋</span> করে দিন
					</Link>
				</div>

				{/* Table */}
				{landsData?.length > 0 ? (
					<div className="lg:block hidden overflow-x-auto">
						<table className="min-w-full  text-sm">
							<thead>
								<tr className="bg-gray-800 text-white text-left">
									<th className="px-4 py-2 border border-gray-300">NO</th>
									<th className="px-4 py-2 border border-gray-300">
										সিটি/পৌর/ইউনিয়ন নাম
									</th>
									<th className="px-4 py-2 border border-gray-300">মালিক</th>
									<th className="px-4 py-2 border border-gray-300">
										ক্রমিক নং
									</th>
									<th className="px-4 py-2 border border-gray-300">তারিখ</th>
									<th className="px-4 py-2 border border-gray-300">অ্যাকশন</th>
								</tr>
							</thead>
							<tbody>
								{landsData.map((item: any, index) => (
									<tr
										key={item._id}
										className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
										<td className="px-4 py-2 border border-gray-300">
											{index + 1}
										</td>
										<td className="px-4 py-2 border border-gray-300">
											{item?.landData?.officeName}
										</td>
										<td className="px-4 py-2 border border-gray-300 whitespace-pre-line">
											{item?.owners
												?.map((owner: any) => owner?.name)
												.join(", ")}
										</td>

										<td className="px-4 py-2 border border-gray-300">
											{item?.serial}
										</td>
										<td className="px-4 py-2 border border-gray-300">
											{new Date(item.createdAt).toLocaleDateString("bn-BD", {
												day: "2-digit",
												month: "long",
												year: "numeric",
											})}
										</td>
										<td className="px-4 py-2 border border-gray-300">
											<div className="flex items-center justify-center space-x-2">
												<Link href={`land/print/${item?._id}`} target="_blank">
													<button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-3 rounded">
														<FiPrinter />
													</button>
												</Link>
												<Link href={`land/edit/${item?._id}`}>
													<button className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white p-3 rounded">
														<FiEdit />
													</button>
												</Link>
												<button
													onClick={() => setIsDeleteConfirmation(item?._id)}
													className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-3 rounded">
													<FiTrash2 />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div>
						<p className="text-center text-red-500 text-lg font-medium mt-10">
							আপনার জমির কোনো রেকর্ড পাওয়া যায়নি।
						</p>
					</div>
				)}
				<div className="lg:hidden space-y-4 mt-1">
					{landsData.map((item: any, index) => (
						<div
							key={item._id}
							className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
							<div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-gray-700 p-3">
								<p className="font-semibold">আইডি</p>
								<p>{index + 1}</p>

								<p className="font-semibold">সিটি/পৌর/ইউনিয়ন নাম</p>
								<p>{item?.landData?.officeName}</p>

								<p className="font-semibold">মালিক</p>
								<p className="whitespace-pre-line">
									{item?.owners?.map((owner: any) => owner?.name).join(", ")}
								</p>

								<p className="font-semibold">ক্রমিক নং</p>
								<p>{item?.serial}</p>

								<p className="font-semibold">তারিখ</p>
								<p>
									{new Date(item.createdAt).toLocaleDateString("bn-BD", {
										day: "2-digit",
										month: "long",
										year: "numeric",
									})}
								</p>

								<p className="font-semibold">অ্যাকশন</p>
								<div className="flex items-center gap-2">
									<Link href={`land/print/${item?._id}`} target="_blank">
										<button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
											<FiPrinter />
										</button>
									</Link>
									<Link href={`land/edit/${item?._id}`}>
										<button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded">
											<FiEdit />
										</button>
									</Link>
									<button
										onClick={() => setIsDeleteConfirmation(item?._id)}
										className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
										<FiTrash2 />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<GlobalModal
				isOpen={isDeleteConfirmation}
				onClose={() => setIsDeleteConfirmation(false)}>
				<div className=" w-full pt-20 text-black p-4 rounded-lg shadow-lg">
					<h2 className="text-xl border-b  border-gray-300 pb-3 font-bold mb-4">
						Are you sure ? you want to delete the land?
					</h2>

					<div className="flex gap-3 pt-5">
						<button
							onClick={() => setIsDeleteConfirmation(false)}
							type="submit"
							className="w-full cursor-pointer bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
							Cancel
						</button>
						<button
							onClick={() => handleDelete()}
							type="submit"
							className="w-full cursor-pointer bg-green-600 text-white p-2 rounded hover:bg-green-700">
							Yes,Sure
						</button>
					</div>
				</div>
			</GlobalModal>
		</div>
	);
};

export default LandInfo;
