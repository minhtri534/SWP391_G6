import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import { SquareChartGantt, Star, Trash2, X } from "lucide-react";
import { deleteReport, getReport } from "../../api/Report";
import { toast } from "react-toastify";
import { getFeedbacks } from "../../api/Feedback";
import PreviewContent from "../../components/PreviewContent";
import DeleteConfirmation from "../../components/DeleteConfirmation";

function ManageReport() {
	const [activeTab, setActiveTab] = useState("reports");

	// Data
	const [reports, setReports] = useState([]);
	const [feedbacks, setFeedbacks] = useState([]);

	//Get reports function
	const fetchReports = async () => {
		try {
			const data = await getReport();
			//some filtering if needed
			//...
			setReports(data);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load reports.");
		}
	};

	//Get feedbacks function
	const fetchFeedbacks = async () => {
		try {
			const data = await getFeedbacks();
			//some filtering if needed
			//...
			setFeedbacks(data);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load feedbacks.");
		}
	};

	//Get report and feedback
	useEffect(() => {
		if (activeTab == "reports") {
			fetchReports();
		} else if (activeTab == "feedback") {
			fetchFeedbacks();
		}
	}, [activeTab]);

	//For reports filter and sort
	const [filterType, setFilterType] = useState("");
	const [sortOption, setSortOption] = useState("");

	const filteredReportList = reports.filter((report) => {
		if (filterType === "Post") {
			return report.postId !== null && report.commentId === null;
		}
		if (filterType === "Comment") {
			return report.commentId !== null && report.postId === null;
		}
		return true;
	});

	const sortedReportList = [...filteredReportList].sort((a, b) => {
		switch (sortOption) {
			case "dateAsc":
				return new Date(a.createDay) - new Date(b.createDay);
			case "dateDesc":
				return new Date(b.createDay) - new Date(a.createDay);
		}
	});

	//For feedbacks filter and sort

	//For popup modal
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
			<AdminSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<AdminTopbar title={"Report & Feedback"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{console.log(reports, feedbacks)}
					{/* TABS HEADER */}
					<div className="flex space-x-4 border-b border-gray-300 mt-4 px-6">
						<button
							className={`py-2 px-4 font-semibold ${activeTab === "reports" ? "border-b-4 border-green-600 text-green-700" : "text-gray-600 hover:text-green-700"}`}
							onClick={() => setActiveTab("reports")}>
							Reports
						</button>
						<button
							className={`py-2 px-4 font-semibold ${activeTab === "feedback" ? "border-b-4 border-green-600 text-green-700" : "text-gray-600 hover:text-green-700"}`}
							onClick={() => setActiveTab("feedback")}>
							Feedback
						</button>
					</div>

					{/* TAB CONTENT */}
					<div className="flex-1 overflow-y-auto p-6 space-y-6">
						{/* Report Section */}

						{activeTab === "reports" && (
							<div>
								{/* Report Filter and Sort */}
								<div className="bg-green-50 p-4 rounded-lg shadow flex flex-wrap gap-4">
									<select className="border rounded px-3 py-2 w-40" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
										<option value="">All reports</option>
										<option value="Post">Reported Post</option>
										<option value="Comment">Reported Comment</option>
									</select>

									<select className="border rounded px-3 py-2 w-40" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
										<option value="">Sort by</option>
										<option value="dateDesc">Newest report</option>
										<option value="dateAsc">Old report</option>
									</select>
								</div>

								{/* Report Table */}
								<div className="bg-white rounded-xl shadow overflow-x-auto">
									<table className="min-w-full text-sm">
										<thead className="bg-green-100 text-gray-600">
											<tr>
												<th className="text-left px-6 py-3">Id</th>
												<th className="text-left px-6 py-3">Reported Item</th>
												<th className="text-left px-6 py-3">Reason</th>
												<th className="text-left px-6 py-3">Report by</th>
												<th className="text-left px-6 py-3">Date</th>
												<th className="text-right px-6 py-3">Action</th>
											</tr>
										</thead>
										<tbody>
											{reports.length === 0 ? (
												<tr>
													<td colSpan="6" className="text-center text-lg px-6 py-4 text-red-500">
														No report retrieved. Check your network or database.
													</td>
												</tr>
											) : sortedReportList.length === 0 ? (
												<tr>
													<td colSpan="6" className="text-center text-lg px-6 py-4 text-red-500">
														No report found.
													</td>
												</tr>
											) : (
												sortedReportList.map((report) => (
													<tr key={report.reportId} className="border-t hover:bg-gray-50">
														<td className="px-6 py-3">{report.reportId}</td>
														<td className="px-6 py-3">{report.postId !== null ? "Post" : "Comment"}</td>
														<td className="px-6 py-3">{report.content}</td>
														<td className="px-6 py-3">{report.userId}</td>
														<td className="px-6 py-3">{formatDate(report.createDay)}</td>
														<td className="px-6 py-3">
															<div className="flex justify-end gap-2">
																<button
																	onClick={() => {
																		setSelectedItem(report);
																		setIsPreviewOpen(true);
																	}}
																	className="flex items-center gap-1 px-3 py-1 border rounded text-gray-600 border-gray-600 hover:bg-gray-50 hover:cursor-pointer transition">
																	<SquareChartGantt className="w-4 h-4" />
																	Review
																</button>
																<button
																	onClick={() => {
																		setSelectedItem(report);
																		setIsConfirmOpen(true);
																	}}
																	className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
																	<Trash2 className="w-4 h-4" />
																	Remove Report
																</button>
															</div>
														</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>

								{/* Preview Modal */}
								<PreviewContent
									isOpen={isPreviewOpen}
									onClose={() => {
										setIsPreviewOpen(false);
										setSelectedItem(null);
									}}
									item={selectedItem}
								/>

								{/* Delete Confirmation */}
								<DeleteConfirmation
									isOpen={isConfirmOpen}
									onCancel={() => {
										setIsConfirmOpen(false);
										setSelectedItem(null);
									}}
									message={`Remove this report?`}
									onConfirm={async () => {
										try {
											await deleteReport(selectedItem.reportId);
											toast.success("Remove account successfully!!!");
											fetchReports();
										} catch (error) {
											console.error(error);
											toast.error(error?.response?.data?.message || error.message || "Failed to remove report.");
										} finally {
											setIsConfirmOpen(false);
											setSelectedItem(null);
										}
									}}
								/>
							</div>
						)}

						{/* Feedback Section */}
						{activeTab === "feedback" && (
							<div>
								<div className="bg-white rounded-xl shadow overflow-x-auto">
									<table className="min-w-full text-sm">
										<thead className="bg-green-100 text-gray-600">
											<tr>
												<th className="text-left px-6 py-3">Review</th>
												<th className="text-left px-6 py-3">Rating</th>
												<th className="text-left px-6 py-3">View Plan</th>
												<th className="text-left px-6 py-3">Coach</th>
												<th className="text-right px-6 py-3">Action</th>
											</tr>
										</thead>
										<tbody>
											{feedbacks.map((feedback) => (
												<tr key={feedback.feedbackId} className="border-t hover:bg-gray-50">
													<td className="px-6 py-4">
														<div className="flex items-start gap-3">
															<img src={feedback.avatar} alt={feedback.userId} className="w-10 h-10 rounded-full object-cover" />
															<div>
																<div className="font-medium text-gray-900">{feedback.userId}</div>
																<div className="text-xs text-gray-400">{feedback.timeCreated}</div>
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
														<button className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition">View Plan</button>
													</td>
													<td className="px-6 py-3">{feedback.coachId}</td>
													<td className="px-6 py-3">
														<div className="flex justify-end gap-2">
															<button className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
																<Trash2 className="w-4 h-4" />
																Remove Feedback
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManageReport;
