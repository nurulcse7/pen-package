"use client";

import { useUser } from "@/context/UserContext";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { useEffect, useState } from "react";
import Link from "next/link";

const AdminDashboard = () => {
	const { user, loading } = useUser();

	const [stats, setStats] = useState({
		totalUsers: 0,
		pendingPayments: 0,
		todaysIncome: 0,
		activeUsers: 0,
	});

	useEffect(() => {
		// Dummy stats fetch simulation
		setTimeout(() => {
			setStats({
				totalUsers: 243,
				pendingPayments: 8,
				todaysIncome: 1275,
				activeUsers: 103,
			});
		}, 500);
	}, []);

	if (loading || !user?.role) return <Spinner />;

	return (
		<div className="min-h-screen bg-gray-100 text-gray-800 pb-10">
			{/* Page Header */}
			<div className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white px-6 py-10 rounded-b-2xl shadow-md">
				<h1 className="text-4xl font-bold">👑 Admin Dashboard</h1>
				<p className="mt-2 text-lg opacity-90">
					স্বাগতম, {user?.fullName}! নিচে আজকের সারাংশ দেখুন।
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-6">
				<Card title="মোট ইউজার" value={stats.totalUsers} color="bg-blue-500" />
				<Card
					title="Pending পেমেন্ট"
					value={stats.pendingPayments}
					color="bg-pink-500"
				/>
				<Card
					title="আজকের ইনকাম"
					value={`৳${stats.todaysIncome}`}
					color="bg-green-500"
				/>
				<Card
					title="একটিভ ইউজার"
					value={stats.activeUsers}
					color="bg-yellow-500"
				/>
			</div>

			{/* Action Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-6">
				<QuickLink
					title="ইউজার ম্যানেজমেন্ট"
					description="নতুন ইউজার দেখুন ও কন্ট্রোল করুন।"
					href="/admin/users"
				/>
				<QuickLink
					title="পেমেন্ট রিকোয়েস্ট"
					description="পেন্ডিং পেমেন্ট যাচাই করুন।"
					href="/admin/payments/pending"
				/>
				<QuickLink
					title="সেটিংস ও কনফিগ"
					description="ঘোষণা, বোনাস, রেট ইত্যাদি কনফিগ করুন।"
					href="/admin/settings"
				/>
			</div>

			{/* Notice Area */}
			<div className="bg-red-50 border border-red-200 text-red-800 mt-12 mx-6 rounded-lg p-6">
				<h3 className="text-lg font-bold mb-1">⚠️ গুরুত্বপূর্ণ বিজ্ঞপ্তি:</h3>
				<p>
					যেকোনো পেমেন্ট Approve করার আগে নিশ্চিত হয়ে নিন ইউজারের
					কাজ/ভিডিও/অ্যাড সত্যিই কমপ্লিট হয়েছে কিনা।
				</p>
			</div>
		</div>
	);
};

const Card = ({
	title,
	value,
	color,
}: {
	title: string;
	value: any;
	color: string;
}) => (
	<div className={`p-6 rounded-xl shadow-lg text-white ${color}`}>
		<h2 className="text-lg font-semibold">{title}</h2>
		<p className="text-3xl font-bold mt-2">{value}</p>
	</div>
);

const QuickLink = ({
	title,
	description,
	href,
}: {
	title: string;
	description: string;
	href: string;
}) => (
	<Link
		href={href}
		className="bg-white border hover:shadow-lg transition p-6 rounded-lg shadow text-gray-800">
		<h3 className="text-xl font-semibold mb-1">{title}</h3>
		<p className="text-sm text-gray-500">{description}</p>
	</Link>
);

export default AdminDashboard;
