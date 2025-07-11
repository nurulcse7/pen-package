"use client";

import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
	return (
		<section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12 mt-16">
			<div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
				{/* Left Content */}
				<div className="md:w-1/2 text-center md:text-left">
					<h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-snug">
						বাসায় বসেই আয় করুন <br className="hidden md:block" />
						প্রতিদিন, প্রতিটি মুহূর্তে!
					</h1>
					<p className="text-gray-600 text-lg mb-6">
						কাজ শিখুন, কাজ করুন এবং রেফার করে বাড়ান আপনার ইনকাম — একদম সহজ
						উপায়ে।
					</p>
					<Link
						href="/register"
						className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
						আজই রেজিস্টার করুন
					</Link>
				</div>

				{/* Right Image */}
				<div className="md:w-1/2">
					<Image
						src="/assets/hero-image.svg" // Replace with your own
						alt="Hero Image"
						width={500}
						height={400}
						className="w-full h-auto"
						priority
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
