"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const adminLinks = [
	{ href: "/admin/dashboard", label: "ড্যাশবোর্ড" },
	{ href: "/admin/users", label: "ইউজার ম্যানেজমেন্ট" },
	{ href: "/admin/payments", label: "পেমেন্টস" },
	{ href: "/admin/settings", label: "সেটিংস" },
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

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const shouldShowSidebar = !isMobile || isSidePanelOpen;
	if (!shouldShowSidebar) return null;

	return (
		<div
			className={`
				pt-[90px] w-[280px] fixed lg:static left-0 h-full z-40
				px-5 py-6 space-y-2 bg-gray-900 shadow-md rounded-md
				transform transition-transform duration-300 ease-in-out
				${isMobile ? "translate-x-0" : ""}
			`}>
			{adminLinks.map(link => {
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
									: "text-gray-400 hover:text-teal-400 hover:bg-gray-800"
							}
						`}>
						{link.label}
					</Link>
				);
			})}
		</div>
	);
};

export default AdminSidePanel;
