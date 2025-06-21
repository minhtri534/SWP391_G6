import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import Pagination from "../../components/Pagination";
import { Lock, Pencil, Trash2 } from "lucide-react";

function ManageAccounts() {
	// Fake data
	const users = [
		{
			userId: 1,
			userName: "alice",
			age: 28,
			gender: "Female",
			phoneNum: "0912345678",
			password: "alice123",
			roleId: 1,
			status: "Active",
			joinDate: "2023-01-10",
			badgeId: 2,
		},
		{
			userId: 2,
			userName: "bob",
			age: 30,
			gender: "Male",
			phoneNum: "0987654321",
			password: "bobsecure",
			roleId: 2,
			status: "Active",
			joinDate: "2023-02-12",
			badgeId: 3,
		},
		{
			userId: 3,
			userName: "charlie",
			age: 26,
			gender: "Male",
			phoneNum: "0911112233",
			password: "pass123",
			roleId: 2,
			status: "Locked",
			joinDate: "2023-03-05",
			badgeId: 1,
		},
		{
			userId: 4,
			userName: "daisy",
			age: 24,
			gender: "Female",
			phoneNum: "0922333444",
			password: "daisy456",
			roleId: 2,
			status: "Active",
			joinDate: "2023-03-25",
			badgeId: 4,
		},
		{
			userId: 5,
			userName: "eric",
			age: 35,
			gender: "Male",
			phoneNum: "0912344444",
			password: "ericpw",
			roleId: 1,
			status: "Inactive",
			joinDate: "2023-04-10",
			badgeId: 2,
		},
		{
			userId: 6,
			userName: "fiona",
			age: 29,
			gender: "Female",
			phoneNum: "0977889900",
			password: "fiona@pw",
			roleId: 2,
			status: "Active",
			joinDate: "2023-04-15",
			badgeId: 5,
		},
		{
			userId: 7,
			userName: "george",
			age: 27,
			gender: "Male",
			phoneNum: "0901234567",
			password: "geo789",
			roleId: 2,
			status: "Active",
			joinDate: "2023-04-20",
			badgeId: 6,
		},
		{
			userId: 8,
			userName: "hannah",
			age: 22,
			gender: "Female",
			phoneNum: "0966667777",
			password: "han321",
			roleId: 1,
			status: "Locked",
			joinDate: "2023-05-01",
			badgeId: 3,
		},
		{
			userId: 9,
			userName: "ian",
			age: 32,
			gender: "Male",
			phoneNum: "0933344555",
			password: "ianpass",
			roleId: 2,
			status: "Active",
			joinDate: "2023-05-10",
			badgeId: 2,
		},
		{
			userId: 10,
			userName: "julia",
			age: 31,
			gender: "Female",
			phoneNum: "0955556666",
			password: "jul@pw",
			roleId: 2,
			status: "Inactive",
			joinDate: "2023-05-15",
			badgeId: 1,
		},
		{
			userId: 11,
			userName: "kyle",
			age: 23,
			gender: "Male",
			phoneNum: "0944445555",
			password: "kylepass",
			roleId: 2,
			status: "Active",
			joinDate: "2023-05-18",
			badgeId: 4,
		},
		{
			userId: 12,
			userName: "lisa",
			age: 27,
			gender: "Female",
			phoneNum: "0988001122",
			password: "lisa321",
			roleId: 1,
			status: "Active",
			joinDate: "2023-05-21",
			badgeId: 6,
		},
		{
			userId: 13,
			userName: "mike",
			age: 33,
			gender: "Male",
			phoneNum: "0933221100",
			password: "mike!pass",
			roleId: 2,
			status: "Locked",
			joinDate: "2023-05-25",
			badgeId: 3,
		},
		{
			userId: 14,
			userName: "nina",
			age: 25,
			gender: "Female",
			phoneNum: "0977223344",
			password: "nina123",
			roleId: 2,
			status: "Active",
			joinDate: "2023-06-01",
			badgeId: 5,
		},
		{
			userId: 15,
			userName: "oscar",
			age: 29,
			gender: "Male",
			phoneNum: "0911223344",
			password: "oscarpw",
			roleId: 1,
			status: "Active",
			joinDate: "2023-06-03",
			badgeId: 2,
		},
	];

	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 8;
	const totalPages = Math.ceil(users.length / pageSize);

	const startIndex = (currentPage - 1) * pageSize;
	const pageUser = users.slice(startIndex, startIndex + pageSize);

	return (
		<div className="flex h-screen">
			<AdminSidebar />
			<div className="flex-1 flex flex-col">
				<AdminTopbar />
				<div className="p-6 space-y-6">
					{/* Header*/}
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-semibold">Manage Accounts</h1>
						<button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Create Account</button>
					</div>

					{/* Filter */}

					{/* Bảng người dùng */}
					<div className="bg-white rounded-xl shadow-md overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead className="bg-green-100 text-gray-600">
								<tr>
									<th className="text-left px-6 py-3">Id</th>
									<th className="text-left px-6 py-3">Name</th>
									<th className="text-left px-6 py-3">Age</th>
									<th className="text-left px-6 py-3">Gender</th>
									<th className="text-left px-6 py-3">Phone Number</th>
									<th className="text-left px-6 py-3">Status</th>
									<th className="text-left px-6 py-3">Join Date</th>
									<th className="text-right px-6 py-3">Actions</th>
								</tr>
							</thead>
							<tbody>
								{users.length === 0 ? (
									<tr>
										<td colSpan="7" className="text-center px-6 py-4 text-gray-500">
											No users found.
										</td>
									</tr>
								) : (
									pageUser.map((user) => (
										<tr key={user.userId} className="border-t hover:bg-gray-50">
											<td className="px-6 py-3">{user.userId}</td>
											<td className="px-6 py-3">{user.userName}</td>
											<td className="px-6 py-3">{user.age}</td>
											<td className="px-6 py-3">{user.gender}</td>
											<td className="px-6 py-3">{user.phoneNum}</td>
											<td className="px-6 py-3">{user.status}</td>
											<td className="px-6 py-3">{user.joinDate}</td>
											<td className="px-6 py-3">
												<div className="flex justify-end gap-2">
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 transition">
														<Pencil className="w-4 h-4" />
														Update
													</button>
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-yellow-600 border-yellow-600 hover:bg-yellow-50 transition">
														<Lock className="w-4 h-4" />
														Lock
													</button>
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 transition">
														<Trash2 className="w-4 h-4" />
														Delete
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
					{users.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />}
				</div>
			</div>
		</div>
	);
}

export default ManageAccounts;
