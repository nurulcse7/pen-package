"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseApi } from "@/lib/baseApi";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
	id: string;
	exp: number;
}

export default function VerifyEmailPage({ params }: any) {
	const router = useRouter();
	const [statusMessage, setStatusMessage] = useState<string>("Verifying...");
	const [timeLeft, setTimeLeft] = useState<number | null>(null);
	const [redirectCountdown, setRedirectCountdown] = useState<number>(5);

	useEffect(() => {
		const verify = async () => {
			try {
				const res = await baseApi(`/auth/verify-email/${params.token}`, {
					method: "POST",
				});

				if (res.success) {
					setStatusMessage(res.message || "Email verified successfully!");
				} else {
					setStatusMessage(res.message || "Verification failed.");
				}

				// Decode token to get expiry
				const decoded: TokenPayload = jwtDecode(params.token);
				const now = Math.floor(Date.now() / 1000);
				const remaining = decoded.exp - now;
				setTimeLeft(remaining > 0 ? remaining : 0);
			} catch (err: any) {
				setStatusMessage(
					err?.message || "Verification failed. Invalid or expired link."
				);
				setTimeLeft(0);
			}
		};

		verify();
	}, [params.token]);

	// Countdown for token expiry
	useEffect(() => {
		if (timeLeft === null || timeLeft <= 0) return;
		const interval = setInterval(() => {
			setTimeLeft(prev => (prev && prev > 0 ? prev - 1 : 0));
		}, 1000);
		return () => clearInterval(interval);
	}, [timeLeft]);

	// Redirect countdown
	useEffect(() => {
		if (redirectCountdown <= 0) {
			router.push("/login?verified=true");
			return;
		}
		const interval = setInterval(() => {
			setRedirectCountdown(prev => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [redirectCountdown, router]);

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="bg-white p-8 rounded shadow-md text-center max-w-md">
				<h2 className="text-2xl font-bold mb-4">Email Verification</h2>
				<p className="mb-4">{statusMessage}</p>

				{timeLeft !== null && timeLeft > 0 && (
					<p className="text-red-500 mb-2">
						Verification link will expire in: {formatTime(timeLeft)}
					</p>
				)}

				{timeLeft === 0 && (
					<p className="text-red-500 mb-2">
						Your verification link has expired.
					</p>
				)}

				<p className="text-blue-500">
					Redirecting to login in {redirectCountdown} seconds...
				</p>
			</div>
		</div>
	);
}
