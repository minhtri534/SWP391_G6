import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import Pagination from "../../components/Pagination";
import { Lock, Pencil, Trash2 } from "lucide-react";
import AccountModal from "../../components/AccountModal";
import { deleteUser, getUsers, lockUser, unlockUser } from "../../api/Users";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../components/DeleteConfirmation";

function ManageAccounts() {
	// Data
	const [users, setUsers] = useState([]);

	//Get account function
	const fetchUsers = async () => {
		try {
			const data = await getUsers();
			//some filtering if needed
			//...
			setUsers(data);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load members.");
		}
	};

	// Get member list
	useEffect(() => {
		fetchUsers();
	}, []);

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
			(filterRole ? user.role.roleId === parseInt(filterRole) : true) &&
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

	// if currentPage > totalPages after deletion, bring it back in range
	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [users, totalPages, currentPage]);

	//For popup modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState(null);
	const [selectedDeleteAccount, setSelectedDeleteAccount] = useState(null);

	//Format date
	const formatDate = (isoDateString) => {
		if (!isoDateString) return "";
		const date = new Date(isoDateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<div className="flex">
			<AdminSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<AdminTopbar title={"Accounts Manager"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{/* Header*/}
					{/* <div className="flex justify-between items-center"></div> */}
					{console.log(users)}

					{/* Filter and sort */}
					<div className="bg-green-50 p-4 rounded-lg shadow flex flex-wrap gap-4">
						<input type="text" placeholder="Search username..." className="border rounded px-3 py-2 w-48" value={searchName} onChange={(e) => setSearchName(e.target.value)} />

						<select className="border rounded px-3 py-2 w-40" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
							<option value="">All Genders</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>

						<select className="border rounded px-3 py-2 w-40" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
							<option value="">All Roles</option>
							<option value="1">Guest</option>
							<option value="2">Member</option>
							<option value="3">Coach</option>
							<option value="4">Admin</option>
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
						<button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer transition">
							Add Coach Account
						</button>
					</div>

					{/* Account table */}
					<div className="bg-white rounded-xl shadow-md overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead className="bg-green-100 text-gray-600">
								<tr>
									<th className="text-left px-6 py-3">Id</th>
									<th className="text-left px-6 py-3">Name</th>
									<th className="text-left px-6 py-3">Role</th>
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
											No users retrieved. Check your network or database.
										</td>
									</tr>
								) : pageUser.length === 0 ? (
									<tr>
										<td colSpan="8" className="text-center text-lg px-6 py-4 text-red-500">
											No users matched your search or filters.
										</td>
									</tr>
								) : (
									pageUser.map((user) => (
										<tr key={user.userId} className="border-t hover:bg-gray-50">
											<td className="px-6 py-3">{user.userId}</td>
											<td className="px-6 py-3">{user.userName}</td>
											<td className="px-6 py-3">{user.role.roleName}</td>
											<td className="px-6 py-3">{user.age}</td>
											<td className="px-6 py-3">{user.gender}</td>
											<td className="px-6 py-3">{user.phoneNum}</td>
											<td className="px-6 py-3">{user.status}</td>
											<td className="px-6 py-3">{formatDate(user.joinDate)}</td>
											<td className="px-6 py-3">
												<div className="flex justify-end gap-2">
													{/* <button
														className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition"
														onClick={() => {
															setIsModalOpen(true);
															setSelectedAccount(user);
														}}>
														<Pencil className="w-4 h-4" />
														Update
													</button> */}
													<button
														className={`flex items-center gap-1 px-3 py-1 border rounded ${
															user.status === "Locked" ? "text-green-600 border-green-600 hover:bg-green-50" : "text-yellow-600 border-yellow-600 hover:bg-yellow-50"
														} hover:cursor-pointer transition`}
														onClick={async () => {
															try {
																if (user.status === "Locked") {
																	await unlockUser(user.userId);
																	toast.success(`Unlocked ${user.userName}`);
																} else {
																	await lockUser(user.userId);
																	toast.success(`Locked ${user.userName}`);
																}
																// Refresh user list
																fetchUsers();
															} catch (error) {
																console.error(error);
																toast.error(error.message);
															}
														}}>
														<Lock className="w-4 h-4" />
														{user.status === "Locked" ? "Unlock" : "Lock"}
													</button>
													<button
														className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition"
														onClick={() => {
															setSelectedDeleteAccount({ userId: user.userId, userName: user.userName });
															setIsConfirmDeleteOpen(true);
														}}>
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
						onSuccess={() => {
							fetchUsers();
							setIsModalOpen(false);
							setSelectedAccount(null);
						}}
					/>

					{/* Delete Confirmation popup modal */}
					<DeleteConfirmation
						isOpen={isConfirmDeleteOpen}
						onCancel={() => {
							setSelectedDeleteAccount(null);
							setIsConfirmDeleteOpen(false);
						}}
						message={selectedDeleteAccount ? `Do you want to remove account ${selectedDeleteAccount.userName}?` : ""}
						onConfirm={async () => {
							try {
								await deleteUser(selectedDeleteAccount.userId);
								toast.success("Remove account successfully!!!");
								// Update user list
								setUsers((prev) => prev.filter((u) => u.userId !== selectedDeleteAccount.userId));
							} catch (error) {
								console.error(error);
								toast.error(error?.response?.data?.message || error.message || "Failed to remove account.");
							} finally {
								setIsConfirmDeleteOpen(false);
								setSelectedDeleteAccount(null);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default ManageAccounts;
