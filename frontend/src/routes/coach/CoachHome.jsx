import React, { useEffect, useState } from "react";
import CoachSidebar from "../../components/CoachSidebar";
import CoachTopbar from "../../components/CoachTopbar";
import { getCoachId } from "../../api/Coach";
import { toast } from "react-toastify";
import { getCoachMember } from "../../api/Users";
import { getFeedbacks } from "../../api/Feedback";
import { User2Icon } from "lucide-react";

function CoachHome() {
	const userId = localStorage.getItem("userId");
	const [coachId, setCoachId] = useState(null);
	const [members, setMembers] = useState([]);
	const [feedbacks, setFeedbacks] = useState([]);
	const [averageRating, setAverageRating] = useState(0);

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

	// Get average rating
	const calculateAverageRating = (feedbacks) => {
		if (!feedbacks.length) return 0;
		const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
		return (total / feedbacks.length).toFixed(1); // 1 decimal point
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
				setAverageRating(calculateAverageRating(filtered));
			} catch (error) {
				console.error(error);
				toast.error(error?.response?.data?.message || error.message || "Failed to load feedbacks.");
			}
		};

		fetchFeedbacks();
	}, []);

	//Format date
	const formatDate = (isoDateString) => {
		if (!isoDateString) return "";
		const date = new Date(isoDateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	// Get latest feedback
	const latestFeedback = feedbacks.slice().sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))[0];

	return (
		<div className="flex">
			<CoachSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<CoachTopbar title={"Dashboard"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{/* Stat card */}
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{/* Total members*/}
						<div className="bg-green-200 p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-2">Total Members</h2>
							<p className="text-3xl font-bold">{members.length}</p>
						</div>
						{/* Average rating */}
						<div className="bg-yellow-200 p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-2">Average Rating</h2>
							<p className="text-3xl font-bold">{averageRating}</p>
						</div>
						{/* Wages */}
						<div className="bg-gray-200 p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-2">Wages</h2>
							<p className="text-3xl font-bold">5.000.000 VND</p>
						</div>
					</div>
					{/* Latest feedback */}
					{latestFeedback ? (
						<div className="mt-8 bg-white p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-4">Latest Feedback</h2>
							<div className="flex items-start gap-3">
								<User2Icon className="w-10 h-10 text-green-600" />
								<div>
									<div className="font-medium text-gray-900">{members.find((m) => m.userId === latestFeedback.userId)?.userName || "Unknown User"}</div>
									<div className="text-xs text-gray-400">{formatDate(latestFeedback.timeCreated)}</div>
									<div className="text-gray-700 mt-1">{latestFeedback.content}</div>
								</div>
							</div>
						</div>
					) : (
						<p className="text-gray-600 mt-8">No feedback available yet.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default CoachHome;
