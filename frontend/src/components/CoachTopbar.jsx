import { Bell, CircleUserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { getUserNotification } from "../api/Notification";
import { toast } from "react-toastify";
// import { getTokenData } from "../api/Auth";

function CoachTopbar({ title }) {
	const userId = localStorage.getItem("userId");
	// const token = localStorage.getItem("userToken");
	// const tokenData = getTokenData(token);
	// const userId = tokenData?.userId;
	const [notifications, setNotifications] = useState([
		// { id: 1, content: "You have a new message from a member.", date: "2025-07-17" },
		// { id: 2, content: "A new report was submitted.", date: "2025-07-16" },
	]);
	const userName = localStorage.getItem("userName") || "Admin";

	// useEffect(() => {
	// 	if (userId) {
	// 		console.log("User role:", userId);
	// 	}
	// });

	useEffect(() => {
		const fetchNotification = async (userId) => {
			try {
				const data = await getUserNotification(userId);
				//some filtering if needed
				//...
				setNotifications(data);
			} catch (error) {
				console.error(error);
				const status = error?.response?.status;
				// Only show toast if it's not a 404
				if (status !== 404) {
					toast.error(error?.response?.data?.message || error.message || "Failed to load notifications.");
				}
				// console.error(error);
				// toast.error(error?.response?.data?.message || error.message || "Failed to load notifications.");
			}
		};
		fetchNotification(userId);
	}, []);

	return (
		<div className="flex justify-between items-center p-4 bg-green-300">
			<h1 className="text-2xl font-semibold">{title}</h1>
			<div className="flex items-center gap-4">
				{/* <Bell className="w-6 h-6" /> */}
				<NotificationDropdown notifications={notifications} />
				{/* <CircleUserRound className="w-8 h-8" /> */}
				<UserDropdown userName={userName} />
			</div>
		</div>
	);
}

export default CoachTopbar;
