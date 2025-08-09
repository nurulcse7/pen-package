import { useSetting } from "@/context/SettingContext";

const InActivePage = () => {
	const { setting } = useSetting();

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
			<div className="bg-white rounded-xl shadow-lg p-10 max-w-md text-center">
				{/* Warning / info icon */}
				<div className="mx-auto mb-6 flex justify-center items-center w-20 h-20 rounded-full bg-red-100 text-red-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-10 h-10"
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

				<h1 className="text-2xl font-bold mb-4 text-gray-800">
					আপনার অ্যাকাউন্ট বর্তমানে নিষ্ক্রিয় (Inactive)
				</h1>

				<p className="text-gray-600 mb-6">
					দুঃখিত, আপনার অ্যাকাউন্ট এখনকার জন্য নিষ্ক্রিয় আছে। অনুগ্রহ করে
					সাপোর্ট টিমের সাথে যোগাযোগ করুন বা আপনার অ্যাকাউন্ট স্ট্যাটাস আপডেট
					করুন।
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

export default InActivePage;
