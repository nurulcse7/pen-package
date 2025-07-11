"use client";

import Spinner from "@/components/Shared/Spinner/Spinner";
import { useUser } from "@/context/UserContext";
import { useSetting } from "@/context/SettingContext";

const Dashboard = () => {
	const { user, loading } = useUser();
	const { setting, loading: settingLoading } = useSetting();

	if (loading || settingLoading || !user?.email || !user?.role) {
		return <Spinner />;
	}

	return (
		<div>
			{/* Page Header */}
			<div className="pb-[40px] pl-[40px]">
				<h1 className="text-2xl text-gray-600">Dashboard</h1>
				<p className="text-gray-500 font-normal text-md">
					Dashboard <span className="px-[10px]">/</span> Dashboard
				</p>
			</div>

			{/* Welcome Section */}
			<div className="text-center bg-gradient-to-r from-[#667eea] to-[#764ba2] py-20 rounded-b-2xl text-white">
				<h1 className="text-4xl font-bold">Welcome, {user?.fullName}</h1>
				<p className="text-gray-200 text-xl pt-[20px]">
					Manage your account, transactions, and services efficiently
				</p>
			</div>

			{/* 🛎️ Announcement Section */}
			{setting?.announcement && (
				<div className="bg-yellow-100 border border-yellow-300 rounded p-4 mt-6 mx-6 text-yellow-800">
					<h3 className="text-lg font-semibold mb-1">📢 ঘোষণা:</h3>
					<p>{setting.announcement}</p>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
