import { Award, CircleUser, LayoutDashboard, MessageSquareText } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

function AdminSidebar() {
	const navItems = [
		{ name: "Dashboard", icon: <LayoutDashboard />, path: "/Admin/Dashboard" },
		{ name: "Accounts", icon: <CircleUser />, path: "/Admin/ManageAccounts" },
		{ name: "Badges", icon: <Award />, path: "/Admin/ManageBadges" },
		{ name: "Report & Feedback", icon: <MessageSquareText />, path: "/Admin/ManageReport" },
		// { name: "Income", path: "/admin/income" },
		// { name: "Promote", path: "/admin/promote" },
	];

	return (
		<aside className="w-60 bg-white p-4 border-r min-h-screen">
			<Link to={`/`}>
				<div className="text-xl font-semibold mb-6">
					<span className="text-orange-500">Quit</span>
					<span className="text-green-600">Smoking</span>
					<span className="text-gray-500">.com</span>
				</div>
			</Link>
			<ul className="space-y-2 text-sm">
				{navItems.map((item) => (
					<li key={item.name}>
						<NavLink
							to={item.path}
							className={({ isActive }) => `block px-4 py-2 rounded-lg transition-colors duration-200 ${isActive ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}>
							{item.icon}
							{item.name}
						</NavLink>
					</li>
				))}
			</ul>
		</aside>
	);
}

export default AdminSidebar;
