import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getUserBadge } from "../api/Badges";
import { toast } from "react-toastify";

function MemberAchievements({ isOpen, onClose, member }) {
	const [achievements, setAchievements] = useState([]);

	useEffect(() => {
		if (member?.userId) {
			// function to get member smoking conditions
			const fetchAchieve = async () => {
				try {
					const data = await getUserBadge(member.userId);
					setAchievements(data);
				} catch (error) {
					console.error(error);
					toast.error(error?.response?.data?.message || error.message || "Failed to load member achievements.");
				}
			};
			fetchAchieve();
		}
	}, [isOpen, member]);

	if (!isOpen || !member) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] p-6 relative overflow-y-auto">
				{/* Close Button */}
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>

				<h2 className="text-xl font-semibold mb-4">{member.userName}'s Achievements:</h2>
				{console.log(achievements)}
				{achievements.length === 0 ? (
					<p className="text-red-600 font-medium">Member doesn't have any badge yet.</p>
				) : (
					<div className="space-y-4">
						{achievements.map((achieve, idx) => (
							<div key={idx} className="border-b pb-3">
								<div className="inline-block bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-medium">{achieve.badgeName}</div>
								<div className="text-xs text-gray-500 mt-1">Awarded on {new Date(achieve.date_Awarded).toLocaleDateString()}</div>
								<div className="mt-1 text-gray-700 text-sm">{achieve.description}</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default MemberAchievements;
