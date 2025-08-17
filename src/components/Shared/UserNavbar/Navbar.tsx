"use client";

import Link from "next/link";
import { useSetting } from "@/context/SettingContext";
import { useUser } from "@/context/UserContext";
import { baseApi } from "@/lib/baseApi";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
	FiBell,
	FiSearch,
	FiChevronDown,
	FiUser,
	FiLogOut,
	FiSettings,
	FiMenu,
	FiMoreVertical,
} from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";


const Navbar = ({ setIsSidePanelOpen, isSidePanelOpen }: any) => {
	const { setting } = useSetting();
	const { user, setUser } = useUser();
	const router = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const mobileMenuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
			if (
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(event.target as Node)
			) {
				setMobileMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = async () => {
		const response = await baseApi("/auth/logout", { method: "POST" });
		if (!response.success) throw new Error(response.message || "Logout failed");
		setUser(null);
		toast.success(response?.message);
		router.push("/login");
	};

	return (
		<nav className="fixed py-1 top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600  z-50">
			<div className="px-4 sm:px-6 lg:px-10">
				<div className="flex justify-between items-center h-16">
					{/* Left */}
					<div className="flex items-center gap-4">
						{/* Toggle for mobile */}
						<button
							onClick={() => setIsSidePanelOpen((prev: boolean) => !prev)}
							className="lg:hidden text-white text-2xl">
							{isSidePanelOpen ? <RxCross1 /> : <FiMenu />}
						</button>

						{/* Logo */}
						<Link className="text-3xl text-white font-bold" href="/">
							<>{setting?.siteName || "eLearning Portal"}</>
						</Link>
					</div>

					{/* Middle - Search bar */}
					<div className="hidden lg:flex relative w-1/3">
						<input
							type="text"
							placeholder="Search anything..."
							className="w-full px-4 py-2 rounded-md text-sm bg-white bg-opacity-20 backdrop-blur-md  placeholder-opacity-60 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
						/>
						<FiSearch className="absolute right-3 top-3  opacity-70" />
					</div>

					{/* Right */}
					<div className="flex items-center space-x-4 relative ">
						{/* Notification */}
						{user?.role && (
							<div className="relative">
								<FiBell className="h-5 w-5 text-white" />
								<span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-1">
									0
								</span>
							</div>
						)}

						{/* Balance */}
						{user?.role && (
							<div className="hidden lg:block bg-white bg-opacity-10 px-3 py-1 rounded-md text-sm">
								৳ {user?.balance || 0}
							</div>
						)}

						{/* Mobile Menu */}
						<div className="block lg:hidden relative" ref={mobileMenuRef}>
							<FiMoreVertical
								onClick={() => setMobileMenuOpen(prev => !prev)}
								className="text-xl cursor-pointer text-white"
							/>
							{mobileMenuOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-md z-50">
									<ul className="py-2 text-sm">
										{user?.role && (
											<li className="px-4 py-2 text-green-600 font-medium border-b">
												Balance: {user?.balance}৳
											</li>
										)}
										<li>
											<Link
												href={`/${user?.role}/profile`}
												className="flex items-center px-4 py-2 hover:bg-gray-100">
												<FiUser className="mr-2" /> প্রোফাইল
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="flex items-center px-4 py-2 hover:bg-gray-100">
												<FiSettings className="mr-2" /> সেটিংস
											</Link>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100">
												<FiLogOut className="mr-2" /> লগআউট
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>

						{/* User Dropdown - Desktop */}
						<div className="hidden lg:block relative" ref={dropdownRef}>
							<button
								onClick={() => setDropdownOpen(prev => !prev)}
								className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-md hover:bg-opacity-20 transition-all duration-200">
								<span className="mr-2">
									Hi, {user?.fullName?.split(" ")[0]}
								</span>
								<FiChevronDown />
							</button>

							{dropdownOpen && (
								<div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-md z-50 backdrop-blur-md">
									<ul className="py-2 text-sm text-gray-700">
										<li>
											<Link
												href={`/${user?.role}/profile`}
												className="flex items-center px-4 py-2 hover:bg-gray-100">
												<FiUser className="mr-2" /> প্রোফাইল
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="flex items-center px-4 py-2 hover:bg-gray-100">
												<FiSettings className="mr-2" /> সেটিংস
											</Link>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100">
												<FiLogOut className="mr-2" /> লগআউট
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
