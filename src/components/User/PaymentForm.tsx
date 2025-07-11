"use client";

import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { FiCopy } from "react-icons/fi";
import Link from "next/link";
import { baseApi } from "@/lib/baseApi";
import { useRouter } from "next/navigation";
import { useSetting } from "@/context/SettingContext";

const PaymentForm = () => {
		const { setting } = useSetting();
	
	const [amount, setAmount] = useState("");
	const [number, setNumber] = useState("");
	const [trxID, setTrxID] = useState("");
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!amount || parseFloat(amount) <= 0) {
			alert("Please enter a valid amount");
			return;
		}

		try {
			const res = await baseApi("/transaction/create", {
				method: "POST",
				body: { amount, number, trxID },
			});

			if (!res.success) throw new Error(res.message || "Something went wrong");
			toast.success("পেমেন্ট সাবমিট হয়েছে!");
			router.push("/user/recharge/bkash/success");
		} catch (err: any) {
			alert(err.message || "Failed to submit");
		}
	};
	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success("নম্বর কপি হয়েছে!");
	};

	return (
		<div className="max-w-md mx-auto md:mt-10 mt-4 pb-6 p-2 bg-white rounded-lg shadow-lg">
			<h3 className="text-lg font-semibold text-center pb-2.5">
				ম্যানুয়াল পেমেন্ট সিস্টেম
			</h3>

			<div className="flex justify-between items-center mb-4">
				<div className="rounded w-[100px] h-[50px]">
					<Image
						className="w-auto mx-auto h-[41px]"
						width={50}
						height={30}
						src={`/images/bkash.png`}
						alt="bkash"
					/>
				</div>
				<span className="text-lg font-bold">টাকা {amount || "0"}</span>
			</div>

			<hr className="border-pink-500 mb-4" />

			<form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
				<div className="md:p-6 p-3 bg-pink-500 rounded-xl shadow-lg">
					<div className="space-y-4">
						<input
							type="text"
							required
							placeholder="টাকার পরিমাণ লিখুন"
							value={amount}
							onChange={e => setAmount(e.target.value)}
							className="w-full bg-white p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
						/>

						<input
							type="text"
							required
							placeholder="যে নম্বর থেকে পাঠিয়েছেন"
							value={number}
							onChange={e => setNumber(e.target.value)}
							className="w-full bg-white p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
						/>

						<input
							type="text"
							required
							placeholder="ট্রান্সজাকশন আইডি লিখুন"
							value={trxID}
							onChange={e => setTrxID(e.target.value)}
							className="w-full bg-white p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
						/>
					</div>

					<div className="mt-6 text-gray-200 space-y-2 text-sm font-bold leading-relaxed p-4 rounded-lg">
						<ul className="list-disc list-inside space-y-1">
							<li>{setting?.paymentInstructions}</li>
							<li>Send Money - এ ক্লিক করুন।</li>
							<li className="flex items-center gap-2">
								প্রাপক নম্বরঃ
								<span className="font-bold text-md">
									{setting?.paymentNumber}
								</span>
								<button
									type="button"
									onClick={() => handleCopy(`${setting?.paymentNumber}`)}
									className="text-white hover:text-gray-200 transition">
									<FiCopy size={18} />
								</button>
							</li>
							<li>
								উপরের ঘরগুলোতে কত টাকা পাঠিয়েছেন, কোন নম্বর থেকে পাঠিয়েছেন এবং
								ট্রান্সজাকশন আইডি দিয়ে নিচের &quot;নিশ্চিত করুন&quot; বাটনে
								ক্লিক করুন।
							</li>
						</ul>
					</div>
				</div>

				<div className="flex justify-between">
					<Link href={"/user/dashboard"}>
						<button
							type="button"
							onClick={() => {
								setAmount("");
								setNumber("");
								setTrxID("");
							}}
							className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
							Cancel
						</button>
					</Link>

					<button
						type="submit"
						className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
						নিশ্চিত করুন
					</button>
				</div>
			</form>
		</div>
	);
};

export default PaymentForm;
