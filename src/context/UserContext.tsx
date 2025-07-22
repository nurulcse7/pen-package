"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { baseApi } from "@/lib/baseApi";

interface User {
	_id: string;
	fullName: string;
	email: string;
	role: string;
	amount?: number;
	phone?: number;
	gender?: string;
}

interface UserContextType {
	user: User | null;
	loading: boolean;
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
				const user = await baseApi("/auth/me");
				setUser(user);
			} catch (error) {
				console.error("User fetch failed:", error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
