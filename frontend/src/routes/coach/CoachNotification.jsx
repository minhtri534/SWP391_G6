import React from "react";
import CoachTopbar from "../../components/CoachTopbar";
import CoachSidebar from "../../components/CoachSidebar";

function CoachNotification() {
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
					Notification table
				</div>
			</div>
		</div>
	);
}

export default CoachNotification;
