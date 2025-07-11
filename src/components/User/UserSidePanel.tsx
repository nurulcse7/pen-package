"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
	{ href: "/user/dashboard", label: "Dashboard" },
	{ href: "/user/land", label: "Land Development" },
	{ href: "/user/recharge", label: "Recharge" },
];

const UserSidePanel = ({ isSidePanelOpen }: any) => {
	const pathname = usePathname();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};
		handleResize(); // Initial check
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// 👉 Only show on mobile if isSidePanelOpen is true, always show on desktop
	const shouldShowSidebar = !isMobile || isSidePanelOpen;

	if (!shouldShowSidebar) return null;

	return (
		<div
			className={`
				pt-[90px] w-[300px] fixed lg:static  left-0 h-full z-40
				px-5 py-6 space-y-2 bg-black shadow rounded-md
				transform transition-transform duration-400 ease-in-out
				${isMobile ? "translate-x-0" : ""}
			`}>
			{links.map(link => {
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
									: "text-gray-400 hover:text-teal-700 hover:bg-teal-50"
							}
						`}>
						{link.label}
					</Link>
				);
			})}
		</div>
	);
};

export default UserSidePanel;
