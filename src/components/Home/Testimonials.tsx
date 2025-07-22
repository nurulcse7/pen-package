const testimonials = [
	{
		name: "আবির হোসেন",
		review:
			"আমি প্রতিদিন ১-২ ঘণ্টা কাজ করে ভালো ইনকাম করছি। সহজ ও ভেরিফায়েড সাইট। ধন্যবাদ!",
		image: "/images/abir.webp",
	},
	{
		name: "সাবিনা আক্তার",
		review:
			"শুরুতে সন্দেহ ছিল, এখন নিজেই ইনকাম করছি এবং আমার বন্ধুরাও কাজ করছে। খুব উপকারে এসেছে।",
		image: "/images/sabina.webp",
	},
	{
		name: "রায়হান ইসলাম",
		review:
			"অনেক প্ল্যাটফর্ম ট্রাই করেছি, এটা সবচেয়ে legit ও responsive support দেয়। Highly recommended!",
		image: "/images/rayhan.webp",
	},
];

import Image from "next/image";

const Testimonials = () => {
	return (
		<section className="py-12 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
					সফল সদস্যদের অভিজ্ঞতা
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{testimonials.map((user, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition">
							<div className="w-20 h-20 mx-auto mb-4">
								<Image
									src={user.image}
									alt={user.name}
									width={80}
									height={80}
									className="rounded-full object-cover w-full h-full"
								/>
							</div>
							<h3 className="text-lg font-semibold text-gray-800">
								{user.name}
							</h3>
							<p className="text-sm text-gray-600 mt-2">{user.review}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
