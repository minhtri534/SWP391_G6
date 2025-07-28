// src/components/NotificationDropdown.jsx
import React, { useRef, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

function NotificationDropdown({ notifications }) {
	const [notifOpen, setNotifOpen] = useState(false);
	const notifRef = useRef();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (notifRef.current && !notifRef.current.contains(e.target)) {
				setNotifOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={notifRef}>
			<div onClick={() => setNotifOpen((prev) => !prev)} className="cursor-pointer relative p-2 rounded-full bg-white shadow">
				<FaBell className="text-green-600 text-xl" />
				{notifications.length > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>}
			</div>

			{notifOpen && (
				<div className="absolute top-full right-0 mt-2 w-72 max-h-96 bg-white rounded-lg shadow-lg overflow-y-auto z-50">
					<h3 className="text-sm font-semibold px-4 py-2 border-b text-gray-700">Notifications</h3>
					{notifications.length === 0 ? (
						<p className="text-sm text-gray-500 px-4 py-3">No notifications</p>
					) : (
						notifications.map((notif) => (
							<div key={notif.id} className="px-4 py-2 border-b last:border-b-0">
								<p className="text-sm text-gray-800">{notif.content}</p>
								<p className="text-xs text-gray-500 mt-1">{notif.date}</p>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}

export default NotificationDropdown;
