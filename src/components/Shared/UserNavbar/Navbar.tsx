import { useSetting } from "@/context/SettingContext";
import { useUser } from "@/context/UserContext";
import { baseApi } from "@/lib/baseApi";
import Link from "next/link";
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
	const mobileMenuRef = useRef<HTMLDivElement | null>(null); // added

	// ✅ Desktop dropdown outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// ✅ Mobile menu outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
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
		const response = await baseApi("/auth/logout", {
			method: "POST",
		});
		if (!response.success) throw new Error(response.message || "Logout failed");
		setUser(null);
		toast.success(response?.message);
		router.push(`/login`);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
			<div className="px-4 sm:px-6 lg:px-12">
				<div className="flex items-center justify-between h-16">
					{/* Left side */}
					<div className="flex items-center lg:w-auto w-full space-x-3">
						{/* Hamburger */}
						<button
							onClick={() => setIsSidePanelOpen((prev: boolean) => !prev)}
							className="lg:hidden text-gray-700 text-xl">
							{isSidePanelOpen ? <RxCross1 /> : <FiMenu />}
						</button>

						{/* Logo */}
						<div className="flex justify-center w-full">
							<Link href="/">
								<span className="  font-bold text-teal-600  text-3xl">
									{setting?.siteName ? (
										<>{setting?.siteName}</>
									) : (
										"eLearning Portal"
									)}
								</span>
							</Link>
						</div>
					</div>

					{/* Notification & balance - Desktop only */}
					{user?.role !== "admin" && (
						<div className="hidden lg:flex items-center space-x-4">
							<div className="relative">
								<FiBell className="text-gray-600 h-5 w-5" />
								<span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
									0
								</span>
							</div>
							<span className="text-green-600 font-medium">
								Balance : {user?.amount}
							</span>
						</div>
					)}

					{/* Right side */}
					<div
						className="flex items-center space-x-4 relative"
						ref={dropdownRef}>
						{/* Search - Desktop */}
						<div className="relative hidden lg:block">
							<input
								type="text"
								placeholder="Search"
								className="border-2  border-blue-500  rounded-md text-black px-3 py-2 pl-4 pr-8 text-sm"
							/>
							<FiSearch className="absolute right-2 top-3 h-4 w-4 text-gray-500" />
						</div>

						{/* ✅ Mobile 3-dot menu with dropdown */}
						<div className="block lg:hidden relative" ref={mobileMenuRef}>
							<FiMoreVertical
								className="text-xl text-gray-700 cursor-pointer"
								onClick={() => setMobileMenuOpen(prev => !prev)}
							/>
							{mobileMenuOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
									<ul className="py-2 text-sm text-gray-700">
										{user?.role !== "admin" && (
											<li className="px-4 py-2 text-green-600 font-medium border-b">
												Balance: {user?.amount}৳
											</li>
										)}
										<li>
											<Link
												href={`/${user?.role}/profile`}
												className="flex items-center px-4 py-2 hover:bg-gray-100">
												<FiUser className="mr-2" /> Profile
											</Link>
										</li>
										<li>
											<a
												href="#"
												className="flex items-center px-4 py-2 hover:bg-gray-100">
												<FiSettings className="mr-2" /> Settings
											</a>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className="w-full cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 text-red-600">
												<FiLogOut className="mr-2" /> Logout
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>

						{/* User dropdown - Desktop */}
						<div className="hidden lg:block relative bg-blue-600 rounded p-2 text-white">
							<button
								onClick={() => setDropdownOpen(prev => !prev)}
								className="flex items-center  focus:outline-none">
								Hello,{" "}
								<span className="font-medium ml-1">{user?.fullName}</span>
								<FiChevronDown className="ml-1 text-sm" />
							</button>

							{dropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
									<ul className="py-2 text-sm text-gray-700">
										<li>
											<Link
												href={`/${user?.role}/profile`}
												className="flex items-center px-4 py-2 hover:bg-gray-100">
												<FiUser className="mr-2" /> Profile
											</Link>
										</li>
										<li>
											<a
												href="#"
												className="flex items-center px-4 py-2 hover:bg-gray-100">
												<FiSettings className="mr-2" /> Settings
											</a>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className="w-full cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 text-red-600">
												<FiLogOut className="mr-2" /> Logout
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
