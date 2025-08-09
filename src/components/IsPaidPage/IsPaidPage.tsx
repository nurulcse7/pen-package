import { useSetting } from "@/context/SettingContext";
import { toast } from "sonner";

const IsPaidPage = () => {
	const { setting } = useSetting();
	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-50 to-yellow-100 px-4">
			<div className="bg-white rounded-xl shadow-lg p-10 max-w-lg text-center">
				<div className="mx-auto mb-6 flex justify-center items-center w-20 h-20 rounded-full bg-red-100 text-red-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-12 h-12"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				<h1 className="text-3xl font-bold mb-4 text-gray-800">
					পরিষেবা ব্যবহারের জন্য পেমেন্ট করুন
				</h1>

				<p className="text-gray-700 mb-6">
					আপনার একাউন্ট এক্টিভেট করতে নিচের যেকোনো একটি নাম্বারে{" "}
					<strong>৳{setting?.paymentAmount}</strong> পাঠান:
				</p>

				<div className="mb-6 space-y-4 text-lg font-medium text-gray-900">
					{setting?.paymentMethods.map(({ name, number }) => (
						<div
							key={name}
							className="flex justify-between items-center border rounded-lg p-3 shadow-sm">
							<div>
								<p>
									<span className="font-semibold">{name}:</span> {number}
								</p>
								<p className="text-sm text-gray-600">
									পেমেন্ট পরিমাণ: {setting?.paymentAmount}
								</p>
							</div>
							<button
								onClick={() => {
									navigator.clipboard.writeText(number);
									toast.success(`${name} নাম্বার কপি করা হয়েছে: ${number}`);
								}}
								className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-3 py-1 rounded-md">
								নম্বর কপি করুন
							</button>
						</div>
					))}
				</div>

				<p className="text-gray-600 mb-6">
					পেমেন্ট সম্পন্ন হলে, আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন:
				</p>

				<a
					href={setting?.supportWhatsAppLink}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 mr-2"
						fill="currentColor"
						viewBox="0 0 24 24">
						<path d="M20.52 3.48a11.97 11.97 0 00-17 0c-4.7 4.7-4.7 12.3 0 17l1.9-1.9a9 9 0 0111.2 0l2.1 2.1a11.98 11.98 0 00.3-16.3zM13 14.8a1 1 0 01-1.45.9l-2.25-1.3a1 1 0 01-.3-1.4l.95-1.4a1 1 0 011.4-.3l1.9 1.1a1 1 0 01.7 1.4z" />
					</svg>
					WhatsApp এ যোগাযোগ করুন
				</a>
			</div>
		</div>
	);
};

export default IsPaidPage;
