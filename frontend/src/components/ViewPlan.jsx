import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getMilestoneByPlanId } from "../api/Milestone";
import { toast } from "react-toastify";

function ViewPlan({ isOpen, onClose, plan }) {
	const [planMilestone, setPlanMilestone] = useState(plan);
	if (!isOpen || !plan) return null;

	useEffect(() => {
		if (isOpen && plan?.planId) {
			fetchMilestones(plan.planId);
		}
	}, [isOpen, plan?.planId]);

	// If there is a quitPlan in the init value, run the fetchMilestone
	const fetchMilestones = async (planId) => {
		try {
			const data = await getMilestoneByPlanId(planId);
			setPlanMilestone((prev) => ({
				...prev,
				milestones: data,
			}));
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load plan milestone.");
		}
	};

	//Format date
	const formatDate = (isoDateString) => {
		if (!isoDateString) return "";
		const date = new Date(isoDateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-svh max-h-[90vh] p-6 relative overflow-y-auto">
				{/* Close Button */}
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>

				<h2 className="text-xl font-semibold mb-4">View Plan</h2>

				{console.log("Init plan: ", planMilestone)}

				{/* Plan Details */}
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-5 space-y-4">
						<div>
							<label className="block text-sm font-medium mb-1">Reason</label>
							<textarea className="w-full border rounded p-2 bg-gray-100" value={planMilestone.reason} readOnly />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-1">Start Date</label>
								<input className="w-full border rounded p-2 bg-gray-100" value={formatDate(planMilestone.startDate)} readOnly />
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Goal Date</label>
								<input className="w-full border rounded p-2 bg-gray-100" value={formatDate(planMilestone.goalDate)} readOnly />
							</div>
						</div>
					</div>

					<div className="col-span-1 flex justify-center">
						<div className="h-full w-px bg-gray-300" />
					</div>

					{/* Milestones */}
					<div className="col-span-6 space-y-4 max-h-[60vh] overflow-y-auto">
						<h3 className="font-semibold text-lg">Milestones</h3>
						{!planMilestone.milestones?.length && <p className="text-gray-500 text-sm">No milestones added.</p>}

						{planMilestone.milestones?.map((milestone, index) => (
							<div key={index} className="border rounded p-4 bg-gray-50">
								<div className="mb-2">
									<strong>{milestone.title || "Untitled"}</strong>
									<div className="text-sm text-gray-500">{milestone.badge}</div>
								</div>
								<p className="text-sm mb-1">
									<strong>Description:</strong> {milestone.description}
								</p>
								<p className="text-sm">
									<strong>Target Date:</strong> {formatDate(milestone.targetDate)}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewPlan;
