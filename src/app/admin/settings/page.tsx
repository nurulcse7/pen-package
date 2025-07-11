"use client";

import { useSetting } from "@/context/SettingContext";
import { baseApi } from "@/lib/baseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Settings = {
	_id: string;
	siteName: string;
	supportPhone: string;
	supportEmail: string;
	paymentInstructions: string;
	serviceCharge: number;
	paymentNumber: string;
	isPaymentEnabled: boolean;
	maintenanceMode: boolean;
	announcement: string;
};

export default function AdminSettingsPage() {
	const { setting, loading } = useSetting();
	const [settings, setSettings] = useState<Settings>({
		_id: "",
		siteName: "",
		supportPhone: "",
		supportEmail: "",
		paymentInstructions: "",
		serviceCharge: 60,
		paymentNumber: "",
		isPaymentEnabled: true,
		maintenanceMode: false,
		announcement: "",
	});

	// ⏬ Load current settings
	useEffect(() => {
		if (setting) {
			setSettings(setting);
		}
	}, [setting]);

	const handleChange = (field: keyof Settings, value: any) => {
		setSettings(prev => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			const res = await baseApi(`/setting/${settings._id}`, {
				method: "PUT",
				body: settings,
			});
			if (!res.success) throw new Error("Failed to save settings");
			toast.success("সেটিংস সফলভাবে সংরক্ষিত হয়েছে");
		} catch (err:any) {
			toast.error(err?.message||"সেটিংস সংরক্ষণ করতে ব্যর্থ");
		}
	};

	if (loading) return <p className="text-center mt-10">লোড হচ্ছে...</p>;

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
			<h2 className="text-2xl font-bold mb-6">সেটিংস</h2>

			<div className="space-y-4">
				<Input
					label="সাইট নাম"
					value={settings.siteName}
					onChange={val => handleChange("siteName", val)}
				/>
				<Input
					label="সাপোর্ট নম্বর"
					value={settings.supportPhone}
					onChange={val => handleChange("supportPhone", val)}
				/>
				<Input
					label="সাপোর্ট ইমেইল"
					value={settings.supportEmail}
					onChange={val => handleChange("supportEmail", val)}
				/>
				<TextArea
					label="পেমেন্ট নির্দেশনা"
					value={settings.paymentInstructions}
					onChange={val => handleChange("paymentInstructions", val)}
				/>
				<Input
					label="পেমেন্ট নাম্বার"
					value={settings.paymentNumber}
					onChange={val => handleChange("paymentNumber", val)}
				/>
				<Input
					label="সার্ভিস চার্জ (৳)"
					type="number"
					value={settings.serviceCharge}
					onChange={val => handleChange("serviceCharge", Number(val))}
				/>
				<TextArea
					label="ঘোষণা (announcement)"
					value={settings.announcement}
					onChange={val => handleChange("announcement", val)}
				/>
				<Checkbox
					label="পেমেন্ট চালু আছে?"
					checked={settings.isPaymentEnabled}
					onChange={val => handleChange("isPaymentEnabled", val)}
				/>
				<Checkbox
					label="মেইনটেনেন্স মোড?"
					checked={settings.maintenanceMode}
					onChange={val => handleChange("maintenanceMode", val)}
				/>
			</div>

			<button
				onClick={handleSave}
				className="mt-6 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
				Save Settings
			</button>
		</div>
	);
}

// Reusable Input Component
const Input = ({
	label,
	value,
	onChange,
	type = "text",
}: {
	label: string;
	value: any;
	onChange: (val: any) => void;
	type?: string;
}) => (
	<div>
		<label className="block mb-1 font-medium text-gray-700">{label}</label>
		<input
			type={type}
			value={value}
			onChange={e => onChange(e.target.value)}
			className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-pink-200"
		/>
	</div>
);

// Reusable TextArea Component
const TextArea = ({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (val: string) => void;
}) => (
	<div>
		<label className="block mb-1 font-medium text-gray-700">{label}</label>
		<textarea
			rows={3}
			value={value}
			onChange={e => onChange(e.target.value)}
			className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-pink-200"
		/>
	</div>
);

// Reusable Checkbox
const Checkbox = ({
	label,
	checked,
	onChange,
}: {
	label: string;
	checked: boolean;
	onChange: (val: boolean) => void;
}) => (
	<div className="flex items-center space-x-2">
		<input
			type="checkbox"
			checked={checked}
			onChange={e => onChange(e.target.checked)}
			className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
		/>
		<label className="text-sm text-gray-700">{label}</label>
	</div>
);
