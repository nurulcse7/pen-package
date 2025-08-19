"use client";

import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "sonner";
import { SettingProvider, useSetting } from "@/context/SettingContext";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";
import { usePathname } from "next/navigation";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
	}) {
	const {setting}=useSetting()
	const pathname = usePathname();
	const isDashboard =
		pathname.startsWith("/admin") || pathname.startsWith("/user");

	return (
		<html lang="en" data-arp="">
			<body
				data-new-gr-c-s-check-loaded="14.1248.0"
				data-gr-ext-installed=""
				className={`${geistMono.variable} antialiased`}>
				<title>{setting?.siteName || "TelentScopeMarketing"}</title>
				<meta
					name="description"
					content={setting?.siteName || "Default description for TelentScopeMarketing"}
				/>

				<UserProvider>
					<SettingProvider>
						{!isDashboard && <Navbar />}
						<Toaster position="top-right" />
						<div className="bg-white text-black">{children}</div>
						{!isDashboard && <Footer />}
					</SettingProvider>
				</UserProvider>
			</body>
		</html>
	);
}
