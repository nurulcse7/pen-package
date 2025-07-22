"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
	{ href: "/user/dashboard", label: "ড্যাশবোর্ড" },

	{
		label: "প্যাকেজিং কাজ",
		submenu: [
			{ href: "/user/packaging/rules", label: "প্যাকেজিং নিয়মাবলী" },
			{ href: "/user/packaging/submit", label: "কাজ জমা দিন" },
		],
	},

	{ href: "/user/watch-video", label: "ভিডিও দেখুন" },
	{ href: "/user/watch-ads", label: "অ্যাড দেখুন" },
	{
		label: "আয় ও হিস্টোরি",
		submenu: [
			{ href: "/user/earnings", label: "আমার আয়" },
			{ href: "/user/earnings/history", label: "আয়ের হিস্টোরি" },
		],
	},
];

const UserSidePanel = ({ isSidePanelOpen }: any) => {
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

	const toggleMenu = (label: string) => {
		setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
	};

	const shouldShowSidebar = !isMobile || isSidePanelOpen;
	if (!shouldShowSidebar) return null;

	return (
		<div
			className={`
				pt-[90px] w-[300px] fixed lg:static left-0 h-full z-40
				px-5 py-6 space-y-2 bg-gradient-to-l from-[#3255ee] to-[#8308ff]  
				transform transition-transform duration-400 ease-in-out text-xl
				${isMobile ? "translate-x-0" : ""}
			`}>
			{links.map(link => {
				const isSimpleLink = !!link.href;
				const hasSubmenu = !!link.submenu;
				const isSubmenuOpen = openMenus[link.label];

				// ✅ For normal links
				if (isSimpleLink) {
					const isActive = pathname.startsWith(link.href);
					return (
						<Link
							key={link.href}
							href={link.href}
							className={`
								block px-4 py-2 rounded-md font-medium transition
								${
									isActive
										? "bg-teal-100 text-teal-700"
										: "text-white hover:text-teal-700 hover:bg-teal-50"
								}
							`}>
							{link.label}
						</Link>
					);
				}

				// ✅ For section like "Packaging"
				return (
					<div key={link.label}>
						<button
							onClick={() => hasSubmenu && toggleMenu(link.label)}
							className="block   w-full text-left px-4 py-2 rounded-md font-medium text-white hover:text-teal-700 hover:bg-teal-50 transition">
							{link.label}
							<span className="float-right">{isSubmenuOpen ? "▾" : "▸"}</span>
						</button>

						{hasSubmenu && isSubmenuOpen && (
							<div className="text-lg ml-4 space-y-1 mt-1">
								{link.submenu.map(sublink => {
									const isSubActive = pathname === sublink.href;
									return (
										<Link
											key={sublink.href}
											href={sublink.href}
											className={`
												block px-4 py-2 rounded-md  transition
												${
													isSubActive
														? "bg-teal-200 text-teal-800"
														: "text-white hover:text-teal-700 hover:bg-teal-50"
												}
											`}>
											{sublink.label}
										</Link>
									);
								})}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default UserSidePanel;
