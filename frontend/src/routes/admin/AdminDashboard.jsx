import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";

function AdminDashboard() {
	return (
		<div className="flex h-screen">
			<AdminSidebar />
			<div className="flex-1 flex flex-col">
				<AdminTopbar />
				<div className="p-6 space-y-6">
					{/* Header */}
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-semibold">Dashboard</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
