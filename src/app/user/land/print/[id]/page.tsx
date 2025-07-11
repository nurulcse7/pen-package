"use client";

import QRCode from "react-qr-code";
import { useEffect, useRef, useState } from "react";
import { baseApi } from "@/lib/baseApi";
import Spinner from "@/components/Shared/Spinner/Spinner";

interface Owner {
	name: string;
	portion: string;
}

interface LandInfo {
	dag: string;
	type: string;
	quantity: string;
}

interface CollectionData {
	lastLoan: string;
	lastDue: string;
	interest: string;
	totalLoan: string;
	remarks: string;
}
interface LandData {
	serial: string;
	officeName: string;
	mouza: string;
	upazila: string;
	district: string;
	khatianNo: string;
}

interface LandType {
	owners: Owner[];
	lands: LandInfo[];
	collectionData: CollectionData;
	landData: LandData;
	createdAt: string;
}

const Print = ({ params }: any) => {
	const id = params.id;
	const [land, setLand] = useState<LandType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const printRef = useRef<HTMLDivElement>(null);
	const url = `https://yourdomain.com/user/land/print/${id}`;

	const handlePrint = (e: any) => {
		e.preventDefault();
		if (!printRef.current) return;
		const printContents = printRef.current.innerHTML;
		const originalContents = document.body.innerHTML;
		document.body.innerHTML = printContents;
		window.print();
		document.body.innerHTML = originalContents;
		window.location.reload();
	};

	useEffect(() => {
		const fetchLands = async () => {
			try {
				const res = await baseApi(`/land/${id}`, { method: "GET" });
				setLand(res.data);
			} catch (err: any) {
				setError(err.message || "ডেটা লোড করতে সমস্যা হয়েছে");
			} finally {
				setLoading(false);
			}
		};
		if (id) fetchLands();
	}, [id]);

	if (loading) return <Spinner />;
	if (error || !land)
		return (
			<div className="text-red-500 h-screen text-center pt-[100px] text-2xl font-bold">
				{error || "No Data Found!"}
			</div>
		);

	return (
		<div className="bg-[#f5ffe6] min-h-screen px-4 py-6 print:p-0 print:bg-white text-gray-4700">
			<div className="flex justify-center mb-4 w-full print:hidden">
				<button
					onClick={handlePrint}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
					Print রশিদ
				</button>
			</div>

			<div
				ref={printRef}
				className="bg-white mx-auto w-[794px] min-h-screen p-6 shadow-md print:shadow-none print:border print:border-gray-4300">
				<div className="text-center border-b border-dashed border-gray-400 pb-4">
					<h2 className="text-xl font-bold">বাংলাদেশ ফরম নং ১০৭৭</h2>
					<p>(পরিবর্তিত)</p>
					<h3 className="text-lg font-semibold mt-2">
						ভূমি উন্নয়ন কর পরিশোধের রশিদ
					</h3>
					<p>(অনুচ্ছেদ ৫১ এর উপধারা)</p>
				</div>

				<div className="mt-4 text-sm">
					<p>অফিসের নাম: {land?.landData?.officeName}</p>
					<p>মৌজা ও জে. এল. নং: {land?.landData?.mouza}</p>
					<p>
						উপজেলা/থানা: {land?.landData?.upazila}, জেলা:{" "}
						{land?.landData?.district}
					</p>
					<p>খতিয়ান নং: {land?.landData?.khatianNo}</p>
				</div>

				{/* মালিকের বিবরণ */}
				<div className="mt-4 border-t  border-gray-300 pt-4 text-sm">
					<h4 className="font-semibold mb-2 text-center">মালিকের বিবরণ</h4>
					<table className="w-full text-left border border-gray-300 border-collapse">
						<thead>
							<tr className="bg-gray-100 text-center">
								<th className="border border-gray-300 px-2 py-1">ক্রমঃ</th>
								<th className="border border-gray-300 px-2 py-1">
									মালিকের নাম
								</th>
								<th className="border border-gray-300 px-2 py-1">অংশ</th>
							</tr>
						</thead>
						<tbody>
							{land?.owners.map((owner, i) => (
								<tr key={i}>
									<td className="border border-gray-300 px-2 py-1">{i + 1}</td>
									<td className="border border-gray-300 px-2 py-1">
										{owner?.name}
									</td>
									<td className="border border-gray-300 px-2 py-1">
										{owner?.portion}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* জমির বিবরণ */}
				<div className="mt-4">
					<h4 className="font-semibold mb-2 text-center">জমির বিবরণ</h4>
					<table className="w-full text-left border border-gray-300 border-collapse text-sm">
						<thead>
							<tr className="bg-gray-100 text-center">
								<th className="border border-gray-300 px-2 py-1">ক্রমঃ</th>
								<th className="border border-gray-300 px-2 py-1">দাগ নং</th>
								<th className="border border-gray-300 px-2 py-1">
									জমির শ্রেণী
								</th>
								<th className="border border-gray-300 px-2 py-1">পরিমাণ</th>
							</tr>
						</thead>
						<tbody>
							{land?.lands.map((item, i) => (
								<tr key={i}>
									<td className="border border-gray-300 px-2 py-1">
										{i + 1 || "-"}
									</td>
									<td className="border border-gray-300 px-2 py-1">
										{item.dag}
									</td>
									<td className="border border-gray-300 px-2 py-1">
										{item.type}
									</td>
									<td className="border border-gray-300 px-2 py-1">
										{item.quantity}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* আদায়ের বিবরণ */}
				<div className="mt-4">
					<h4 className="font-semibold mb-2 text-center">আদায়ের বিবরণ</h4>
					<table className="w-full text-left border border-collapse text-sm">
						<thead>
							<tr className="bg-gray-100 text-center">
								<th className="border border-gray-300  px-2 py-1">চলতি কর</th>
								<th className="border border-gray-300 px-2 py-1">
									পূর্বের বকেয়া
								</th>
								<th className="border border-gray-300 px-2 py-1">জরিমানা</th>
								<th className="border border-gray-300 px-2 py-1">মোট আদায়</th>
								<th className="border border-gray-300 px-2 py-1">মোট বকেয়া </th>
								<th className="border border-gray-300 px-2 py-1">মন্তব্য</th>
							</tr>
						</thead>
						<tbody>
							{/* collection : dagAddress : "2679" interest : "850" lastDue : "4521"
							lastLoan : "1251" remarks : "N/A" totalDue : "0" totalLoan :
							"1251" totalPaid : "9301" */}

							<tr>
								<td className="border border-gray-300  px-2 py-1">
									{land?.collectionData?.lastLoan}
								</td>
								<td className="border border-gray-300 px-2 py-1">
									{land?.collectionData?.lastDue}
								</td>
								<td className="border border-gray-300 px-2 py-1">
									{land?.collectionData?.interest}
								</td>
								<td className="border border-gray-300 px-2 py-1">
									{land?.collectionData?.totalLoan}
								</td>{" "}
								<td className="border border-gray-300 px-2 py-1">
									{land?.collectionData?.interest}
								</td>
								<td className="border border-gray-300 px-2 py-1">
									{land?.collectionData?.remarks}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="mt-6 flex justify-between items-center text-sm">
					<div>
						<p>
							তারিখ:{" "}
							{new Date(land?.createdAt).toLocaleDateString("bn-BD", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})}
						</p>
						<p>রশিদ নং: {id}</p>
					</div>
					<div className="text-center">
						<QRCode value={url} size={64} />
						<p className="mt-1">স্ক্যান করে যাচাই করুন</p>
					</div>
				</div>

				<div className="mt-4 text-center text-xs border-t border-gray-500 border-dotted pt-2 text-gray-4500">
					<p>
						এই রশিদ ইলেকট্রনিকভাবে তৈরি করা হয়েছে, কোন স্বাক্ষর প্রয়োজন নেই।
					</p>
				</div>
			</div>
		</div>
	);
};

export default Print;
