import ProfileSettingsForm from "@/components/User/ProfileSettingsForm";

const AdminProfile = () => {
  return (
			<div className="px-[20px] h-full overflow-y-auto">
				<div className="pb-[20px]">
					<h1 className="text-2xl text-gray-600">Admin Profile</h1>
					<p className="text-gray-500 font-normal text-md">
						Admin <span className="px-[10px]">/</span>Admin Profile
					</p>
				</div>
				<ProfileSettingsForm />
		</div>
	);
}

export default AdminProfile
