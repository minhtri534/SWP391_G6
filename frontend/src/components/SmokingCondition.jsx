import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getSmokingStatus } from "../api/SmokingStatus";
import { toast } from "react-toastify";

function SmokingCondition({ isOpen, onClose, member }) {
	const [smokingConditions, setSmokingConditions] = useState([]);

	useEffect(() => {
		if (member?.userId) {
			// function to get member smoking conditions
			const fetchCondition = async () => {
				try {
					const data = await getSmokingStatus(member.userId);
					setSmokingConditions(data);
				} catch (error) {
					console.error(error);
					toast.error(error?.response?.data?.message || error.message || "Failed to load member smoking condition.");
				}
			};
			fetchCondition();
		}
	}, [isOpen, member]);

	if (!isOpen || !member) return null;

	// Prevent API returning nothing
	const notFound = !smokingConditions || Object.keys(smokingConditions).length === 0;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] p-6 relative overflow-y-auto">
				{/* Close Button */}
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>

				<h2 className="text-xl font-semibold mb-4">Smoking Condition</h2>
				{console.log(member)}
				{console.log(smokingConditions)}
				{notFound ? (
					<p className="text-red-600 font-medium">Member {member.userName}'s smoking condition is not found!</p>
				) : (
					<div className="grid grid-cols-1 gap-4 text-sm">
						<div>
							<span className="font-semibold text-gray-700">Member name:</span> <span className="text-gray-900">{member.userName}</span>
						</div>
						<div>
							<span className="font-semibold text-gray-700">Usual Smoking Time:</span> <span className="text-gray-900">{smokingConditions.timePeriod}</span>
						</div>
						<div>
							<span className="font-semibold text-gray-700">Amount of Cigarettes per Day:</span> <span className="text-gray-900">{smokingConditions.amountPerDay}</span>
						</div>
						<div>
							<span className="font-semibold text-gray-700">Price per Pack:</span> <span className="text-gray-900">{smokingConditions.pricePerPack}</span>
						</div>
						<div>
							<span className="font-semibold text-gray-700">Frequency:</span> <span className="text-gray-900">{smokingConditions.frequency}</span>
						</div>
						<div>
							<span className="font-semibold text-gray-700">Smoking When:</span>
							<p className="mt-1 text-gray-900 whitespace-pre-wrap">{smokingConditions.description}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default SmokingCondition;
