import { FaBolt, FaUserCheck, FaMoneyBillWave, FaLock } from "react-icons/fa";

const features = [
	{
		icon: <FaBolt size={28} className="text-blue-600" />,
		title: "দ্রুত ও সহজ",
		description: "মাত্র কয়েক ক্লিকে কাজ শুরু করুন — কোনো অভিজ্ঞতা লাগবে না।",
	},
	{
		icon: <FaMoneyBillWave size={28} className="text-green-600" />,
		title: "দৈনিক ইনকাম",
		description: "প্রতিদিন ভিডিও বা অ্যাড দেখে ইনকাম করুন নিশ্চিতভাবে।",
	},
	{
		icon: <FaUserCheck size={28} className="text-purple-600" />,
		title: "রেফার বোনাস",
		description: "বন্ধুদের ইনভাইট করে ইনকাম বাড়ান — লাইফটাইম কমিশন।",
	},
	{
		icon: <FaLock size={28} className="text-red-600" />,
		title: "ভেরিফায়েড কোম্পানি",
		description: "বিশ্বস্ত ও রেজিস্টার্ড প্ল্যাটফর্ম, নিশ্চিন্তে কাজ করুন।",
	},
];

const WhyChooseUs = () => {
	return (
		<section className="py-12 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
					কেন আমাদের প্ল্যাটফর্ম বেছে নেবেন?
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map((item, idx) => (
						<div
							key={idx}
							className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-md transition text-center">
							<div className="mb-4 flex justify-center">{item.icon}</div>
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								{item.title}
							</h3>
							<p className="text-gray-600 text-sm">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
