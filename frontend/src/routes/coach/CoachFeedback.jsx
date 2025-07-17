import React, { useEffect, useState } from "react";
import CoachSidebar from "../../components/CoachSidebar";
import CoachTopbar from "../../components/CoachTopbar";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import { getFeedbacks } from "../../api/Feedback";

function CoachFeedback() {
	const [feedbacks, setFeedbacks] = useState([
		{
			id: 1,
			userName: "Jane Doe",
			avatar: "https://example.com",
			date: "12:31 PM, 23 Jun, 2025",
			comment: "Love the way this picture turned out. Drills were beautiful.",
			rating: 4,
		},
		{
			id: 2,
			userName: "John Doe",
			avatar: "https://example.com",
			date: "12:31 PM, 23 Jun, 2025",
			comment: "Love the way this picture turned out. Drills were beautiful.",
			rating: 3,
		},
	]);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const data = await getFeedbacks();
				setFeedbacks(data);
			} catch (error) {
				console.error(error);
				toast.error(error?.response?.data?.message || error.message || "Failed to load feedbacks.");
			}
		};

		fetchFeedbacks();
	}, []);

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
								{feedbacks.map((f) => (
									<tr key={f.id} className="border-t hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="flex items-start gap-3">
												<img src={f.avatar} alt={f.userName} className="w-10 h-10 rounded-full object-cover" />
												<div>
													<div className="font-medium text-gray-900">{f.userName}</div>
													<div className="text-xs text-gray-400">{f.date}</div>
													<div className="text-gray-700 mt-1">{f.comment}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1">
												<span className="font-bold text-gray-700">{f.rating}</span>
												<div className="flex">
													{[1, 2, 3, 4, 5].map((i) => (
														<Star key={i} className={`w-4 h-4 ${i <= Math.round(f.rating) ? "text-yellow-400" : "text-gray-300"}`} fill={i <= Math.round(f.rating) ? "currentColor" : "none"} />
													))}
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<button className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition">View Plan</button>
										</td>
										<td className="px-6 py-4 text-right">
											<button className="text-gray-500 hover:text-gray-700">⋯</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CoachFeedback;
