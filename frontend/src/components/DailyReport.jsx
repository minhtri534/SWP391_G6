import { X } from "lucide-react";
import React from "react";

function DailyReport({ isOpen, onClose, member }) {
	if (!isOpen || !member) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-svh max-h-[90vh] p-6 relative overflow-y-auto">
				{/* Close Button */}
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">{member.userName}'s Daily Report:</h2>
				{console.log(member)}
			</div>
		</div>
	);
}

export default DailyReport;
