import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDailyProgress } from "../api/Progress";

function DailyReport({ isOpen, onClose, member }) {
	const [reports, setReports] = useState([]);

	const fetchDaily = async (userId) => {
		try {
			const data = await getDailyProgress(userId, "");
			//some filtering if needed
			//...
			setReports(data);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load daily report.");
		}
	};

	useEffect(() => {
		if (isOpen && member) {
			fetchDaily(member.userId);
		}
	}, [isOpen, member]);

	// Check today's daily report
	const hasTodayReport = reports.some((r) => {
		const today = new Date();
		const reportDate = new Date(r.date);
		return reportDate.getFullYear() === today.getFullYear() && reportDate.getMonth() === today.getMonth() && reportDate.getDate() === today.getDate();
	});

	//Format date
	const formatDate = (isoDateString) => {
		if (!isoDateString) return "";
		const date = new Date(isoDateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	if (!isOpen || !member) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] p-6 relative overflow-y-auto">
				{/* Close Button */}
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">{member.userName}'s Daily Report:</h2>
				{console.log(member)}
				{!hasTodayReport && <div className="text-red-500 font-medium mb-4">Member haven't sent today's report</div>}

				{reports.length === 0 ? (
					<p className="text-gray-500">No reports found.</p>
				) : (
					<div className="grid grid-cols-1 gap-4">
						{reports.map((report, index) => (
							<div key={index} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
								<p className="text-sm text-gray-500 mb-1">Date: {formatDate(report.date)}</p>
								<p className="text-gray-700">
									<span className="font-semibold">No Smoking:</span> {report.no_Smoking ? <span className="text-green-600 font-medium">Yes ✅</span> : <span className="text-red-600 font-medium">No ❌</span>}
								</p>
								<p className="text-gray-700">
									<span className="font-semibold">Symptoms:</span> {report.symptoms}
								</p>
								<p className="text-gray-700">
									<span className="font-semibold">Note:</span> {report.note}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default DailyReport;
