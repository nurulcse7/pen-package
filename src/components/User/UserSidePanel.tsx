"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Menu items with icons
const links = [
	{
		href: "/user/dashboard",
		label: "ড্যাশবোর্ড",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
			</svg>
		),
	},
	{
		label: "প্যাকেজিং কাজ",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path
					fillRule="evenodd"
					d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
					clipRule="evenodd"
				/>
			</svg>
		),
		submenu: [
			{
				href: "/user/packaging/rules",
				label: "প্যাকেজিং নিয়মাবলী",
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clipRule="evenodd"
						/>
					</svg>
				),
			},
			{
				href: "/user/packaging/submit-work",
				label: "কাজ জমা দিন",
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				),
			},
		],
	},
	{
		href: "/user/watch-video",
		label: "ভিডিও দেখুন",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
			</svg>
		),
	},
	{
		href: "/user/watch-ads",
		label: "অ্যাড দেখুন",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
			</svg>
		),
	},
	{
		label: "আয় ও হিস্টোরি",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
				<path
					fillRule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
					clipRule="evenodd"
				/>
			</svg>
		),
		submenu: [
			{
				href: "/user/earnings",
				label: "আমার আয়",
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fillRule="evenodd"
							d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
				),
			},
			{
				href: "/user/earnings/history",
				label: "আয়ের হিস্টোরি",
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
							clipRule="evenodd"
						/>
					</svg>
				),
			},
		],
	},
];

const UserSidePanel = ({ isSidePanelOpen, setIsSidePanelOpen }: any) => {
	const pathname = usePathname();
	const [isMobile, setIsMobile] = useState(false);
	const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Auto-open submenu if current path matches any of its children
	useEffect(() => {
		const newOpenMenus: { [key: string]: boolean } = {};
		links.forEach(link => {
			if (link.submenu) {
				const match = link.submenu.some(sub => pathname.startsWith(sub.href));
				if (match) newOpenMenus[link.label] = true;
			}
		});
		setOpenMenus(newOpenMenus);
	}, [pathname]);

	const toggleMenu = (label: string) => {
		setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
	};

	const shouldShowSidebar = !isMobile || isSidePanelOpen;
	if (!shouldShowSidebar) return null;

	return (
		<>
			{/* Overlay for mobile */}
			{isMobile && isSidePanelOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
					onClick={() => setIsSidePanelOpen(false)}></div>
			)}

			<div
				className={`
          pt-[90px] lg:w-[300px] w-[280px] fixed lg:static left-0 h-full z-40
          px-4 py-6 space-y-3 bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-700 shadow-2xl
          transform transition-transform duration-300 ease-in-out text-lg
          ${
						isMobile
							? isSidePanelOpen
								? "translate-x-0"
								: "-translate-x-full"
							: ""
					}
          overflow-y-auto
        `}>
				{/* User Profile Section */}
				<div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-lg">
					<div className="flex items-center space-x-3">
						<div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl shadow-md">
							U
						</div>
						<div>
							<h3 className="font-bold">ব্যবহারকারী</h3>
							<p className="  text-sm">প্রোফাইল দেখুন</p>
						</div>
					</div>
				</div>

				{/* Navigation Menu */}
				<nav className="space-y-1">
					{links.map(link => {
						const isSimpleLink = !!link.href;
						const hasSubmenu = !!link.submenu;
						const isSubmenuOpen = openMenus[link.label];
						const isSubmenuActive =
							hasSubmenu &&
							link.submenu?.some(s => pathname.startsWith(s.href));

						// For normal links
						if (isSimpleLink) {
							const isActive = pathname.startsWith(link.href);
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`
                    flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${
											isActive
												? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
												: "text-indigo-100 hover:text-gray-600 hover:bg-white hover:bg-opacity-10"
										}
                  `}>
									<span
										className={`mr-3 ${
											isActive ? "text-white" : "text-indigo-300"
										}`}>
										{link.icon}
									</span>
									<span>{link.label}</span>
									{isActive && (
										<span className="ml-auto bg-white bg-opacity-30 rounded-full p-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fillRule="evenodd"
													d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</span>
									)}
								</Link>
							);
						}

						// For dropdown with submenu
						return (
							<div key={link.label} className="space-y-1">
								<button
									onClick={() => toggleMenu(link.label)}
									className={`
                    flex items-center w-full px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${
											isSubmenuActive
												? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
												: "text-indigo-100 hover:text-gray-600 hover:bg-white hover:bg-opacity-10"
										}
                  `}>
									<span
										className={`mr-3 ${
											isSubmenuActive ? "text-white" : "text-indigo-300"
										}`}>
										{link.icon}
									</span>
									<span>{link.label}</span>
									<span className="ml-auto transform transition-transform duration-300">
										{isSubmenuOpen ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fillRule="evenodd"
													d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fillRule="evenodd"
													d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										)}
									</span>
								</button>

								{hasSubmenu && isSubmenuOpen && (
									<div className="ml-4 space-y-1 pl-2 border-l-2 border-indigo-500 border-opacity-30">
										{link.submenu.map(sublink => {
											const isSubActive = pathname.startsWith(sublink.href);
											return (
												<Link
													key={sublink.href}
													href={sublink.href}
													className={`
                            flex items-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200
                            ${
															isSubActive
																? "bg-gradient-to-r from-teal-400 to-emerald-400 text-white shadow-md"
																: "text-indigo-100 hover:text-gray-600 hover:bg-white hover:bg-opacity-10"
														}
                          `}>
													<span
														className={`mr-3 ${
															isSubActive ? "text-white" : "text-indigo-300"
														}`}>
														{sublink.icon}
													</span>
													<span>{sublink.label}</span>
													{isSubActive && (
														<span className="ml-auto bg-white bg-opacity-30 rounded-full p-1">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-3 w-3"
																viewBox="0 0 20 20"
																fill="currentColor">
																<path
																	fillRule="evenodd"
																	d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
																	clipRule="evenodd"
																/>
															</svg>
														</span>
													)}
												</Link>
											);
										})}
									</div>
								)}
							</div>
						);
					})}
				</nav>
			</div>
		</>
	);
};

export default UserSidePanel;
