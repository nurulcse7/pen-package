import { FaUserPlus, FaTasks, FaMoneyCheckAlt } from "react-icons/fa";

const steps = [
	{
		icon: <FaUserPlus size={28} className="text-blue-600" />,
		title: "রেজিস্টার করুন",
		description: "একটি অ্যাকাউন্ট তৈরি করুন মাত্র ১ মিনিটে এবং লগইন করুন।",
	},
	{
		icon: <FaTasks size={28} className="text-green-600" />,
		title: "কাজ শুরু করুন",
		description: "ভিডিও দেখুন, অ্যাড দেখুন বা প্যাকেজিং কাজ করুন সহজে।",
	},
	{
		icon: <FaMoneyCheckAlt size={28} className="text-purple-600" />,
		title: "টাকা তুলুন",
		description: "ইনকাম হওয়া টাকা বিকাশ/নগদে তুলুন খুব সহজে।",
	},
];

const HowItWorks = () => {
	return (
		<section className="py-12 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
					কিভাবে কাজ করবেন?
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{steps.map((step, index) => (
						<div
							key={index}
							className="bg-white rounded-lg p-6 shadow hover:shadow-md transition text-center">
							<div className="mb-4 flex justify-center">{step.icon}</div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								{step.title}
							</h3>
							<p className="text-gray-600 text-sm">{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
