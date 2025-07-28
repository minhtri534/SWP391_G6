import React, { useEffect, useState } from "react";
import CoachTopbar from "../../components/CoachTopbar";
import CoachSidebar from "../../components/CoachSidebar";
import { deleteNotification, getNotification } from "../../api/Notification";
import { toast } from "react-toastify";
import { MessageCircleMore, Pencil, Trash2 } from "lucide-react";
import NotificationModal from "../../components/NotificationModal";
import DeleteConfirmation from "../../components/DeleteConfirmation";

function CoachNotification() {
	const [notifications, setNotifications] = useState([
		// { notificationId: 1, message: "You have a meeting tonight. Stay tune!", type: "Reminder" },
		// { notificationId: 2, message: "You've done it. You complete a milestone", type: "Milestone" },
		// { notificationId: 3, message: "New message from coach", type: "Notify" },
	]);

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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

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
							<option value="Reminder">Reminder</option>
							<option value="Notify">Notify</option>
						</select>
						<button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer transition">
							Add Notification
						</button>
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
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-green-600 border-green-600 hover:bg-green-50 hover:cursor-pointer transition" onClick={() => {}}>
														<MessageCircleMore className="w-4 h-4" />
														Send to members
													</button>
													<button
														onClick={() => {
															setIsModalOpen(true);
															setSelectedItem(notification);
														}}
														className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition">
														<Pencil className="w-4 h-4" />
														Update
													</button>
													<button
														className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition"
														onClick={() => {
															setIsConfirmDeleteOpen(true);
															setSelectedItem(notification);
														}}>
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

					{/* Create or Update notification modal */}
					{isModalOpen && (
						<NotificationModal
							key={selectedItem ? selectedItem.notificationId : "new"}
							isOpen={isModalOpen}
							onClose={() => {
								setIsModalOpen(false);
								setSelectedItem(null);
							}}
							initialValues={selectedItem}
							onSuccess={() => {
								fetchNotifications();
								setIsModalOpen(false);
								setSelectedItem(null);
							}}
						/>
					)}

					{/* Delete confirmation */}
					{isConfirmDeleteOpen && selectedItem && (
						<DeleteConfirmation
							isOpen={isConfirmDeleteOpen}
							onCancel={() => {
								setIsConfirmDeleteOpen(false);
								setSelectedItem(null);
							}}
							message={"Do you want to delete this notification?"}
							onConfirm={async () => {
								try {
									await deleteNotification(selectedItem.notificationId);
									toast.success("Remove notification successfully");
									setNotifications((prev) => prev.filter((n) => n.notificationId !== selectedItem.notificationId));
								} catch (error) {
									console.error(error);
									toast.error(error?.response?.data?.message || error.message || "Failed to remove notification.");
								} finally {
									setIsConfirmDeleteOpen(false);
									setSelectedItem(null);
								}
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default CoachNotification;
