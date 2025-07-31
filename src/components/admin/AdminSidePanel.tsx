"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const adminLinks = [
	{ href: "/admin/dashboard", label: "🏠 ড্যাশবোর্ড" },

	{
		label: "👥 ইউজার ম্যানেজমেন্ট",
		submenu: [
			{ href: "/admin/users", label: "সব ইউজার" },
			{ href: "/admin/users/blocked", label: "ব্লকড ইউজার" },
		],
	},

	{
		label: "💳 পেমেন্ট ম্যানেজমেন্ট",
		submenu: [
			{ href: "/admin/payments/pending", label: "Pending পেমেন্ট" },
			{ href: "/admin/payments/history", label: "পেমেন্ট হিস্টোরি" },
		],
	},

	{
		label: "📦 কাজ ম্যানেজমেন্ট",
		submenu: [
			{ href: "/admin/manage/videos", label: "🎥 ভিডিও ম্যানেজমেন্ট" },
			{ href: "/admin/manage/ads", label: "📢 বিজ্ঞাপন ম্যানেজমেন্ট" },
			{ href: "/admin/manage/pen-packages", label: "✏️ পেন প্যাকেজ কাজ" },
		],
	},

	{ href: "/admin/settings", label: "⚙️ জেনারেল সেটিংস" },
];

const AdminSidePanel = ({
	isSidePanelOpen,
	setIsSidePanelOpen,
}: {
	isSidePanelOpen: boolean;
	setIsSidePanelOpen: (val: boolean) => void;
}) => {
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
				px-5 py-6 space-y-2 bg-gradient-to-b from-[#1f1c2c] via-[#302b63] to-[#24243e]
				transform transition-transform duration-300 ease-in-out text-[17px]
				text-white shadow-xl
				${isMobile ? "translate-x-0" : ""}
			`}>
			{adminLinks.map(link => {
				const isSimpleLink = !!link.href;
				const hasSubmenu = !!link.submenu;
				const isSubmenuOpen = openMenus[link.label];

				if (isSimpleLink) {
					const isActive = pathname.startsWith(link.href);
					return (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setIsSidePanelOpen(false)}
							className={`
								block px-4 py-2 rounded-md font-medium transition
								${
									isActive
										? "bg-teal-200 text-teal-900"
										: "text-white hover:text-teal-400 hover:bg-white/10"
								}
							`}>
							{link.label}
						</Link>
					);
				}

				return (
					<div key={link.label}>
						<button
							onClick={() => hasSubmenu && toggleMenu(link.label)}
							className="w-full text-left px-4 py-2 rounded-md font-medium text-white hover:text-teal-400 hover:bg-white/10 transition">
							{link.label}
							<span className="float-right">{isSubmenuOpen ? "▾" : "▸"}</span>
						</button>

						{hasSubmenu && isSubmenuOpen && (
							<div className="ml-4 space-y-1 mt-1">
								{link.submenu.map(sublink => {
									const isSubActive = pathname === sublink.href;
									return (
										<Link
											key={sublink.href}
											href={sublink.href}
											onClick={() => setIsSidePanelOpen(false)}
											className={`
												block px-4 py-2 rounded-md text-[16px] transition
												${
													isSubActive
														? "bg-teal-100 text-teal-800"
														: "text-white hover:text-teal-400 hover:bg-white/10"
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

export default AdminSidePanel;
