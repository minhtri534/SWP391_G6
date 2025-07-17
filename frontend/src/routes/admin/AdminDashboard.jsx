import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";

function AdminDashboard() {
	return (
		<div className="flex">
			<AdminSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<AdminTopbar title={"Dashboard"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{/* Header */}
					{/* <div className="flex justify-between items-center">
						<h1 className="text-2xl font-semibold">Dashboard</h1>
					</div> */}

					{/* Main */}
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{/* Tổng số người dùng */}
						<div className="bg-green-200 p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-2">Total Users</h2>
							<p className="text-3xl font-bold">124</p>
							<p className="text-gray-500 mt-1">100 Members • 24 Coaches</p>
						</div>

						{/* Average Rating Coaches */}
						<div className="bg-yellow-200 p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-2">Coaches' Average Rating</h2>
							<p className="text-3xl font-bold">4.3 ⭐</p>
						</div>

						{/* Income this month */}
						<div className="bg-red-200 p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-2">Income This Month</h2>
							<p className="text-3xl font-bold text-green-600">$12,540</p>
						</div>
					</div>

					{/* Bảng thông tin chi tiết */}
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
						{/* Top 5 Coaches */}
						<div className="bg-white p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-4">Top 5 Coaches (Rating)</h2>
							<ul className="space-y-2 text-sm">
								{[
									{ name: "Coach A", rating: 4.9 },
									{ name: "Coach B", rating: 4.8 },
									{ name: "Coach C", rating: 4.7 },
									{ name: "Coach D", rating: 4.6 },
									{ name: "Coach E", rating: 4.5 },
								].map((coach, index) => (
									<li key={index} className="flex justify-between border-b py-2">
										<span>{coach.name}</span>
										<span className="text-yellow-500">{coach.rating} ⭐</span>
									</li>
								))}
							</ul>
						</div>

						{/* Top 5 Members with most badges */}
						<div className="bg-white p-6 rounded-xl shadow">
							<h2 className="text-lg font-semibold mb-4">Top 5 Members (Badges)</h2>
							<ul className="space-y-2 text-sm">
								{[
									{ name: "Alice", badges: 12 },
									{ name: "Bob", badges: 10 },
									{ name: "Charlie", badges: 9 },
									{ name: "David", badges: 8 },
									{ name: "Eve", badges: 7 },
								].map((member, index) => (
									<li key={index} className="flex justify-between border-b py-2">
										<span>{member.name}</span>
										<span>{member.badges} Badges</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Latest Feedback */}
					<div className="bg-white p-6 rounded-xl shadow mt-6">
						<h2 className="text-lg font-semibold mb-4">Latest Feedback</h2>
						<ul className="space-y-3 text-sm">
							{[
								{ name: "Alice", comment: "Really helpful program!" },
								{ name: "Bob", comment: "Coach was very motivating." },
								{ name: "Charlie", comment: "The app could be faster." },
							].map((fb, index) => (
								<li key={index} className="border-b py-2">
									<p className="font-medium">{fb.name}</p>
									<p className="text-gray-600">{fb.comment}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
