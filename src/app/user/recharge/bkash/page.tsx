"use client";

import PaymentForm from "@/components/User/PaymentForm";

const Bkash = () => {
	return (
		<div className="md:px-8 px-3 mb-[100px] h-full overflow-y-auto">
			<div className="  ">
				<h1 className="text-2xl text-gray-600">Recharge via bkash </h1>
				<p className="text-gray-500 font-normal text-md">
					Dashboard <span className="px-[10px]">/</span> Recharge via bkash
				</p>
			</div>
			<PaymentForm />
		</div>
	);
};

export default Bkash;
