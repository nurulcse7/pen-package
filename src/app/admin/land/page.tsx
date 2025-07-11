"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Land = {
	id: string;
	ownerName: string;
	mouza: string;
	dagNumber: string;
	khotianNumber: string;
	area: string;
};

export default function AllLandRecordsPage() {
	const [lands, setLands] = useState<Land[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchLands = async () => {
			try {
				const res = await fetch("/api/admin/lands"); // <-- তোমার API রুট
				if (!res.ok) throw new Error("Failed to fetch land records");
				const data = await res.json();
				setLands(data.lands || []);
			} catch (err: any) {
				setError(err.message || "Error fetching lands");
				toast.error("ল্যান্ড ডেটা লোড করতে সমস্যা হয়েছে");
			} finally {
				setLoading(false);
			}
		};

		fetchLands();
	}, []);

	if (loading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;
	if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-4">সকল জমির রেকর্ড</h2>
			<div className="overflow-x-auto bg-white rounded shadow">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								মালিক
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								মৌজা
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								দাগ নং
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								খতিয়ান
							</th>
							<th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
								এরিয়া
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{lands.map(land => (
							<tr key={land.id}>
								<td className="px-4 py-2">{land.ownerName}</td>
								<td className="px-4 py-2">{land.mouza}</td>
								<td className="px-4 py-2">{land.dagNumber}</td>
								<td className="px-4 py-2">{land.khotianNumber}</td>
								<td className="px-4 py-2">{land.area} শতক</td>
							</tr>
						))}
						{lands.length === 0 && (
							<tr>
								<td colSpan={5} className="px-4 py-6 text-center text-gray-500">
									কোনো জমির রেকর্ড পাওয়া যায়নি
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
