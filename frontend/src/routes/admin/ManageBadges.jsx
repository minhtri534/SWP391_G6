import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";

function ManageBadges() {
	return (
		<div className="flex h-screen">
			<AdminSidebar />
			<div className="flex-1 flex flex-col">
				<AdminTopbar />
				Manage Badges
			</div>
		</div>
	);
}

export default ManageBadges;
