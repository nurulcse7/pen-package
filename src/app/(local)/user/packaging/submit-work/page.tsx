"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaRegImage, FaSpinner, FaRegCheckCircle } from "react-icons/fa";

const SubmitPenPackageWork = () => {
	const [referenceCode, setReferenceCode] = useState("");
	const [note, setNote] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!referenceCode || !image) {
			toast.error("রেফারেন্স কোড এবং প্রমাণ ছবি অবশ্যই দিন।");
			return;
		}

		setLoading(true);

		setTimeout(() => {
			setLoading(false);
			toast.success("✅ আপনার কাজ সফলভাবে জমা হয়েছে!");
			setReferenceCode("");
			setNote("");
			setImage(null);
		}, 1500);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
			<h2 className="text-3xl font-bold text-gray-800 mb-3">
				🖊️ পেন প্যাকেজ কাজ জমা দিন
			</h2>
			<p className="text-gray-600 mb-6 leading-relaxed">
				আপনি যদি পেন প্যাকেজের কাজ সম্পন্ন করে থাকেন, তাহলে নিচের ফর্মটি পূরণ
				করে আপনার কাজ জমা দিন।
			</p>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Reference Code */}
				<div>
					<label className="block text-gray-700 font-semibold mb-1">
						🔖 রেফারেন্স কোড <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						value={referenceCode}
						onChange={e => setReferenceCode(e.target.value)}
						placeholder="যেমন: PEN2025BD123"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Optional Note */}
				<div>
					<label className="block text-gray-700 font-semibold mb-1">
						📝 মন্তব্য (ঐচ্ছিক)
					</label>
					<textarea
						value={note}
						onChange={e => setNote(e.target.value)}
						placeholder="যদি কিছু ব্যাখ্যা করতে চান, এখানে লিখুন..."
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={4}
					/>
				</div>

				{/* Image Upload */}
				<div>
					<label className="block text-gray-700 font-semibold mb-1">
						🖼️ স্ক্রিনশট/প্রমাণ ছবি আপলোড{" "}
						<span className="text-red-500">*</span>
					</label>
					<div className="flex items-center gap-4">
						<input
							type="file"
							accept="image/*"
							required
							onChange={e => setImage(e.target.files?.[0] || null)}
							className="block w-full text-sm text-gray-500
								file:mr-4 file:py-2 file:px-4
								file:rounded-lg file:border-0
								file:text-sm file:font-semibold
								file:bg-blue-50 file:text-blue-700
								hover:file:bg-blue-100"
						/>
						{image && <FaRegImage className="text-green-600 text-xl" />}
					</div>
				</div>

				{/* Submit Button */}
				<div>
					<button
						type="submit"
						disabled={loading}
						className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-60">
						{loading ? (
							<>
								<FaSpinner className="animate-spin" />
								জমা দিচ্ছে...
							</>
						) : (
							<>
								<FaRegCheckCircle />
								কাজ জমা দিন
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default SubmitPenPackageWork;
