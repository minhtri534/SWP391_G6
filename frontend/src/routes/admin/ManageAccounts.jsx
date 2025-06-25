import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import Pagination from "../../components/Pagination";
import { Lock, Pencil, Trash2 } from "lucide-react";
import AccountModal from "../../components/AccountModal";

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
	];

	//For filter and sort
	const [searchName, setSearchName] = useState("");
	const [filterGender, setFilterGender] = useState("");
	const [filterRole, setFilterRole] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [sortOption, setSortOption] = useState("");

	const filteredList = users.filter((user) => {
		return (
			user.userName.toLowerCase().includes(searchName.toLowerCase()) &&
			(filterGender ? user.gender === filterGender : true) &&
			(filterRole ? user.roleId === parseInt(filterRole) : true) &&
			(filterStatus ? user.status === filterStatus : true)
		);
	});

	const sortedList = [...filteredList].sort((a, b) => {
		switch (sortOption) {
			case "ageAsc":
				return a.age - b.age;
			case "ageDesc":
				return b.age - a.age;
			case "nameAsc":
				return a.userName.localeCompare(b.userName);
			case "nameDesc":
				return b.userName.localeCompare(a.userName);
			case "joinAsc":
				return new Date(a.joinDate) - new Date(b.joinDate);
			case "joinDesc":
				return new Date(b.joinDate) - new Date(a.joinDate);
			default:
				return 0; // no sort
		}
	});

	//For pagination
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	// const totalPages = Math.ceil(sortedList.length / pageSize);
	const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
	const startIndex = (currentPage - 1) * pageSize;
	// const pageUser = users.slice(startIndex, startIndex + pageSize);
	const pageUser = sortedList.slice(startIndex, startIndex + pageSize);

	//Reset pagination to 1st page
	useEffect(() => {
		setCurrentPage(1);
	}, [searchName, filterGender, filterRole, filterStatus, sortOption]);

	//For popup modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState(null);

	return (
		<div className="flex">
			<AdminSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<AdminTopbar />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{/* Header*/}
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-semibold">Manage Accounts</h1>
						<button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer transition">
							Create Account
						</button>
					</div>

					{/* Filter */}
					<div className="bg-green-50 p-4 rounded-lg shadow flex flex-wrap gap-4">
						<input type="text" placeholder="Search username..." className="border rounded px-3 py-2 w-48" value={searchName} onChange={(e) => setSearchName(e.target.value)} />

						<select className="border rounded px-3 py-2 w-40" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
							<option value="">All Genders</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>

						<select className="border rounded px-3 py-2 w-40" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
							<option value="">All Roles</option>
							<option value="1">Admin</option>
							<option value="2">Coach/User</option>
						</select>

						<select className="border rounded px-3 py-2 w-40" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
							<option value="">All Status</option>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
							<option value="Locked">Locked</option>
						</select>

						<select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border rounded px-3 py-2 w-52">
							<option value="">Sort By</option>
							<option value="ageAsc">Age ascending</option>
							<option value="ageDesc">Age descending</option>
							<option value="nameAsc">Name A→Z</option>
							<option value="nameDesc">Name Z→A</option>
							<option value="joinAsc">Join Date ascending</option>
							<option value="joinDesc">Join Date descending</option>
						</select>
					</div>

					{/* Account table */}
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
										<td colSpan="8" className="text-center text-lg px-6 py-4 text-red-500">
											No users found.
										</td>
									</tr>
								) : pageUser.length === 0 ? (
									<tr>
										<td colSpan="8" className="text-center text-lg px-6 py-4 text-red-500">
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
													<button
														className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition"
														onClick={() => {
															setIsModalOpen(true);
															setSelectedAccount(user);
														}}>
														<Pencil className="w-4 h-4" />
														Update
													</button>
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-yellow-600 border-yellow-600 hover:bg-yellow-50 hover:cursor-pointer transition">
														<Lock className="w-4 h-4" />
														Lock
													</button>
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
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

					{/* Pagination */}
					{/* {users.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />} */}
					{filteredList.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />}

					{/* Account popup modal */}
					<AccountModal
						isOpen={isModalOpen}
						onClose={() => {
							setIsModalOpen(false);
							setSelectedAccount(null);
						}}
						initialValues={selectedAccount}
					/>
				</div>
			</div>
		</div>
	);
}

export default ManageAccounts;
