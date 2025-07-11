"use client";
import "@/app/globals.css";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Navbar from "@/components/Shared/UserNavbar/Navbar";
import UserSidePanel from "@/components/User/UserSidePanel";
import { Geist_Mono } from "next/font/google";
import Spinner from "@/components/Shared/Spinner/Spinner";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function UserRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useUser();
	const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const isPrintPage = pathname?.startsWith("/user/land/print");

	useEffect(() => {
		if (!isPrintPage && !loading && (!user?.email || user?.role !== "user")) {
			router.push("/login");
		}
	}, [user, loading, router, isPrintPage]);

	if (!isPrintPage && (loading || !user?.email || user?.role !== "user")) {
		return <Spinner />;
	}

	return (
		<div className={`${geistMono.variable} antialiased`}>
			{!isPrintPage && (
				<Navbar
					setIsSidePanelOpen={setIsSidePanelOpen}
					isSidePanelOpen={isSidePanelOpen}
				/>
			)}

			<main
				className={`${
					!isPrintPage && "h-screen overflow-y-hidden flex"
				} w-full`}>
				{!isPrintPage && <UserSidePanel isSidePanelOpen={isSidePanelOpen} />}
				<div
					className={`relative w-full h-full overflow-y-auto ${
						!isPrintPage && "bg-white pt-[90px] text-black"
					}`}>
					{children}

					{!isPrintPage && (
						<p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-md text-gray-500">
							© {new Date().getFullYear()} সমস্ত স্বত্ব সংরক্ষিত | Service
							Portal
						</p>
					)}
				</div>
			</main>
		</div>
	);
}
