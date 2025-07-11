"use client"
import LandInfo from "@/components/User/LandInfo";

const page = () => {
	return (
		<div className="md:px-[30px] px-2 h-screen overflow-y-auto">
			<div className="pb-[20px]">
				<h1 className="text-2xl text-gray-600">Land Certificates </h1>
				<p className="text-gray-500 font-normal text-md">
					Dashboard <span className="px-[10px]">/</span> Land Certificates
				</p>
			</div>
			<LandInfo />
		</div>
	);
};

export default page;
