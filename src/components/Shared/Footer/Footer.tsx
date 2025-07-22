"use client";
import { useSetting } from "@/context/SettingContext";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
	const { setting } = useSetting();
	return (
		<footer className="bg-gray-900 text-gray-300 py-8">
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Contact Info */}
				<div>
					<h3 className="text-xl font-semibold mb-4 text-white">যোগাযোগ</h3>
					<p>ইমেল: support@example.com</p>
					<p>ফোন: +880 1234 567890</p>
					<p>ঠিকানা: ঢাকা, বাংলাদেশ</p>
				</div>

				{/* Useful Links */}
				<div>
					<h3 className="text-xl font-semibold mb-4 text-white">
						তাড়াতাড়ি লিংক
					</h3>
					<ul>
						<li>
							<Link href="/" className="hover:text-white transition">
								হোম
							</Link>
						</li>
						<li>
							<Link
								href="/work-details"
								className="hover:text-white transition">
								কাজের বিস্তারিত
							</Link>
						</li>
					</ul>
				</div>

				{/* Social Media */}
				<div>
					<h3 className="text-xl font-semibold mb-4 text-white">
						আমাদের সাথে যুক্ত থাকুন
					</h3>
					<div className="flex space-x-4">
						<a
							href="https://facebook.com/yourpage"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-500 transition"
							aria-label="Facebook">
							<FaFacebookF size={24} />
						</a>
						<a
							href="https://youtube.com/yourchannel"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-red-600 transition"
							aria-label="YouTube">
							<FaYoutube size={24} />
						</a>
						<a
							href="https://wa.me/yourwhatsapplink"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-green-500 transition"
							aria-label="WhatsApp">
							<FaWhatsapp size={24} />
						</a>
					</div>
				</div>
			</div>

			<div className="text-center text-gray-400 mt-8 text-xl pt-8 border-t border-gray-500">
				© {new Date().getFullYear()} {setting?.siteName}. সর্বস্বত্ব সংরক্ষিত।
			</div>
		</footer>
	);
};

export default Footer;
