"use client";

import RechargeHistory from "@/components/User/RechargeHistory";

const Page = () => {
	return (
		<div className="px-10 ">
			<div className="pb-[40px] ">
				<h1 className="text-2xl text-gray-600">Recharge </h1>
				<p className="text-gray-500 font-normal text-md">
					Dashboard <span className="px-[10px]">/</span> Recharge
				</p>
			</div>

			<RechargeHistory />
		</div>
	);
};

export default Page;
