"use client";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { useUser } from "@/context/UserContext";
import { useSetting } from "@/context/SettingContext";
import Link from "next/link";
import { useState, useEffect } from "react";

const Dashboard = () => {
	const { user, loading } = useUser();
	const { setting, loading: settingLoading } = useSetting();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	if (loading || settingLoading || !user?.email || !user?.role) {
		return <Spinner />;
	}

	// Calculate progress percentage for daily target
	// const videoProgress = Math.min(100, (user?.videosWatchedToday || 0) * 20);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 pb-20">
			{/* Animated Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
			</div>

			{/* Page Header */}
			<div className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white py-8 px-6 rounded-b-3xl shadow-xl overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-10 transform -skew-y-12"></div>
				<div className="relative z-10">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-3xl md:text-5xl font-bold tracking-tight">
								ড্যাশবোর্ড
							</h1>
							<p className="text-md md:text-lg mt-2 opacity-90">
								<span className="capitalize">{user?.role}</span>
								<span className="px-2 opacity-70">/</span>
								<span>Dashboard</span>
							</p>
						</div>
						<div className="hidden md:block">
							<div className="bg-white bg-opacity-20 rounded-full p-3 shadow-lg">
								<div className="bg-white rounded-full p-2">
									<div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
										{user?.fullName?.charAt(0) || "U"}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Welcome Section */}
			<div
				className={`text-center mx-6 mt-10 bg-gradient-to-r from-blue-600 to-purple-700 py-12 rounded-2xl text-white shadow-xl transform transition-all duration-700 ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
				}`}>
				<div className="relative z-10">
					<div className="inline-block bg-white bg-opacity-20 rounded-full p-3 mb-4">
						<span className="text-4xl">👋</span>
					</div>
					<h1 className="text-4xl font-extrabold mb-2">
						হ্যালো, {user?.fullName}
					</h1>
					<p className="text-blue-100 text-lg max-w-2xl mx-auto">
						আপনার অ্যাকাউন্ট ও আয় ব্যবস্থাপনা এখানেই করুন।
					</p>
				</div>
				<div className="absolute top-0 right-0 opacity-10">
					<svg
						className="w-32 h-32 text-white"
						fill="currentColor"
						viewBox="0 0 20 20">
						<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
					</svg>
				</div>
			</div>

			{/* Announcement */}
			{setting?.announcement && (
				<div
					className={`bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-5 mt-10 mx-6 text-yellow-900 shadow-lg transform transition-all duration-700 delay-100 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
					}`}>
					<div className="flex items-start">
						<div className="flex-shrink-0">
							<div className="bg-yellow-600 bg-opacity-30 rounded-full p-2">
								<span className="text-xl">📢</span>
							</div>
						</div>
						<div className="ml-4">
							<h3 className="text-xl font-bold mb-1">ঘোষণা:</h3>
							<p className="font-medium">{setting.announcement}</p>
						</div>
					</div>
				</div>
			)}

			{/* Info Cards */}
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-6 transform transition-all duration-700 delay-200 ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
				}`}>
				{[
					{
						label: "মোট আয়",
						value: `৳${user?.balance || 0}`,
						icon: "💰",
						color: "from-green-500 to-emerald-600",
					},
					{
						label: "আজকের আয়",
						value: `৳${0}`,
						icon: "📈",
						color: "from-blue-500 to-indigo-600",
					},
					{
						label: "সাবমিটকৃত কাজ",
						value: 0,
						icon: "📝",
						color: "from-purple-500 to-fuchsia-600",
					},
					{
						label: "দেখা অ্যাড",
						value: 0,
						icon: "👁️",
						color: "from-amber-500 to-orange-600",
					},
				].map((item, i) => (
					<div
						key={i}
						className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
						<div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
						<div className="p-6">
							<div className="flex justify-between items-start">
								<div>
									<h2 className="text-3xl font-bold text-gray-800">
										{item.value}
									</h2>
									<p className="text-sm text-gray-500 mt-2">{item.label}</p>
								</div>
								<div className="bg-gray-100 rounded-full p-3 text-2xl">
									{item.icon}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Daily Target */}
			{/* <div
				className={`bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mt-10 mx-6 text-white shadow-xl transform transition-all duration-700 delay-300 ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
				}`}>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-xl font-bold flex items-center">
						<span className="mr-2">🎯</span> আজকের টার্গেট
					</h3>
					<span className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-medium">
						{user?.videosWatchedToday || 0} / 5
					</span>
				</div>

				<div className="w-full bg-indigo-400 bg-opacity-50 rounded-full h-4 mb-4">
					<div
						className="bg-gradient-to-r from-amber-300 to-yellow-400 h-4 rounded-full transition-all duration-1000 ease-out"
						style={{ width: `${videoProgress}%` }}></div>
				</div>

				<p className="text-indigo-100">
					আপনাকে আজ কমপক্ষে <strong>৫টি ভিডিও</strong> দেখতে হবে। এখন পর্যন্ত
					দেখেছেন: <strong>{user?.videosWatchedToday || 0}</strong>
				</p>
			</div> */}

			{/* Quick Access Buttons */}
			<div
				className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 px-6 transform transition-all duration-700 delay-400 ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
				}`}>
				{[
					{
						href: "/user/watch-video",
						label: "ভিডিও দেখুন",
						icon: "🎥",
						color:
							"bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
					},
					{
						href: "/user/watch-ads",
						label: "অ্যাড দেখুন",
						icon: "📢",
						color:
							"bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700",
					},
					{
						href: "/user/packaging/submit-work",
						label: "কাজ জমা দিন",
						icon: "📝",
						color:
							"bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
					},
					{
						href: "/user/earnings",
						label: "টাকা তুলুন",
						icon: "💳",
						color:
							"bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
					},
				].map((item, i) => (
					<Link href={item.href} key={i}>
						<div
							className={`${item.color} text-white py-5 rounded-xl text-center font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col items-center justify-center`}>
							<span className="text-2xl mb-2">{item.icon}</span>
							<span>{item.label}</span>
						</div>
					</Link>
				))}
			</div>

			{/* Bonus / Offer */}
			{/* {setting?.bonusOffer && (
				<div
					className={`bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mt-10 mx-6 text-white shadow-xl transform transition-all duration-700 delay-500 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
					}`}>
					<div className="flex items-start">
						<div className="flex-shrink-0">
							<div className="bg-white bg-opacity-20 rounded-full p-3">
								<span className="text-2xl">🎁</span>
							</div>
						</div>
						<div className="ml-4">
							<h3 className="text-xl font-bold mb-2">নতুন বোনাস:</h3>
							<p className="text-green-100">{setting.bonusOffer}</p>
						</div>
					</div>
				</div>
			)} */}

			{/* Referral Info */}
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 px-6 transform transition-all duration-700 delay-600 ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
				}`}>
				{[
					{
						label: "রেফার করেছেন",
						value: 0,
						icon: "👥",
						color: "from-blue-500 to-indigo-600",
					},
					{
						label: "রেফার ইনকাম",
						value: `৳${0}`,
						icon: "💸",
						color: "from-green-500 to-emerald-600",
					},
				].map((item, i) => (
					<div
						key={i}
						className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
						<div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
						<div className="p-6">
							<div className="flex justify-between items-start">
								<div>
									<h2 className="text-3xl font-bold text-gray-800">
										{item.value}
									</h2>
									<p className="text-sm text-gray-500 mt-2">{item.label}</p>
								</div>
								<div className="bg-gray-100 rounded-full p-3 text-2xl">
									{item.icon}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Leaderboard */}
			{/* {user?.rank && (
				<div
					className={`bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mt-10 mx-6 text-white shadow-xl transform transition-all duration-700 delay-700 ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
					}`}>
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<div className="bg-white bg-opacity-20 rounded-full p-3">
								<span className="text-2xl">🏆</span>
							</div>
						</div>
						<div className="ml-4">
							<h3 className="text-xl font-bold mb-1">আপনার র‍্যাংকিং:</h3>
							<p className="text-blue-100">
								আপনি বর্তমানে{" "}
								<span className="bg-white bg-opacity-20 rounded-full px-3 py-1 font-bold">
									#{user.rank}
								</span>{" "}
								অবস্থানে আছেন। চালিয়ে যান!
							</p>
						</div>
					</div>
				</div>
			)} */}

			{/* Custom Animation Styles */}
			<style jsx global>{`
				@keyframes blob {
					0% {
						transform: translate(0px, 0px) scale(1);
					}
					33% {
						transform: translate(30px, -50px) scale(1.1);
					}
					66% {
						transform: translate(-20px, 20px) scale(0.9);
					}
					100% {
						transform: translate(0px, 0px) scale(1);
					}
				}
				.animate-blob {
					animation: blob 7s infinite;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</div>
	);
};

export default Dashboard;
