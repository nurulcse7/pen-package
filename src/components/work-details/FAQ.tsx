"use client"
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
	{
		question: "কী ধরণের কাজ পাবো?",
		answer: "ভিডিও দেখার, অ্যাড দেখার, এবং প্যাকেজিং কাজের অপশন পাবেন।",
	},
	{
		question: "ইনকাম কিভাবে তুলব?",
		answer: "বিকাশ, নগদ বা ব্যাংক একাউন্টে সরাসরি টাকা উত্তোলনের সুবিধা আছে।",
	},
	{
		question: "রেজিস্ট্রেশন ফি কত?",
		answer: "আমাদের প্ল্যাটফর্মে রেজিস্ট্রেশন সম্পূর্ণ ফ্রি। কোনো ফি নেই।",
	},
	{
		question: "কাজের সময় নির্দিষ্ট আছে কি?",
		answer: "না, আপনি নিজের সুবিধামতো যেকোনো সময় কাজ করতে পারেন।",
	},
];

const FAQ = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		if (openIndex === index) {
			setOpenIndex(null);
		} else {
			setOpenIndex(index);
		}
	};

	return (
		<section className="mb-12">
			<h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
				সচরাচর প্রশ্ন
			</h2>
			<div className="max-w-3xl mx-auto">
				{faqs.map((faq, idx) => (
					<div
						key={idx}
						className="border-b border-gray-300 py-4 cursor-pointer"
						onClick={() => toggle(idx)}>
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-medium text-gray-800">
								{faq.question}
							</h3>
							{openIndex === idx ? (
								<FaChevronUp className="text-gray-600" />
							) : (
								<FaChevronDown className="text-gray-600" />
							)}
						</div>
						{openIndex === idx && (
							<p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default FAQ;
