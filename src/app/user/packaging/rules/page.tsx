const steps = [
	{
		title: "প্যাকেজিং কাজের তালিকা দেখুন",
		description: "ড্যাশবোর্ডে কোন কোন পণ্য প্যাক করতে হবে তা দেখতে পারবেন।",
	},
	{
		title: "আপনার ঠিকানায় পণ্য গ্রহণ করুন",
		description: "আমাদের পক্ষ থেকে নির্দিষ্ট ঠিকানায় প্যাকেজ পাঠানো হবে।",
	},
	{
		title: "সঠিক নিয়মে প্যাক করুন",
		description: "নির্দিষ্ট নির্দেশনা অনুযায়ী কাজ করুন, যেন মান বজায় থাকে।",
	},
	{
		title: "প্যাকেজ জমা দিন এবং ইনকাম পান",
		description: "আপনার কাজ জমা দিন, এবং নির্ধারিত সময়ে পেমেন্ট পেয়ে যাবেন।",
	},
];

export default function Rules() {
	return (
		<main className="container mx-auto    ">
			<h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
				প্যাকেজিং কাজের নিয়ম
			</h1>
			<p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
				নিচের ধাপগুলো অনুসরণ করে আপনি সহজেই ঘরে বসে প্যাকেজিং করে ইনকাম করতে
				পারবেন।
			</p>

			<div className="space-y-6 max-w-3xl mx-auto">
				{steps.map((step, idx) => (
					<div
						key={idx}
						className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition">
						<h3 className="text-xl font-semibold mb-1 text-blue-700">
							ধাপ {idx + 1}: {step.title}
						</h3>
						<p className="text-gray-600 text-sm">{step.description}</p>
					</div>
				))}{" "}
			</div>
		</main>
	);
}
