interface JobTypeCardProps {
	title: string;
	description: string;
	icon: string; // emoji icon for simplicity; চাইলে React Icon ও ব্যবহার করতে পারো
}

const JobTypeCard = ({ title, description, icon }: JobTypeCardProps) => {
	return (
		<div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center">
			<div className="text-5xl mb-4">{icon}</div>
			<h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
			<p className="text-gray-600 text-sm">{description}</p>
		</div>
	);
};

export default JobTypeCard;
