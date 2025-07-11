import Image from "next/image";
import { FaAndroid } from "react-icons/fa";
import Link from "next/link";

const DownloadApp = () => {
	return (
		<section className="py-12 bg-white">
			<div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
				{/* Left Content */}
				<div className="md:w-1/2 text-center md:text-left">
					<h2 className="text-3xl font-bold text-gray-800 mb-4">
						মোবাইল অ্যাপে আরও সহজ!
					</h2>
					<p className="text-gray-600 mb-6">
						আমাদের Android অ্যাপ ডাউনলোড করে আপনার ইনকাম, কাজ এবং রেফার সবকিছু
						সহজে ম্যানেজ করুন।
					</p>

					<Link
						href="https://play.google.com/store/apps/details?id=com.example.app" // Replace with real link
						target="_blank"
						className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700 transition">
						<FaAndroid size={20} />
						অ্যাপ ডাউনলোড করুন
					</Link>
				</div>

				{/* Right Side Image */}
				<div className="md:w-1/2">
					<Image
						src="/assets/app-download.png" // Replace with your own
						alt="Download App"
						width={400}
						height={400}
						className="w-full h-auto"
						priority
					/>
				</div>
			</div>
		</section>
	);
};

export default DownloadApp;
