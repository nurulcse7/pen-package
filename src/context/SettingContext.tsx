"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { baseApi } from "@/lib/baseApi";

interface Setting {
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
}

interface SettingContextType {
	setting: Setting | null;
	loading: boolean;
}

const SettingContext = createContext<SettingContextType>({
	setting: null,
	loading: true,
});

export const SettingProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [setting, setSetting] = useState<Setting | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSetting = async () => {
			try {
				const res = await baseApi("/setting");
				if (res?.setting) {
					setSetting(res.setting);
				}
			} catch (error) {
				console.error("Setting fetch failed:", error);
				setSetting(null);
			} finally {
				setLoading(false);
			}
		};

		fetchSetting();
	}, []);

	return (
		<SettingContext.Provider value={{ setting, loading }}>
			{children}
		</SettingContext.Provider>
	);
};

export const useSetting = () => useContext(SettingContext);
