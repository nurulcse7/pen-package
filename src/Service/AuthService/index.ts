"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
	const token = (await cookies()).get("token")?.value;
	let decodedData = null;

	if (token) {
		decodedData = await jwtDecode(token);
		return decodedData;
	} else {
		return null;
	}
};
