import React, { useEffect, useState } from "react";
import CoachSidebar from "../../components/CoachSidebar";
import CoachTopbar from "../../components/CoachTopbar";
import { Star, User2Icon } from "lucide-react";
import { toast } from "react-toastify";
import { getFeedbacks } from "../../api/Feedback";
import { getCoachId } from "../../api/Coach";
import { getCoachMember } from "../../api/Users";
import ViewPlan from "../../components/ViewPlan";
import { getPlanByPlanId } from "../../api/Plan";

function CoachFeedback() {
	const userId = localStorage.getItem("userId");
	const [coachId, setCoachId] = useState(null);
	const [members, setMembers] = useState([]);
	const [feedbacks, setFeedbacks] = useState([
		// {
		// 	id: 1,
		// 	userName: "Jane Doe",
		// 	avatar: "https://example.com",
		// 	date: "12:31 PM, 23 Jun, 2025",
		// 	comment: "Love the way this picture turned out. Drills were beautiful.",
		// 	rating: 4,
		// },
		// {
		// 	id: 2,
		// 	userName: "John Doe",
		// 	avatar: "https://example.com",
		// 	date: "12:31 PM, 23 Jun, 2025",
		// 	comment: "Love the way this picture turned out. Drills were beautiful.",
		// 	rating: 3,
		// },
	]);

	// Get coachId
	useEffect(() => {
		if (userId) {
			const fetchCoachId = async () => {
				try {
					const data = await getCoachId(userId);
					// console.log(data);
					setCoachId(data.coachId);
				} catch (error) {
					console.error(error);
					toast.error(error?.response?.data?.message || error.message || "Failed to get coachId");
				}
			};

			fetchCoachId();
		}
	}, [userId]);

	// Get member list
	useEffect(() => {
		if (coachId) {
			fetchMembers(coachId);
		}
	}, [coachId]);

	const fetchMembers = async (cid = coachId) => {
		try {
			const data = await getCoachMember(cid);
			const filtered = data.filter((user) => user.roleId !== 3);
			setMembers(filtered);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load members.");
		}
	};

	// Get coach feedback
	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const data = await getFeedbacks();
				// console.log("Return data: ", data);
				// setFeedbacks(data);
				// Only get feedback which have the similar coachId
				const filtered = data.filter((feedback) => feedback.coachId !== coachId);
				// console.log("Filtered data: ", filtered);
				setFeedbacks(filtered);
			} catch (error) {
				console.error(error);
				toast.error(error?.response?.data?.message || error.message || "Failed to load feedbacks.");
			}
		};

		fetchFeedbacks();
	}, []);

	// For popup modal
	const [isViewOpen, setIsViewOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

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
		<div className="flex">
			<CoachSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<CoachTopbar title={"Members' Feedback"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{/* {console.log("CoachID: ", coachId)}
					{console.log("Coach feedback: ", feedbacks)}
					{console.log("Members: ", members)} */}

					{/* Feedback table */}
					<div className="bg-white rounded-xl shadow overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead className="bg-green-100 text-gray-600">
								<tr>
									<th className="text-left px-6 py-3">Review</th>
									<th className="text-left px-6 py-3">Rating</th>
									<th className="text-left px-6 py-3">View Plan</th>
									<th className="text-right px-6 py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{feedbacks.map((feedback) => (
									<tr key={feedback.feedbackId} className="border-t hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="flex items-start gap-3">
												<User2Icon className="w-10 h-10 rounded-full object-cover" />
												<div>
													<div className="font-medium text-gray-900"> {members.find((m) => m.userId === feedback.userId)?.userName || "Unknown User"}</div>
													<div className="text-xs text-gray-400">{formatDate(feedback.timeCreated)}</div>
													<div className="text-gray-700 mt-1">{feedback.content}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1">
												<span className="font-bold text-gray-700">{feedback.rating}</span>
												<div className="flex">
													{[1, 2, 3, 4, 5].map((i) => (
														<Star key={i} className={`w-4 h-4 ${i <= Math.round(feedback.rating) ? "text-yellow-400" : "text-gray-300"}`} fill={i <= Math.round(feedback.rating) ? "currentColor" : "none"} />
													))}
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<button
												className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition"
												onClick={async () => {
													setIsViewOpen(true);
													try {
														const rawPlan = await getPlanByPlanId(feedback.planId);
														if (!rawPlan) throw new Error("No plan found");
														const plan = {
															...rawPlan,
															goalDate: rawPlan.goal_Date,
															startDate: rawPlan.start_Date,
															// optionally delete the snake_case ones if needed
														};
														console.log("Plan data: ", plan);
														setSelectedItem(plan);
													} catch (error) {
														console.error(error);
														toast.error("Failed to load plan");
														setIsViewOpen(false);
													}
												}}>
												View Plan
											</button>
										</td>
										<td className="px-6 py-4 text-right">
											<button className="text-gray-500 hover:text-gray-700">⋯</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Plan view modal */}
					{isViewOpen && selectedItem && (
						<ViewPlan
							isOpen={isViewOpen}
							onClose={() => {
								setIsViewOpen(false);
								setSelectedItem(null);
							}}
							plan={selectedItem}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default CoachFeedback;
