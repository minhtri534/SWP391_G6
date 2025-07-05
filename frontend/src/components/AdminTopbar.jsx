import { Bell, CircleUserRound } from "lucide-react";
import React from "react";

function AdminTopbar() {
	return (
		<div className="flex justify-end items-center p-4">
			<div className="flex items-center gap-4">
				<Bell className="w-6 h-6" />
				<CircleUserRound className="w-8 h-8" />
			</div>
		</div>
	);
}

export default AdminTopbar;
