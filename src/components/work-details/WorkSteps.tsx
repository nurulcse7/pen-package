import {
	FaRegCheckCircle,
	FaRegPlayCircle,
	FaRegMoneyBillAlt,
} from "react-icons/fa";

const steps = [
	{
		icon: <FaRegCheckCircle size={28} className="text-blue-600" />,
		title: "রেজিস্টার করুন",
		description: "সহজ ফর্ম পূরণ করে আমাদের প্ল্যাটফর্মে রেজিস্ট্রেশন করুন।",
	},
	{
		icon: <FaRegPlayCircle size={28} className="text-green-600" />,
		title: "কাজ শুরু করুন",
		description: "ভিডিও দেখুন, অ্যাড দেখুন বা প্যাকেজিং কাজ শুরু করুন।",
	},
	{
		icon: <FaRegMoneyBillAlt size={28} className="text-purple-600" />,
		title: "ইনকাম তুলুন",
		description: "আপনার আয় বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে তুলুন।",
	},
];

const WorkSteps = () => {
	return (
		<section className="mb-12 bg-gray-50 py-10 rounded-lg px-6">
			<h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
				কাজ করার ধাপ
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
				{steps.map((step, idx) => (
					<div
						key={idx}
						className="bg-white rounded-lg p-6 shadow text-center hover:shadow-md transition">
						<div className="mb-4 flex justify-center">{step.icon}</div>
						<h3 className="text-xl font-semibold mb-2 text-gray-800">
							{step.title}
						</h3>
						<p className="text-gray-600 text-sm">{step.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default WorkSteps;
