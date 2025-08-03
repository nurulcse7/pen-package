"use client";

import { useEffect, useState } from "react";
import { baseApi } from "@/lib/baseApi";
import { toast } from "sonner";
import { useSetting } from "@/context/SettingContext";

type GeneralSetting = {
	siteName: string;
	siteUrl: string;
	supportPhone: string;
	supportEmail: string;
	announcement: string;
	maintenanceMode?: boolean;
	referralBonus: number;
};

export default function GeneralSettings() {
	const { setSetting, setting, loading } = useSetting();
	const [settings, setSettings] = useState<GeneralSetting>({
		siteName: "",
		siteUrl: "",
		supportPhone: "",
		supportEmail: "",
		announcement: "",
		maintenanceMode: false,
		referralBonus: 0,
	});

	useEffect(() => {
		if (setting) {
			setSettings({
				...setting,
				referralBonus: Number(setting.referralBonus),
			});
		}
	}, [setting]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setSettings(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		try {
			const res = await baseApi("/settings/general", {
				method: "PUT",
				body: settings,
			});
			if (!res.success) throw new Error();
			setSetting(settings);
			toast.success("সেটিংস আপডেট সফল হয়েছে");
		} catch (err) {
			toast.error("সেটিংস আপডেট ব্যর্থ হয়েছে");
		}
	};
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setSettings(prev => ({
			...prev,
			[name]: checked,
		}));
	};

	if (loading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h2 className="text-2xl font-bold mb-6">🛠️ জেনারেল সেটিংস</h2>

			<div className="space-y-4">
				{[
					{ label: "সাইট নাম", name: "siteName" },
					{ label: "সাইট URL", name: "siteUrl" },
					{ label: "সাপোর্ট ফোন", name: "supportPhone" },
					{ label: "সাপোর্ট ইমেইল", name: "supportEmail" },
				].map(({ label, name }) => (
					<div key={name}>
						<label className="block font-medium mb-1">{label}</label>
						<input
							type="text"
							name={name}
							value={String(settings[name as keyof GeneralSetting] ?? "")}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded px-3 py-2"
						/>
					</div>
				))}

				<div>
					<label className="block font-medium mb-1">হোমপেজ নোটিশ</label>
					<textarea
						name="announcement"
						value={settings.announcement || ""}
						onChange={handleChange}
						rows={4}
						className="w-full border border-gray-300 rounded px-3 py-2"
					/>
				</div>
				{/* Maintenance Mode Checkbox */}
				<div className="flex items-center space-x-3">
					<input
						type="checkbox"
						id="maintenanceMode"
						name="maintenanceMode"
						checked={settings.maintenanceMode || false}
						onChange={handleCheckboxChange}
						className="h-5 w-5"
					/>
					<label htmlFor="maintenanceMode" className="font-medium">
						🔧
						{!settings?.maintenanceMode
							? "Maintenance Mode চালু করুন"
							: "Maintenance Mode বন্ধ করুন"}
					</label>
				</div>
				<h2 className="text-2xl font-bold mb-4 pt-5">🎁 বোনাস সেটিংস</h2>
				{[{ label: "রেফারেল বোনাস (৳)", name: "referralBonus" }].map(
					({ label, name }) => (
						<div key={name}>
							<label className="block font-medium mb-1">{label}</label>
							<input
								type="text"
								name={name}
								value={String(settings[name as keyof GeneralSetting] ?? "")}
								onChange={handleChange}
								className="w-full border border-gray-300 rounded px-3 py-2"
							/>
						</div>
					)
				)}
				<button
					onClick={handleSubmit}
					className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
					✅ সংরক্ষণ করুন
				</button>
			</div>
		</div>
	);
}
