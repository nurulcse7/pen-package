"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const navLinks = [
		{ name: "হোম", href: "/" },
		{ name: "কাজের বিস্তারিত", href: "/work-details" },
	];

	return (
		<header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="text-xl font-bold text-blue-600">
					📦 ইনকাম প্ল্যাটফর্ম
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center space-x-6">
					{navLinks.map(link => (
						<Link
							key={link.name}
							href={link.href}
							className="text-gray-700 hover:text-blue-600 transition">
							{link.name}
						</Link>
					))}
					<Link
						href="/register"
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
						রেজিস্টার করুন
					</Link>
				</nav>

				{/* Mobile Hamburger */}
				<div className="md:hidden">
					<button onClick={toggleMenu}>
						{menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden bg-white px-4 pb-4 shadow-md">
					<ul className="space-y-3 mt-2">
						{navLinks.map(link => (
							<li key={link.name}>
								<Link
									href={link.href}
									onClick={toggleMenu}
									className="block text-gray-700 hover:text-blue-600">
									{link.name}
								</Link>
							</li>
						))}
						<li>
							<Link
								href="/register"
								onClick={toggleMenu}
								className="block bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition">
								রেজিস্টার করুন
							</Link>
						</li>
					</ul>
				</div>
			)}
		</header>
	);
};

export default Navbar;
