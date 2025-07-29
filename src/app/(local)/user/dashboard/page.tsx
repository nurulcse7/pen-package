"use client";

import Spinner from "@/components/Shared/Spinner/Spinner";
import { useUser } from "@/context/UserContext";
import { useSetting } from "@/context/SettingContext";
import Link from "next/link";

const Dashboard = () => {
	const { user, loading } = useUser();
	const { setting, loading: settingLoading } = useSetting();

	if (loading || settingLoading || !user?.email || !user?.role) {
		return <Spinner />;
	}

	return (
		<div>
			{/* Page Header */}
			<div className="mb-[40px] mx-6 px-3 py-6 rounded-md bg-amber-600 text-white">
				<h1 className="text-2xl md:text-4xl font-semibold ">Dashboard</h1>
				<p className=" font-normal capitalize text-md">
					{user?.role} <span className="px-[10px]">/</span> Dashboard
				</p>
			</div>

			{/* Welcome Section */}
			<div className="text-center m-6 bg-gradient-to-r from-[#3255ee] to-[#8308ff] py-20 rounded-2xl text-white">
				<h1 className="text-4xl font-bold">Welcome, {user?.fullName}</h1>
				<p className="text-gray-200 text-xl pt-[20px]">
					Manage your account, transactions, and services efficiently
				</p>
			</div>

			{/* 📢 Announcement */}
			{setting?.announcement && (
				<div className="bg-yellow-100 border border-yellow-300 rounded p-4 mt-6 mx-6 text-yellow-800">
					<h3 className="text-lg font-semibold mb-1">📢 ঘোষণা:</h3>
					<p>{setting.announcement}</p>
				</div>
			)}

			{/* 🔢 Info Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-6">
				<div className="bg-white p-6 rounded-lg shadow text-center">
					<h2 className="text-xl font-bold text-gray-700">
						৳{user?.balance || 0}
					</h2>
					<p className="text-sm text-gray-500 mt-2">মোট আয়</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow text-center">
					<h2 className="text-xl font-bold text-gray-700">
						৳{user?.todayEarning || 0}
					</h2>
					<p className="text-sm text-gray-500 mt-2">আজকের আয়</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow text-center">
					<h2 className="text-xl font-bold text-gray-700">
						{user?.submittedTasks || 0}
					</h2>
					<p className="text-sm text-gray-500 mt-2">সাবমিটকৃত কাজ</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow text-center">
					<h2 className="text-xl font-bold text-gray-700">
						{user?.watchedAds || 0}
					</h2>
					<p className="text-sm text-gray-500 mt-2">দেখা অ্যাড</p>
				</div>
			</div>

			{/* 🎯 Daily Target */}
			<div className="bg-indigo-50 border border-indigo-200 rounded p-4 mt-10 mx-6 text-indigo-800">
				<h3 className="text-lg font-semibold mb-1">🎯 আজকের টার্গেট:</h3>
				<p>
					আপনাকে আজ কমপক্ষে <strong>৫টি ভিডিও</strong> দেখতে হবে। এখন পর্যন্ত
					দেখেছেন: <strong>{user?.videosWatchedToday || 0} / 5</strong>
				</p>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 px-6">
				<Link href="/user/watch-video" passHref>
					<button className="w-full bg-[#667eea] text-white py-3 rounded-lg font-semibold">
						🎥 ভিডিও দেখুন
					</button>
				</Link>

				<Link href="/user/watch-ads" passHref>
					<button className="w-full bg-[#764ba2] text-white py-3 rounded-lg font-semibold">
						📢 অ্যাড দেখুন
					</button>
				</Link>

				<Link href="/user/packaging/submit-work" passHref>
					<button className="w-full bg-[#f6ad55] text-white py-3 rounded-lg font-semibold">
						📝 কাজ জমা দিন
					</button>
				</Link>

				<Link href="/user/earnings" passHref>
					<button className="w-full bg-[#38b2ac] text-white py-3 rounded-lg font-semibold">
						💳 টাকা তুলুন
					</button>
				</Link>
			</div>

			{/* 🎁 Bonus or Offer */}
			{setting?.bonusOffer && (
				<div className="bg-green-100 border border-green-300 rounded p-4 mt-10 mx-6 text-green-800">
					<h3 className="text-lg font-semibold mb-1">🎁 নতুন বোনাস:</h3>
					<p>{setting.bonusOffer}</p>
				</div>
			)}

			{/* 🧑‍🤝‍🧑 Referral Info */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 px-6">
				<div className="bg-white p-6 rounded-lg shadow text-center">
					<h2 className="text-xl font-bold text-gray-700">
						{user?.totalReferrals || 0}
					</h2>
					<p className="text-sm text-gray-500 mt-2">রেফার করেছেন</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow text-center">
					<h2 className="text-xl font-bold text-gray-700">
						৳{user?.referralEarnings || 0}
					</h2>
					<p className="text-sm text-gray-500 mt-2">রেফার ইনকাম</p>
				</div>
			</div>

			{/* 🏆 Leaderboard Info */}
			{user?.rank && (
				<div className="bg-blue-100 border border-blue-300 rounded p-4 mt-10 mx-6 text-blue-800">
					<h3 className="text-lg font-semibold mb-1">🏆 আপনার র‍্যাংকিং:</h3>
					<p>
						আপনি বর্তমানে <strong>#{user.rank}</strong> অবস্থানে আছেন। চালিয়ে
						যান!
					</p>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
