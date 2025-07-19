import { X } from "lucide-react";
import React from "react";

function SmokingCondition({ isOpen, onClose, member }) {
	if (!isOpen || !member) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-svh max-h-[90vh] p-6 relative overflow-y-auto">
				{/* Close Button */}
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>

				<h2 className="text-xl font-semibold mb-4">Smoking Condition</h2>
				{console.log(member)}
				<div className="grid grid-cols-1 gap-4 text-sm">
					<div>
						<span className="font-semibold text-gray-700">Member name:</span> <span className="text-gray-900">{member.userName}</span>
					</div>
					<div>
						<span className="font-semibold text-gray-700">Usual Smoking Time:</span> <span className="text-gray-900">{member.smokingCondition?.timePeriod}</span>
					</div>
					<div>
						<span className="font-semibold text-gray-700">Amount of Cigarettes per Day:</span> <span className="text-gray-900">{member.smokingCondition?.amountPerDay}</span>
					</div>
					<div>
						<span className="font-semibold text-gray-700">Price per Pack:</span> <span className="text-gray-900">{member.smokingCondition?.pricePerPack}</span>
					</div>
					<div>
						<span className="font-semibold text-gray-700">Frequency:</span> <span className="text-gray-900">{member.smokingCondition?.frequency}</span>
					</div>
					<div>
						<span className="font-semibold text-gray-700">Smoking When:</span>
						<p className="mt-1 text-gray-900 whitespace-pre-wrap">{member.smokingCondition?.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SmokingCondition;
