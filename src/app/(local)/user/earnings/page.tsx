"use client";

import { useUser } from "@/context/UserContext";
import { baseApi } from "@/lib/baseApi";
import { useState } from "react";
import { toast } from "sonner";

export default function MyEarningsPage() {
	const { user, setUser } = useUser();
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [method, setMethod] = useState("bkash");
	const [receiverNumber, setReceiverNumber] = useState("");
	const [loading, setLoading] = useState(false);

	const MIN_BALANCE = 100;

	const handleWithdraw = async (e: React.FormEvent) => {
		e.preventDefault();
		const amount = parseFloat(withdrawAmount);

		if (isNaN(amount) || amount <= 0) {
			toast.error("সঠিক পরিমাণ লিখুন।");
			return;
		}
		if (amount >  (user?.balance ?? 0) ) {
			toast.error("আপনার ব্যালেন্সের চেয়ে বেশি টাকা তুলে নেওয়া যাবে না।");
			return;
		}
		if (amount < MIN_BALANCE) {
			toast.error(`উত্তোলনের জন্য ন্যূনতম ${MIN_BALANCE} টাকা থাকতে হবে।`);
			return;
		}

		if (!receiverNumber || receiverNumber.length < 11) {
			toast.error("সঠিক নাম্বার লিখুন।");
			return;
		}

		setLoading(true);

		try {
			const res = await baseApi(`/withdraw/request`, {
				method: "POST",
				body: { amount, method, number: receiverNumber },
			});

			if (res.success) {
				setUser((prev: any) => ({
					...prev,
					balance: res.newBalance,
				}));
				setWithdrawAmount("");
				setReceiverNumber("");
				setMethod("bkash");
				toast.success(`${amount} টাকা উত্তোলনের অনুরোধ সফল হয়েছে।`);
			} else {
				toast.error("উত্তোলনের অনুরোধ ব্যর্থ হয়েছে।");
			}
		} catch (error) {
			console.log("🚀 ~ handleWithdraw ~ error:", error);
			toast.error("উত্তোলনের সময় সমস্যা হয়েছে। পরে চেষ্টা করুন।");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
			<h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
				💵 আমার আয়
			</h1>

			<div className="mb-8 text-center">
				<p className="text-lg text-gray-600 mb-2">আপনার মোট ব্যালেন্স:</p>
				<p className="text-4xl font-extrabold text-green-600">
					{ (user?.balance ?? 0) } টাকা
				</p>
			</div>

			{ (user?.balance ?? 0)  < MIN_BALANCE && (
				<div className="text-center text-red-500 font-medium mb-4">
					উত্তোলনের জন্য কমপক্ষে {MIN_BALANCE} টাকা থাকা প্রয়োজন।
				</div>
			)}

			<form onSubmit={handleWithdraw} className="space-y-4">
				{/* Amount */}
				<div>
					<label htmlFor="withdraw" className="block text-gray-700 font-medium">
						উত্তোলনের পরিমাণ
					</label>
					<input
						type="number"
						id="withdraw"
						className="w-full border border-gray-300 rounded-md px-4 py-2"
						placeholder="টাকার পরিমাণ লিখুন"
						min={1}
						step="any"
						value={withdrawAmount}
						onChange={e => setWithdrawAmount(e.target.value)}
						disabled={loading ||  (user?.balance ?? 0)  < MIN_BALANCE}
						required
					/>
				</div>

				{/* Method */}
				<div>
					<label className="block text-gray-700 font-medium mb-1">
						পেমেন্ট মাধ্যম নির্বাচন করুন
					</label>
					<select
						className="w-full border border-gray-300 rounded-md px-4 py-2"
						value={method}
						onChange={e => setMethod(e.target.value)}
						disabled={loading}
						required>
						<option value="bkash">📱 বিকাশ</option>
						<option value="nagad">💳 নগদ</option>
						<option value="rocket">🚀 রকেট</option>
					</select>
				</div>

				{/* Number */}
				<div>
					<label htmlFor="receiver" className="block text-gray-700 font-medium">
						{method === "bkash"
							? "বিকাশ নাম্বার লিখুন"
							: method === "nagad"
							? "নগদ নাম্বার লিখুন"
							: "রকেট নাম্বার লিখুন"}
					</label>
					<input
						type="tel"
						id="receiver"
						className="w-full border border-gray-300 rounded-md px-4 py-2"
						placeholder="01XXXXXXXXX"
						value={receiverNumber}
						onChange={e => setReceiverNumber(e.target.value)}
						disabled={loading}
						required
					/>
				</div>

				{/* Submit */}
				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
					disabled={loading ||  (user?.balance ?? 0)  < MIN_BALANCE}>
					{loading ? "অনুরোধ পাঠানো হচ্ছে..." : "উত্তোলনের অনুরোধ পাঠান"}
				</button>
			</form>
		</main>
	);
}
