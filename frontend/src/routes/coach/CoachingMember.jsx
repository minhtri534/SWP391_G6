import React, { useEffect, useState } from "react";
import CoachSidebar from "../../components/CoachSidebar";
import CoachTopbar from "../../components/CoachTopbar";
import { ClipboardList, List, Pencil, Trash2 } from "lucide-react";
import PlanModal from "../../components/PlanModal";
import { deletePlan, getMemberPlan } from "../../api/Plan";
import { getCoachMember } from "../../api/Users";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import Pagination from "../../components/Pagination";
import ViewPlan from "../../components/ViewPlan";
import SmokingCondition from "../../components/SmokingCondition";
import MemberAchievements from "../../components/MemberAchievements";
import DailyReport from "../../components/DailyReport";
import { getCoachId } from "../../api/Coach";

function CoachingMember() {
	const userId = localStorage.getItem("userId");
	const [coachId, setCoachId] = useState(null);
	const [members, setMembers] = useState([]);

	// Get coachId
	useEffect(() => {
		if (userId) {
			const fetchCoachId = async () => {
				try {
					const data = await getCoachId(userId);
					// console.log(data);
					setCoachId(data.coachId);
				} catch (error) {
					console.error(error);
					toast.error(error?.response?.data?.message || error.message || "Failed to get coachId");
				}
			};

			fetchCoachId();
		}
	}, [userId]);

	// Get member list
	useEffect(() => {
		if (coachId) {
			fetchMembers(coachId);
		}
	}, [coachId]);

	const fetchMembers = async (cid = coachId) => {
		try {
			const data = await getCoachMember(cid);
			const filtered = data.filter((user) => user.roleId !== 3);

			const membersWithPlans = await Promise.all(
				filtered.map(async (member) => {
					try {
						const plan = await getMemberPlan(member.userId);
						return { ...member, quitPlan: Array.isArray(plan) ? plan[0] : plan || null };
					} catch (err) {
						if (err.message.includes("404") || err.message.includes("Get member plan failed")) return { ...member, quitPlan: null };
						console.error(`Error fetching plan for ${member.userId}:`, err);
						return { ...member, quitPlan: null };
					}
				})
			);

			setMembers(membersWithPlans);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load members.");
		}
	};

	// For filter and sort
	const [searchName, setSearchName] = useState("");
	const [filterGender, setFilterGender] = useState("");
	const [filterHasPlan, setFilterHasPlan] = useState("");
	const [sortOption, setSortOption] = useState("");

	const filteredList = members.filter((member) => {
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
	const [isModalOpen, setIsModalOpen] = useState(false); //Create or Update modal
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); //Confirm delete modal
	const [isConditionModalOpen, setIsConditionModalOpen] = useState(false); //Member Smoking Condition modal
	const [isViewPlanOpen, setIsViewPlanOpen] = useState(false); //View member plan modal
	const [isViewAchievements, setIsViewAchievements] = useState(false); //View member's achievements
	const [isViewDaily, setIsViewDaily] = useState(false); //View member's daily report
	const [selectedMember, setSelectedMember] = useState(null);
	const [selectedDeletePlan, setSelectedDeletePlan] = useState(null);
	const [selectedPlan, setSelectedPlan] = useState(null);

	//Reset pagination to 1st page
	useEffect(() => {
		setCurrentPage(1);
	}, [searchName, filterGender, filterHasPlan, sortOption]);

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
			<CoachSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<CoachTopbar title={"Your Member"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{console.log("Member list: ", members)}
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
									<th className="text-left px-6 py-3">Smoking Condition</th>
									<th className="text-left px-6 py-3">Plan Time</th>
									<th className="text-left px-6 py-3">Progress</th>

									<th className="text-left px-6 py-3">Daily Report</th>
									<th className="text-right px-6 py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{members.length === 0 ? (
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
											<td
												className="px-6 py-3 hover:underline hover:cursor-pointer"
												onClick={() => {
													setIsViewAchievements(true);
													setSelectedMember(member);
												}}>
												{member.userName}
											</td>
											<td className="px-6 py-3">{member.gender}</td>
											<td className="px-6 py-3">
												<button
													onClick={() => {
														setIsConditionModalOpen(true);
														setSelectedMember(member);
													}}
													className="flex items-center gap-1 px-3 py-1 border rounded text-gray-600 border-gray-600 hover:bg-gray-50 hover:cursor-pointer transition">
													<ClipboardList className="w-4 h-4" />
													Smoking condition
												</button>
											</td>
											<td className="px-6 py-3">
												{member.quitPlan ? (
													<span>
														{formatDate(member.quitPlan.startDate)} to {formatDate(member.quitPlan.goalDate)}
													</span>
												) : (
													<span className="text-red-400">No plan</span>
												)}
											</td>
											<td className="px-6 py-3">
												{member.quitPlan && (
													<button
														onClick={() => {
															setIsViewPlanOpen(true);
															setSelectedPlan(member.quitPlan);
														}}
														className="flex items-center gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition">
														View progress
													</button>
												)}
											</td>

											<td className="px-6 py-3">
												{member.quitPlan && (
													<button
														onClick={() => {
															setIsViewDaily(true);
															setSelectedMember(member);
														}}
														className="flex items-center gap-1 px-3 py-1 border rounded text-gray-600 border-gray-600 hover:bg-gray-50 hover:cursor-pointer transition">
														<List className="w-4 h-4" />
														Report
													</button>
												)}
											</td>
											<td className="px-6 py-3">
												<div className="flex justify-end gap-2">
													{!member.quitPlan && (
														<>
															<button
																onClick={() => {
																	setIsModalOpen(true);
																	setSelectedMember(member);
																}}
																className="flex items-center gap-1 px-3 py-1 border rounded text-green-600 border-green-600 hover:bg-green-50 hover:cursor-pointer transition">
																<Pencil className="w-4 h-4" />
																Create Plan
															</button>
														</>
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

					{/* Create or Update plan popup modal */}
					{isModalOpen && selectedMember && (
						<PlanModal
							isOpen={isModalOpen}
							onClose={() => {
								setIsModalOpen(false);
								setSelectedMember(null);
							}}
							initialValues={selectedMember || null}
							coachId={coachId}
							onPlanChange={fetchMembers}
						/>
					)}

					{/* View member achievements */}
					{isViewAchievements && selectedMember && (
						<MemberAchievements
							isOpen={isViewAchievements}
							member={selectedMember}
							onClose={() => {
								setIsViewAchievements(false);
								setSelectedMember(null);
							}}
						/>
					)}

					{/* View member daily report */}
					{isViewDaily && selectedMember && (
						<DailyReport
							isOpen={isViewDaily}
							member={selectedMember}
							onClose={() => {
								setIsViewDaily(false);
								setSelectedMember(null);
							}}
						/>
					)}

					{/* View member plan modal */}
					{isViewPlanOpen && selectedPlan && <ViewPlan isOpen={isViewPlanOpen} plan={selectedPlan} onClose={() => setIsViewPlanOpen(false)} />}

					{/* View member smoking condition modal */}
					{isConditionModalOpen && selectedMember && (
						<SmokingCondition
							isOpen={isConditionModalOpen}
							onClose={() => {
								setIsConditionModalOpen(false);
								setSelectedMember(null);
							}}
							member={selectedMember}
						/>
					)}

					{/* Delete Confirmation popup modal */}
					{isConfirmDeleteOpen && (
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
									setMembers((prev) => prev.map((u) => (u.userId === selectedDeletePlan.userId ? { ...u, quitPlan: null } : u)));
								} catch (error) {
									console.error(error);
									toast.error(error?.response?.data?.message || error.message || "Failed to delete plan.");
								} finally {
									setIsConfirmDeleteOpen(false);
									setSelectedDeletePlan(null);
								}
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default CoachingMember;
