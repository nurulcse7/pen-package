"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { baseApi } from "@/lib/baseApi";
interface User {
	_id: string;
	fullName: string;
	email: string;
	role: string;
	balance: number;
	phone: number;
	gender: string;
	referralId: any;
}

interface UserContextType {
	user: User | null;
	loading: boolean;
	setUser?: any;
}

const UserContext = createContext<UserContextType>({
	user: null,
	loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await baseApi("/auth/me");
				setUser(res);
			} catch (error: any) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
