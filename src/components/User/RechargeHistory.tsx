import { baseApi } from "@/lib/baseApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Spinner from "../Shared/Spinner/Spinner";

const RechargeHistory = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTransaction = async () => {
			try {
				const res = await baseApi("/transaction/transactionByUser");
				setTransactions(res?.transactions);
			} catch (error) {
				console.error("Transaction fetch failed:", error);
				setTransactions([]);
			} finally {
				setLoading(false);
			}
		};

		fetchTransaction();
	}, []);
	if (loading) return <Spinner />;
	return (
		<div className="bg-white border border-gray-300 p-4 rounded shadow pb-7 mb-7">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-xl font-semibold flex items-center gap-2 pb-3">
						<span className="text-2xl">👤</span> Recharge
					</h2>
					<div className="bg-white border border-blue-500 rounded w-[100px] h-[50px]">
						<Link href={`/user/recharge/bkash`}>
							<Image
								className="w-auto mx-auto h-[41px]"
								width={50}
								height={30}
								src={`/images/bkash.png`}
								alt="bkash"
							/>
						</Link>
					</div>
				</div>
				<h3 className="text-xl font-semibold">Recharge History</h3>
			</div>

			<div className="border border-gray-300 rounded">
				{transactions?.length === 0 ? (
					<div>
						<p className="text-center text-red-500 text-lg font-medium  py-10">
							আপনি এখনো কোনো পেমেন্ট করেননি, তাই লেনদেনের তথ্য প্রদর্শন করা
							সম্ভব নয়।
						</p>
					</div>
				) : (
					<table className="min-w-full table-auto text-sm">
						<thead className="bg-black text-white">
							<tr>
								<th className="border border-gray-300 px-4 py-2 text-left">
									No.
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Amount
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Gateway
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Number
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									TXID
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Date
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{transactions?.map((item: any, index: number) => (
								<tr
									key={item._id}
									className={
										index % 2 === 0
											? "bg-gray-100"
											: "bg-white hover:bg-gray-100"
									}>
									<td className="border border-gray-300 px-4 py-2">
										{index + 1}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										৳ {item.amount}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{item?.method === "bKash"
											? "বিকাশ (ম্যানুয়াল পেমেন্ট)"
											: item?.method === "nagad"
											? "নগদ (ম্যানুয়াল পেমেন্ট)"
											: item?.method}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{item?.number}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{item?.trxID}
									</td>
									<td className="border border-gray-300 px-4 py-2 ">
										{new Date(item.createdAt).toLocaleDateString("bn-BD", {
											day: "2-digit",
											month: "long",
											year: "numeric",
										})}
									</td>
									<td className="border border-gray-300 px-4 py-2   font-semibold">
										<span
											className={`px-2 py-1 rounded text-xs font-semibold capitalize
		${item.status === "approved" && "bg-green-100 text-green-700"}
		${item.status === "rejected" && "bg-red-100 text-red-700"}
		${item.status === "pending" && "bg-yellow-100 text-yellow-700"}
	`}>
											{item.status || "pending"}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default RechargeHistory;
