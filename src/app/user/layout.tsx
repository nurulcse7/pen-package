"use client";
import "@/app/globals.css";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

import Navbar from "@/components/Shared/UserNavbar/Navbar";
import UserSidePanel from "@/components/User/UserSidePanel";
import { Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
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

	useEffect(() => {
		if (!loading) {
			if (!user?.email || user?.role !== "user") {
				router.push("/login");
			}
		}
	}, [user, loading, router]);

	if (loading || !user?.email || user?.role !== "user") {
		return <Spinner />;
	}
	return (
		<div className={`${geistMono.variable} antialiased`}>
			<Navbar
				setIsSidePanelOpen={setIsSidePanelOpen}
				isSidePanelOpen={isSidePanelOpen}
			/>
			<main className={`${"h-screen overflow-y-hidden flex"} w-full`}>
				<UserSidePanel isSidePanelOpen={isSidePanelOpen} />
				<div
					className={`relative w-full h-full overflow-auto bg-white pt-[90px] text-black `}
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
					{children}
				</div>
			</main>
		</div>
	);
}
