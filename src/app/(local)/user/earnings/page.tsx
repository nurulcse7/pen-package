"use client";

import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { toast } from "sonner";

export default function MyEarningsPage() {
	const { user } = useUser();
	const [balance, setBalance] = useState(user?.balance as number);  
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [loading, setLoading] = useState(false);

	const MIN_BALANCE = 100;

	const handleWithdraw = async (e: React.FormEvent) => {
		e.preventDefault();
		const amount = parseFloat(withdrawAmount);

		if (isNaN(amount) || amount <= 0) {
			toast.error("সঠিক পরিমাণ লিখুন।");
			return;
		}
		if (amount > balance) {
			toast.error("আপনার ব্যালেন্সের চেয়ে বেশি টাকা তুলে নেওয়া যাবে না।");
			return;
		}

		setLoading(true);

		try {
			// API call here
			// await baseApi.post('/user/withdraw', { amount });

			setBalance(prev => prev - amount);
			setWithdrawAmount("");
			toast.success(`${amount} টাকা উত্তোলনের অনুরোধ সফল হয়েছে।`);
		} catch (error) {
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
					{balance.toLocaleString()} টাকা
				</p>
			</div>

			{balance < MIN_BALANCE && (
				<div className="text-center text-red-500 font-medium mb-4">
					উত্তোলনের জন্য কমপক্ষে {MIN_BALANCE} টাকা থাকা প্রয়োজন।
				</div>
			)}

			<form onSubmit={handleWithdraw} className="space-y-4">
				<label htmlFor="withdraw" className="block text-gray-700 font-medium">
					উত্তোলনের পরিমাণ লিখুন
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
					disabled={loading || balance < MIN_BALANCE}
					required
				/>

				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
					disabled={loading || balance < MIN_BALANCE}>
					{loading ? "অনুরোধ পাঠানো হচ্ছে..." : "উত্তোলনের অনুরোধ পাঠান"}
				</button>
			</form>
		</main>
	);
}
