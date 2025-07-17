import React, { useEffect, useState } from "react";
import CoachSidebar from "../../components/CoachSidebar";
import CoachTopbar from "../../components/CoachTopbar";
import { Pencil, Trash2 } from "lucide-react";
import PlanModal from "../../components/PlanModal";
import { deletePlan } from "../../api/Plan";
import { getUsers } from "../../api/Users";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import Pagination from "../../components/Pagination";

function CoachingMember() {
	//Fake data
	const [users, setUsers] = useState([
		{
			userId: 1,
			userName: "Jane Doe",
			gender: "Female",
			quitPlan: {
				planId: 101,
				coachId: 10,
				statusId: 2,
				reason: "Wants to improve health and be a good example for family.",
				startDate: "2025-07-10",
				goalDate: "2025-09-01",
				milestones: [],
			},
		},
		{
			userId: 2,
			userName: "John Doe",
			gender: "Male",
			quitPlan: null, // has no quit plan yet
		},
		{
			userId: 3,
			userName: "Joe Mami",
			gender: "Male",
			quitPlan: {
				planId: 102,
				coachId: 10,
				statusId: 1,
				reason: "Doctor recommendation after a health scare.",
				startDate: "2025-06-15",
				goalDate: "2025-08-01",
				milestones: [
					{ milestoneId: 1, title: "test", description: "test", targetDate: "19/07/2025", badgeId: 1 },
					{ milestoneId: 2, title: "test2", description: "test", targetDate: "19/07/2025", badgeId: 2 },
				],
			},
		},
	]);

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

	// For filter and sort
	const [searchName, setSearchName] = useState("");
	const [filterGender, setFilterGender] = useState("");
	const [filterHasPlan, setFilterHasPlan] = useState("");
	const [sortOption, setSortOption] = useState("");

	const filteredList = users.filter((member) => {
		return (
			member.userName.toLowerCase().includes(searchName.toLowerCase()) &&
			(filterGender ? member.gender === filterGender : true) &&
			(filterHasPlan === "" ? true : filterHasPlan === "true" ? member.quitPlan !== null : member.quitPlan === null)
		);
	});

	const sortedList = [...filteredList].sort((a, b) => {
		switch (sortOption) {
			case "nameAsc":
				return a.userName.localeCompare(b.userName);
			case "nameDesc":
				return b.userName.localeCompare(a.userName);
			case "goalAsc":
				return new Date(a.quitPlan?.goalDate || "9999-12-31") - new Date(b.quitPlan?.goalDate || "9999-12-31");
			case "goalDesc":
				return new Date(b.quitPlan?.goalDate || "0000-01-01") - new Date(a.quitPlan?.goalDate || "0000-01-01");
			default:
				return 0; //no sort
		}
	});

	//For pagination
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;
	const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
	const startIndex = (currentPage - 1) * pageSize;
	const pageUser = sortedList.slice(startIndex, startIndex + pageSize);

	// For popup modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
	const [selectedMember, setSelectedMember] = useState(null);
	const [selectedDeletePlan, setSelectedDeletePlan] = useState(null);

	//Reset pagination to 1st page
	useEffect(() => {
		setCurrentPage(1);
	}, [searchName, filterGender, filterHasPlan, sortOption]);

	return (
		<div className="flex">
			<CoachSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<CoachTopbar title={"Your Member"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{/* Filter and sort */}
					<div className="bg-green-50 p-4 rounded-lg shadow flex flex-wrap gap-4">
						<input type="text" placeholder="Search name..." className="border rounded px-3 py-2 w-48" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
						<select className="border rounded px-3 py-2 w-40" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
							<option value="">All Genders</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
						<select className="border rounded px-3 py-2 w-40" value={filterHasPlan} onChange={(e) => setFilterHasPlan(e.target.value)}>
							<option value="">All Plan Status</option>
							<option value="true">Has Plan</option>
							<option value="false">No Plan</option>
						</select>
						<select className="border rounded px-3 py-2 w-52" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
							<option value="">Sort By</option>
							<option value="nameAsc">Name ascending</option>
							<option value="nameDesc">Name descending</option>
							<option value="goalAsc">Goal Date ascending</option>
							<option value="goalDesc">Goal Date descending</option>
						</select>
					</div>

					{/* Member list table */}
					<div className="bg-white rounded-xl shadow-md overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead className="bg-green-100 text-gray-600">
								<tr>
									<th className="text-left px-6 py-3">#</th>
									<th className="text-left px-6 py-3">Name</th>
									<th className="text-left px-6 py-3">Gender</th>
									<th className="text-left px-6 py-3">Plan Time</th>
									<th className="text-left px-6 py-3">Progress</th>
									<th className="text-right px-6 py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{users.length === 0 ? (
									<tr>
										<td colSpan="6" className="text-center text-lg px-6 py-4 text-red-500">
											No users retrieved. Check your network or database.
										</td>
									</tr>
								) : pageUser.length === 0 ? (
									<tr>
										<td colSpan="6" className="text-center text-lg px-6 py-4 text-red-500">
											No members matched your search or filters.
										</td>
									</tr>
								) : (
									pageUser.map((member) => (
										<tr key={member.userId} className="border-t hover:bg-gray-50">
											<td className="px-6 py-3">{member.userId}</td>
											<td className="px-6 py-3">{member.userName}</td>
											<td className="px-6 py-3">{member.gender}</td>
											<td className="px-6 py-3">
												{member.quitPlan ? (
													<span>
														{member.quitPlan.startDate} to {member.quitPlan.goalDate}
													</span>
												) : (
													<span className="text-red-400">No plan</span>
												)}
											</td>
											<td className="px-6 py-3">
												{member.quitPlan && (
													<button className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition">View progress</button>
												)}
											</td>
											<td className="px-6 py-3">
												<div className="flex justify-end gap-2">
													{!member.quitPlan && (
														<button
															onClick={() => {
																setIsModalOpen(true);
																setSelectedMember(member);
															}}
															className="flex items-center gap-1 px-3 py-1 border rounded text-green-600 border-green-600 hover:bg-green-50 hover:cursor-pointer transition">
															<Pencil className="w-4 h-4" />
															Create Plan
														</button>
													)}
													{member.quitPlan && (
														<>
															<button
																onClick={() => {
																	setIsModalOpen(true);
																	setSelectedMember(member);
																}}
																className="flex items-center gap-1 px-3 py-1 border rounded text-yellow-600 border-yellow-600 hover:bg-yellow-50 hover:cursor-pointer transition">
																<Pencil className="w-4 h-4" />
																Update Plan
															</button>
															<button
																onClick={() => {
																	setSelectedDeletePlan({ planId: member.quitPlan.planId, userId: member.userId, userName: member.userName });
																	setIsConfirmDeleteOpen(true);
																}}
																className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
																<Trash2 className="w-4 h-4" />
																Remove Plan
															</button>
														</>
													)}
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					{filteredList.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />}

					{/* Plan popup modal */}
					<PlanModal
						isOpen={isModalOpen}
						onClose={() => {
							setIsModalOpen(false);
							setSelectedMember(null);
						}}
						initialValues={selectedMember?.quitPlan || null}
					/>

					{/* Delete Confirmation popup modal */}
					<DeleteConfirmation
						isOpen={isConfirmDeleteOpen}
						onCancel={() => {
							setSelectedDeletePlan(null), setIsConfirmDeleteOpen(false);
						}}
						message={selectedDeletePlan ? `Do you want to remove plan for ${selectedDeletePlan.userName}?` : ""}
						onConfirm={async () => {
							try {
								await deletePlan(selectedDeletePlan.planId, selectedDeletePlan.userId);
								toast.success("Plan remove successfully!!!");
								//Update member list
								setUsers((prev) => prev.map((u) => (u.userId === selectedDeletePlan.userId ? { ...u, quitPlan: null } : u)));
							} catch (error) {
								console.error(error);
								toast.error(error?.response?.data?.message || error.message || "Failed to delete plan.");
							} finally {
								setIsConfirmDeleteOpen(false);
								setSelectedDeletePlan(null);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default CoachingMember;
