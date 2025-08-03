"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { baseApi } from "@/lib/baseApi";

interface Setting {
	_id: string;
	siteName: string;
	siteUrl: string;
	supportPhone: string;
	supportEmail: string;
	maintenanceMode: boolean;
	announcement: string;
	referralBonus: number;
}

interface SettingContextType {
	setting: Setting | null;
	setSetting?: any;
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
				const res = await baseApi("/settings");
				if (res?.setting) {
					setSetting(res.setting);
				}
			} catch {
				setSetting(null);
			} finally {
				setLoading(false);
			}
		};

		fetchSetting();
	}, []);

	return (
		<SettingContext.Provider value={{ setSetting, setting, loading }}>
			{children}
		</SettingContext.Provider>
	);
};

export const useSetting = () => useContext(SettingContext);
