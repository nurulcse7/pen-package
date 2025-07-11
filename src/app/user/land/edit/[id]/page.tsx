"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { toast } from "sonner";
import { useSetting } from "@/context/SettingContext";
import { useUser } from "@/context/UserContext";

const LandEditForm = () => {
	const { id } = useParams();
	const { setting } = useSetting();
	const { user } = useUser();
	const [loading, setLoading] = useState(true);
	const [landData, setLandData] = useState<any>({});
	const [owners, setOwners] = useState([{ name: "", portion: "" }]);
	const [lands, setLands] = useState([{ dag: "", type: "", quantity: "" }]);
	const [collectionData, setCollectionData] = useState<any>({});
	const router = useRouter();
	useEffect(() => {
		const fetchLand = async () => {
			try {
				const res = await baseApi(`/land/${id}`, { method: "GET" });
				const data = res.data;
				setLandData(data?.landData || {});
				setOwners(data.owners || []);
				setLands(data.lands || []);
				setCollectionData(data.collectionData || {});
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		if (id) fetchLand();
	}, [id]);

	const handleFormChange = (e: any) => {
		const { name, value } = e.target;
		setLandData((prev: any) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (
			typeof user?.amount === "number" &&
			typeof setting?.serviceCharge === "number" &&
			user.amount < setting.serviceCharge
		) {
			toast.error(
				"You don't have sufficient balance for update land! Please recharge your account."
			);
			return;
		}
		try {
			const response = await baseApi(`/land/update/${id}`, {
				method: "PUT",
				body: { landData, owners, lands, collectionData },
			});
			if (response.success) {
				router.push(`/user/land/print/${id}`);
				toast.success(response?.message || "সফলভাবে আপডেট হয়েছে");
			} else toast.error("আপডেট ব্যর্থ হয়েছে");
		} catch (err: any) {
			toast.error(err.message || "Error while updating");
		}
	};

	if (loading) return <Spinner />;

	return (
		<div className="p-6  h-full overflow-y-auto bg-white">
			<h2 className="text-center text-xl text-blue-500 font-semibold mb-2">
				Charge : {setting?.serviceCharge}
			</h2>
			<h3 className="text-center text-lg font-semibold mb-6">ভূমি তথ্য</h3>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Row 1 */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label>ক্রমিক নং:</label>
						<input
							name="serial"
							value={landData.serial}
							onChange={handleFormChange}
							type="text"
							className="w-full border border-gray-300 rounded-md px-3 py-2"
							defaultValue="494437282472"
						/>
					</div>
					<div>
						<label>চালান নং:</label>
						<input
							required
							name="challan"
							value={landData.challan}
							onChange={handleFormChange}
							type="text"
							placeholder="চালান নং (ঐচ্ছিক)"
							className="w-full border border-gray-300 rounded-md px-3 py-2"
						/>
					</div>
				</div>

				{/* Row 2 */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{[
						{ label: "সিটি/পৌর/ইউনিয়ন ভূমি অফিসের নাম:", name: "officeName" },
						{ label: "মৌজার ও জে. এল. নং:", name: "mouza" },
						{ label: "উপজেলা / থানা:", name: "upazila" },
						{ label: "জেলা:", name: "district" },
						{
							label: "২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:",
							name: "holdingNo",
						},
						{ label: "খতিয়ান নং:", name: "khatianNo" },
					].map((item, i) => (
						<div key={i}>
							<label>{item?.label}</label>
							<input
								type="text"
								name={item.name}
								value={landData[item.name]}
								onChange={handleFormChange}
								required
								className="w-full border border-gray-300 rounded-md px-3 py-2"
							/>
						</div>
					))}
				</div>

				<div className="flex flex-wrap md:gap-4 gap-3">
					{/* পরিশোধের সাল (BN) */}
					<div className="flex-1 max-w-[400px]">
						<label className="block mb-1">পরিশোধের সাল (BN):</label>
						<input
							name="paymentYear"
							value={landData.paymentYear}
							onChange={handleFormChange}
							type="text"
							placeholder="2024-2025 (অর্থবছর)"
							required
							className="w-full border border-gray-300 rounded-md px-3 py-2"
						/>
					</div>

					{/* তারিখ (EN) */}
					<div className="md:flex-1 w-full max-w-[400px]">
						<label className="block mb-1">তারিখ (EN):</label>
						<input
							name="paymentDate"
							value={landData.paymentDate}
							onChange={handleFormChange}
							type="text"
							placeholder="dd-mm-yyyy"
							required
							className="w-full border border-gray-300 rounded-md px-3 py-2"
						/>
					</div>

					{/* দিন */}
					<div className="md:w-[146px] w-full">
						<label className="block mb-1">দিন:</label>
						<select
							name="day"
							value={landData.day}
							onChange={handleFormChange}
							required
							className="w-full border border-gray-300 rounded-md px-3 py-2">
							<option>--নির্বাচন--</option>
							<option value="০১">০১</option>
							<option value="০২">০২</option>
							<option value="০৩">০৩</option>
							<option value="০৪">০৪</option>
							<option value="০৫">০৫</option>
							<option value="০৬">০৬</option>
							<option value="০৭">০৭</option>
							<option value="০৮">০৮</option>
							<option value="০৯">০৯</option>
							<option value="১০">১০</option>
							<option value="১১">১১</option>
							<option value="১২">১২</option>
							<option value="১৩">১৩</option>
							<option value="১৪">১৪</option>
							<option value="১৫">১৫</option>
							<option value="১৬">১৬</option>
							<option value="১৭">১৭</option>
							<option value="১৮">১৮</option>
							<option value="১৯">১৯</option>
							<option value="২০">২০</option>
							<option value="২১">২১</option>
							<option value="২২">২২</option>
							<option value="২৩">২৩</option>
							<option value="২৪">২৪</option>
							<option value="২৫">২৫</option>
							<option value="২৬">২৬</option>
							<option value="২৭">২৭</option>
							<option value="২৮">২৮</option>
							<option value="২৯">২৯</option>
							<option value="৩০">৩০</option>
							<option value="৩১">৩১</option>{" "}
						</select>
					</div>

					{/* মাস */}
					<div className="md:w-[146px] w-full">
						<label className="block mb-1">মাস:</label>
						<select
							name="month"
							value={landData.month}
							onChange={handleFormChange}
							required
							className="w-full border border-gray-300 rounded-md px-3 py-2">
							<option>--নির্বাচন--</option>
							<option value="বৈশাখ">বৈশাখ</option>
							<option value="জ্যৈষ্ঠ">জ্যৈষ্ঠ</option>
							<option value="আষাঢ়">আষাঢ়</option>
							<option value="শ্রাবণ">শ্রাবণ</option>
							<option value="ভাদ্র">ভাদ্র</option>
							<option value="আশ্বিন">আশ্বিন</option>
							<option value="কার্তিক">কার্তিক</option>
							<option value="অগ্রহায়ণ">অগ্রহায়ণ</option>
							<option value="পৌষ">পৌষ</option>
							<option value="মাঘ">মাঘ</option>
							<option value="ফাল্গুন">ফাল্গুন</option>
							<option value="চৈত্র">চৈত্র</option>{" "}
						</select>
					</div>

					{/* বছর */}
					<div className="md:w-[146px] w-full">
						<label className="block mb-1">বছর:</label>
						<select
							name="year"
							value={landData.year}
							onChange={handleFormChange}
							required
							className="w-full border border-gray-300 rounded-md px-3 py-2">
							<option>--নির্বাচন--</option>
							<option value="১৪০০">১৪০০</option>
							<option value="১৪০১">১৪০১</option>
							<option value="১৪০২">১৪০২</option>
							<option value="১৪০৩">১৪০৩</option>
							<option value="১৪০৪">১৪০৪</option>
							<option value="১৪০৫">১৪০৫</option>
							<option value="১৪০৬">১৪০৬</option>
							<option value="১৪০৭">১৪০৭</option>
							<option value="১৪০৮">১৪০৮</option>
							<option value="১৪০৯">১৪০৯</option>
							<option value="১৪১০">১৪১০</option>
							<option value="১৪১১">১৪১১</option>
							<option value="১৪১২">১৪১২</option>
							<option value="১৪১৩">১৪১৩</option>
							<option value="১৪১৪">১৪১৪</option>
							<option value="১৪১৫">১৪১৫</option>
							<option value="১৪১৬">১৪১৬</option>
							<option value="১৪১৭">১৪১৭</option>
							<option value="১৪১৮">১৪১৮</option>
							<option value="১৪১৯">১৪১৯</option>
							<option value="১৪২০">১৪২০</option>
							<option value="১৪২১">১৪২১</option>
							<option value="১৪২২">১৪২২</option>
							<option value="১৪২৩">১৪২৩</option>
							<option value="১৪২৪">১৪২৪</option>
							<option value="১৪২৫">১৪২৫</option>
							<option value="১৪২৬">১৪২৬</option>
							<option value="১৪২৭">১৪২৭</option>
							<option value="১৪২৮">১৪২৮</option>
							<option value="১৪২৯">১৪২৯</option>
							<option value="১৪৩০">১৪৩০</option>
							<option value="১৪৩১">১৪৩১</option>
							<option value="১৪৩২">১৪৩২</option>
							<option value="১৪৩৩">১৪৩৩</option>
							<option value="১৪৩৪">১৪৩৪</option>
							<option value="১৪৩৫">১৪৩৫</option>
							<option value="১৪৩৬">১৪৩৬</option>
							<option value="১৪৩৭">১৪৩৭</option>
							<option value="১৪৩৮">১৪৩৮</option>
							<option value="১৪৩৯">১৪৩৯</option>
							<option value="১৪৪০">১৪৪০</option>
							<option value="১৪৪১">১৪৪১</option>
							<option value="১৪৪২">১৪৪২</option>
							<option value="১৪৪৩">১৪৪৩</option>
							<option value="১৪৪৪">১৪৪৪</option>
							<option value="১৪৪৫">১৪৪৫</option>
							<option value="১৪৪৬">১৪৪৬</option>
							<option value="১৪৪৭">১৪৪৭</option>
							<option value="১৪৪৮">১৪৪৮</option>
							<option value="১৪৪৯">১৪৪৯</option>
							<option value="১৪৫০">১৪৫০</option>
							<option value="১৪৫১">১৪৫১</option>
							<option value="১৪৫২">১৪৫২</option>
							<option value="১৪৫৩">১৪৫৩</option>
							<option value="১৪৫৪">১৪৫৪</option>
							<option value="১৪৫৫">১৪৫৫</option>
							<option value="১৪৫৬">১৪৫৬</option>
							<option value="১৪৫৭">১৪৫৭</option>
							<option value="১৪৫৮">১৪৫৮</option>
							<option value="১৪৫৯">১৪৫৯</option>
							<option value="১৪৬০">১৪৬০</option>
							<option value="১৪৬১">১৪৬১</option>
							<option value="১৪৬২">১৪৬২</option>
							<option value="১৪৬৩">১৪৬৩</option>
							<option value="১৪৬৪">১৪৬৪</option>
							<option value="১৪৬৫">১৪৬৫</option>
							<option value="১৪৬৬">১৪৬৬</option>
							<option value="১৪৬৭">১৪৬৭</option>
							<option value="১৪৬৮">১৪৬৮</option>
							<option value="১৪৬৯">১৪৬৯</option>
							<option value="১৪৭০">১৪৭০</option>
							<option value="১৪৭১">১৪৭১</option>
							<option value="১৪৭২">১৪৭২</option>
							<option value="১৪৭৩">১৪৭৩</option>
							<option value="১৪৭৪">১৪৭৪</option>
							<option value="১৪৭৫">১৪৭৫</option>
							<option value="১৪৭৬">১৪৭৬</option>
							<option value="১৪৭৭">১৪৭৭</option>
							<option value="১৪৭৮">১৪৭৮</option>
							<option value="১৪৭৯">১৪৭৯</option>
							<option value="১৪৮০">১৪৮০</option>
							<option value="১৪৮১">১৪৮১</option>
							<option value="১৪৮২">১৪৮২</option>
							<option value="১৪৮৩">১৪৮৩</option>
							<option value="১৪৮৪">১৪৮৪</option>
							<option value="১৪৮৫">১৪৮৫</option>
							<option value="১৪৮৬">১৪৮৬</option>
							<option value="১৪৮৭">১৪৮৭</option>
							<option value="১৪৮৮">১৪৮৮</option>
							<option value="১৪৮৯">১৪৮৯</option>
							<option value="১৪৯০">১৪৯০</option>{" "}
						</select>
					</div>
				</div>

				{/* মালিক Section */}
				<div>
					<h4 className="bg-gray-700 text-white px-4 py-3 rounded-t">
						মালিকের নাম
					</h4>
					<table className="w-full   border border-gray-300    border-collapse mt-2">
						<tbody>
							{owners.map((owner, i) => (
								<tr key={i}>
									<td className="px-4 w-[30px] py-2 text-center">{i + 1}</td>

									<td className="md:px-4 px-1 py-3">
										<input
											required
											placeholder="মালিকের নাম"
											value={owner.name}
											onChange={e => {
												const updated = [...owners];
												updated[i].name = e.target.value;
												setOwners(updated);
											}}
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>

									<td className="md:px-4 py-3">
										<input
											required
											placeholder="মালিকের অংশ%"
											value={owner.portion}
											onChange={e => {
												const updated = [...owners];
												updated[i].portion = e.target.value;
												setOwners(updated);
											}}
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>

									<td className="px-4 w-[40px] py-2">
										{i === 0 ? (
											<button
												type="button"
												onClick={() =>
													setOwners([...owners, { name: "", portion: "" }])
												}
												className="bg-blue-600 text-white text-4xl font-bold px-2 rounded">
												+
											</button>
										) : (
											<button
												type="button"
												onClick={() =>
													setOwners(owners.filter((_, index) => index !== i))
												}
												className="bg-red-600 text-white text-4xl font-bold px-3 rounded">
												-
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* জমি Section */}
				<div>
					<h4 className="bg-gray-700 text-white px-4 py-3 rounded-t">
						জমি তথ্য
					</h4>
					<table className="w-full border border-gray-300 border-collapse mt-2">
						<tbody>
							{lands.map((land, i) => (
								<tr key={i}>
									<td className="px-4 w-[30px] py-2 text-center">{i + 1}</td>

									{/* দাগ নং */}
									<td className="px-4 py-3">
										<input
											required
											placeholder="দাগ নং"
											value={land.dag}
											onChange={e => {
												const updated = [...lands];
												updated[i].dag = e.target.value;
												setLands(updated);
											}}
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>

									{/* জমির শ্রেণী */}
									<td className="px-4 py-3">
										<input
											required
											placeholder="জমির শ্রেণী"
											value={land.type}
											onChange={e => {
												const updated = [...lands];
												updated[i].type = e.target.value;
												setLands(updated);
											}}
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>

									{/* জমির পরিমাণ */}
									<td className="px-4 py-3">
										<input
											required
											placeholder="জমির পরিমাণ (EN)"
											value={land.quantity}
											onChange={e => {
												const updated = [...lands];
												updated[i].quantity = e.target.value;
												setLands(updated);
											}}
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>

									<td className="px-4 w-[40px] py-2">
										{i === 0 ? (
											<button
												type="button"
												onClick={() =>
													setLands([
														...lands,
														{ dag: "", type: "", quantity: "" },
													])
												}
												className="bg-blue-600 text-white text-4xl font-bold px-2 rounded">
												+
											</button>
										) : (
											<button
												type="button"
												onClick={() =>
													setLands(lands.filter((_, index) => index !== i))
												}
												className="bg-orange-400 text-white text-4xl font-bold px-3 rounded">
												-
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div>
					<h4 className="text-center font-bold mt-6 mb-2">আদায়ের বিবরণ</h4>
					<div className="w-full overflow-x-auto">
						<table className="min-w-[900px] w-full  border border-gray-300 border-collapse">
							<thead>
								<tr className="bg-gray-700 text-white text-[13px]">
									<th className="px-4 py-2 text-center">
										তিন বৎসরের ঊর্ধ্বের বকেয়া (EN)
									</th>
									<th className="px-4 py-2 text-center">
										গত তিন বছরের বকেয়া (EN)
									</th>
									<th className="px-4 py-2 text-center">
										বকেয়া সুদ ও কার্যকরী (EN)
									</th>
									<th className="px-4 py-2 text-center">মোট ঋণ (EN)</th>
									<th className="px-4 py-2 text-center">গত ঋণ (EN)</th>
									<th className="px-4 py-2 text-center">মোট আদায় (EN)</th>
									<th className="px-4 py-2 text-center">মোট বকেয়া (EN)</th>
									<th className="px-4 py-2 text-center">মন্তব্য</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="px-4 py-2">
										<input
											required
											name="dagAddress"
											value={collectionData.dagAddress}
											onChange={e =>
												setCollectionData({
													...collectionData,
													[e.target.name]: e.target.value,
												})
											}
											placeholder="০"
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											required
											name="lastDue"
											value={collectionData.lastDue}
											onChange={e =>
												setCollectionData({
													...collectionData,
													[e.target.name]: e.target.value,
												})
											}
											placeholder="০"
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											required
											name="interest"
											value={collectionData.interest}
											onChange={e =>
												setCollectionData({
													...collectionData,
													[e.target.name]: e.target.value,
												})
											}
											placeholder="০"
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											required
											name="totalLoan"
											value={collectionData.totalLoan}
											onChange={e =>
												setCollectionData({
													...collectionData,
													[e.target.name]: e.target.value,
												})
											}
											placeholder="০"
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											required
											name="lastLoan"
											value={collectionData.lastLoan}
											onChange={e =>
												setCollectionData({
													...collectionData,
													[e.target.name]: e.target.value,
												})
											}
											placeholder="০"
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											required
											name="totalPaid"
											value={collectionData.totalPaid}
											onChange={e =>
												setCollectionData({
													...collectionData,
													[e.target.name]: e.target.value,
												})
											}
											placeholder="০"
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											required
											name="totalDue"
											value={collectionData.totalDue}
											onChange={e =>
												setCollectionData({
													...collectionData,
													[e.target.name]: e.target.value,
												})
											}
											placeholder="০"
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											required
											name="remarks"
											value={collectionData.remarks}
											onChange={e =>
												setCollectionData({
													...collectionData,
													[e.target.name]: e.target.value,
												})
											}
											placeholder="মন্তব্য"
											className="border border-gray-300 rounded-md px-3 py-2 w-full"
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Submit */}
				<div className="text-center pt-6">
					<button
						type="submit"
						className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-md">
						সাবমিট
					</button>
				</div>
			</form>
		</div>
	);
};

export default LandEditForm;
