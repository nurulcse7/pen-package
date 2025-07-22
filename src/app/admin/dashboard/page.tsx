"use client";

import Spinner from "@/components/Shared/Spinner/Spinner";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
	const { user, loading } = useUser();

	if (loading || !user?.email || !user?.role) {
		return <Spinner />;
	}
	return (
		<div>
			<div className="pb-[40px] pl-[40px]">
				<h1 className="text-2xl text-gray-600">Dashboard</h1>
				<p className="text-gray-500 font-normal text-md">
					{user?.role} <span className="px-[10px]">/</span> Dashboard
				</p>
			</div>

			<div className="text-center bg-gradient-to-r from-[#667eea] to-[#764ba2]  py-20 rounded-b-2xl text-white">
				<h1 className="text-4xl font-bold">Welcome, {user?.fullName}</h1>
				<p className="text-gray-200 text-xl pt-[20px]">
					Manage your account, transactions, and services efficiently
				</p>
			</div>

			{/* System Notice */}
			<div className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded p-4 mx-6 mt-6">
				⚠️ দয়া করে প্রতিটি পেমেন্ট যাচাই করে Accept করুন।
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 px-6">
				{/* You will replace hardcoded numbers with dynamic counts */}
				<div className="bg-white shadow-md rounded-lg p-6 text-center">
					<h3 className="text-xl font-bold text-gray-700">মোট ইউজার</h3>
					<p className="text-3xl text-blue-500 mt-2">134</p>
				</div>

				<div className="bg-white shadow-md rounded-lg p-6 text-center">
					<h3 className="text-xl font-bold text-gray-700">পেন্ডিং পেমেন্ট</h3>
					<p className="text-3xl text-pink-500 mt-2">12</p>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
