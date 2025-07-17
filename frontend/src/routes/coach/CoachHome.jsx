import React from "react";
import CoachSidebar from "../../components/CoachSidebar";
import CoachTopbar from "../../components/CoachTopbar";

function CoachHome() {
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
							<p className="text-3xl font-bold">50</p>
						</div>
						{/* Average rating */}
						<div className="bg-yellow-200 p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-2">Average Rating</h2>
							<p className="text-3xl font-bold">4.8</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CoachHome;
