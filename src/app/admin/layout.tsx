"use client";
import "@/app/globals.css";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Shared/UserNavbar/Navbar";
import { Geist_Mono } from "next/font/google";
import Spinner from "@/components/Shared/Spinner/Spinner";
import AdminSidePanel from "@/components/admin/AdminSidePanel";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function AdminRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useUser();
	const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (!user?.email || user?.role !== "admin") {
				router.push("/login");
			}
		}
	}, [user, loading, router]);

	if (loading || !user?.email || user?.role !== "admin") {
		return <Spinner />;
	}

	return (
		<div className={`${geistMono.variable} antialiased`}>
			<Navbar
				setIsSidePanelOpen={setIsSidePanelOpen}
				isSidePanelOpen={isSidePanelOpen}
			/>

			<main className="h-screen overflow-y-hidden flex w-full">
				<AdminSidePanel
					isSidePanelOpen={isSidePanelOpen}
					setIsSidePanelOpen={setIsSidePanelOpen}
				/>
				<div className="bg-white pt-[90px] text-black w-full h-full overflow-y-auto">
					{children}
				</div>
			</main>
		</div>
	);
}
