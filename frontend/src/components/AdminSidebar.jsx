import { Award, CircleDollarSign, CircleUser, LayoutDashboard, LogOut, MessageSquareText, SquarePen, User } from "lucide-react";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
	const navigate = useNavigate();

	const navItems = [
		{ name: "Dashboard", icon: <LayoutDashboard />, path: "/Admin/Dashboard" },
		{ name: "Accounts", icon: <CircleUser />, path: "/Admin/ManageAccounts" },
		{ name: "Badges", icon: <Award />, path: "/Admin/ManageBadges" },
		{ name: "Report & Feedback", icon: <MessageSquareText />, path: "/Admin/ManageReport" },
		{ name: "Posts Manage", icon: <SquarePen />, path: "/Admin/ManagePost" },
		// { name: "Income", icon: <CircleDollarSign />, path: "/admin/ManageIncome" },
		// { name: "Promote", path: "/admin/promote" },
	];

	const handleLogout = () => {
		//Remove token
		localStorage.clear();
		//Navigate to login
		navigate("/Login");
	};

	return (
		<aside className="w-60 fixed top-0 left-0 h-screen bg-white p-4 border-r z-20 flex flex-col justify-between">
			<div>
				<Link to={`/Admin/Dashboard`}>
					<div className="mb-6">
						<div className="text-xl font-semibold flex items-baseline">
							<span className="text-orange-500">Quit</span>
							<span className="text-green-600">Smoking</span>
							<div className="flex flex-col leading-none">
								<span className="text-gray-500">.com</span>
								<span className="text-xs text-green-500 ml-0.5">Admin</span>
							</div>
						</div>
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
			</div>

			<ul className="space-y-2 text-sm mt-4">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) =>
							`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`
						}>
						<User className="w-4 h-4" />
						Main Page
					</NavLink>
				</li>
				<li>
					<button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:cursor-pointer transition">
						<LogOut className="w-4 h-4 text-gray-700" />
						Logout
					</button>
				</li>
			</ul>
		</aside>
	);
}

export default AdminSidebar;
