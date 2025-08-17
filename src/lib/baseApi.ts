const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions {
	method?: RequestMethod;
	headers?: Record<string, string>;
	body?: any;
	token?: string;
}

export const baseApi = async <T = any>(
	endpoint: string,
	options: ApiOptions = {}
): Promise<T> => {
	const { method = "GET", headers = {}, body, token } = options;

	const res = await fetch(`${BASE_URL}${endpoint}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `${token}` }),
			...headers,
		},
		...(body && { body: JSON.stringify(body) }),
		cache: "no-store",
		credentials: "include",
	});

	if (!res.ok) {
		const error = await res.json();
		throw error;
	}

	return res.json();
};
