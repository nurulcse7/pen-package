import LandForm from "@/components/User/LandForm";

const page = () => {
	return (
		<div className="md:px-[20px] px-3 h-full overflow-y-auto">
			<div className="pb-[20px]">
				<h1 className="text-2xl text-gray-600">Create Land Certificates</h1>
				<p className="text-gray-500 font-normal text-md">
					Dashboard <span className="px-[10px]">/</span> Create Land
					Certificates
				</p>
			</div>
			<LandForm />
		</div>
	);
};

export default page;
