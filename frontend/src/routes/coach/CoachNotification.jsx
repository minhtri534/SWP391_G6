import React, { useEffect, useState } from "react";
import CoachTopbar from "../../components/CoachTopbar";
import CoachSidebar from "../../components/CoachSidebar";
import { getNotification } from "../../api/Notification";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";

function CoachNotification() {
	const [notifications, setNotifications] = useState([]);

	// Get notification list function
	const fetchNotifications = async () => {
		try {
			const data = await getNotification();
			//some filtering if needed
			//...
			setNotifications(data);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load notifications.");
		}
	};

	useEffect(() => {
		fetchNotifications();
	}, []);

	//For filter and Sort
	const [filterType, setFilterType] = useState("");

	const filteredList = notifications.filter((notification) => {
		return filterType ? notification.type === filterType : true;
	});

	// For popup modal

	return (
		<div className="flex">
			<CoachSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<CoachTopbar title={"Notifications"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{/* Filter and Sort */}
					<div className="bg-green-50 p-4 rounded-lg shadow flex flex-wrap gap-4">
						<select className="border rounded px-3 py-2 w-40" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
							<option value="">All Type</option>
							<option value="Milestone">Milestone</option>
							<option value="Notify">Notify</option>
						</select>
					</div>
					{/* Notification table */}
					<div className="bg-white rounded-xl shadow-md overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead className="bg-green-100 text-gray-600">
								<tr>
									<th className="text-left px-6 py-3">#</th>
									<th className="text-left px-6 py-3">Notification Message</th>
									<th className="text-left px-6 py-3">Type</th>
									<th className="text-right px-6 py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{notifications.length === 0 ? (
									<tr>
										<td colSpan="4" className="text-center text-lg px-6 py-4 text-red-500">
											No notifications retrieved. Check your network or database.
										</td>
									</tr>
								) : filteredList.length === 0 ? (
									<tr>
										<td colSpan="4" className="text-center text-lg px-6 py-4 text-red-500">
											No notifications matched.
										</td>
									</tr>
								) : (
									filteredList.map((notification) => (
										<tr key={notification.notificationId} className="border-t hover:bg-gray-50">
											<td className="px-6 py-3">{notification.notificationId}</td>
											<td className="px-6 py-3">{notification.message}</td>
											<td className="px-6 py-3">{notification.type}</td>
											<td className="px-6 py-3">
												<div className="flex justify-end gap-2">
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition" onClick={() => {}}>
														<Pencil className="w-4 h-4" />
														Update
													</button>
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition" onClick={() => {}}>
														<Trash2 className="w-4 h-4" />
														Remove
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CoachNotification;
