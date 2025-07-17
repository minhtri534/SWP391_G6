import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import Pagination from "../../components/Pagination";
import { Badge, PackageOpen, Pencil, Plus, SearchX, Trash2 } from "lucide-react";
import BadgeModal from "../../components/BadgeModal";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { toast } from "react-toastify";
import { deleteBadge, getBadges } from "../../api/Badges";

function ManageBadges() {
	//Fake Data
	const [badges, setBadges] = useState([
		{ badgeId: 1, badgeName: "A Fresh Start", description: "New account joined the program.", conditionType: 1, imageUrl: "https://example.com", value: 1 },
		{ badgeId: 2, badgeName: "Don't Give Up", description: "1 day without smoking.", conditionType: 1, imageUrl: "https://example.com", value: 2 },
		{ badgeId: 3, badgeName: "Doing Good", description: "1 week without smoking.", conditionType: 1, imageUrl: "https://example.com", value: 10 },
		{ badgeId: 4, badgeName: "Completly Give Up Smoking", description: "Complete the smoking cessation program.", conditionType: 2, imageUrl: "https://example.com", value: 100 },
	]);

	useEffect(() => {
		const fetchBadges = async () => {
			try {
				const data = await getBadges();
				//filtering if needed
				//...
				setBadges(data);
			} catch (error) {
				console.error(error);
				toast.error(error?.response?.data?.message || error.message || "Failed to load badges.");
			}
		};

		fetchBadges();
	}, []);

	//For filter and sort
	const [searchName, setSearchName] = useState("");
	const [filterCondition, setFilterCondition] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [sortOption, setSortOption] = useState("");

	const filteredList = badges.filter((badge) => {
		return (
			badge.badgeName.toLowerCase().includes(searchName.toLowerCase()) &&
			(filterCondition ? badge.conditionType === parseInt(filterCondition) : true) &&
			(filterValue ? badge.value === parseFloat(filterValue) : true)
		);
	});

	const sortedList = [...filteredList].sort((a, b) => {
		switch (sortOption) {
			case "valueAsc":
				return a.value - b.value;
			case "valueDes":
				return b.value - a.value;
			default:
				return 0;
		}
	});

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const rows = 3;
	const pageSize = 4 * rows;
	// const totalPages = Math.max(1, Math.ceil(badges.length / pageSize));
	const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
	const startIndex = (currentPage - 1) * pageSize;
	const pageBadges = sortedList.slice(startIndex, startIndex + pageSize);

	//For popup modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
	const [selectedBadge, setSelectedBadge] = useState(null);

	return (
		<div className="flex">
			<AdminSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<AdminTopbar title={"Badges Manager"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					{/* Filter */}
					<div className="bg-green-50 p-4 rounded-lg shadow flex flex-wrap gap-4">
						<input type="text" placeholder="Search badge name..." className="border rounded px-3 py-2 w-48" value={searchName} onChange={(e) => setSearchName(e.target.value)} />

						<select className="border rounded px-3 py-2 w-40" value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)}>
							<option value="">All Conditions</option>
							<option value="1">New Member</option>
							<option value="2">Old Member</option>
						</select>

						<select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border rounded px-3 py-2 w-52">
							<option value="">Sort By</option>
							<option value="valueAsc">Value ascending</option>
							<option value="valueDes">Value descending</option>
						</select>
						<button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer transition">
							Add New Badge
						</button>
					</div>

					{/* Main */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{badges.length === 0 ? (
							<div className="flex flex-col items-center justify-center w-full col-span-full py-12 text-gray-500">
								<PackageOpen className="w-16 h-16 mb-4 text-gray-400" />
								<p className="text-lg font-medium">No badges retrieved. Check your network or database.</p>
							</div>
						) : pageBadges.length === 0 ? (
							<div className="flex flex-col items-center justify-center w-full col-span-full py-12 text-gray-500">
								<SearchX className="w-16 h-16 mb-4 text-gray-400" />
								<p className="text-lg font-medium">No badges matched your search or filter.</p>
							</div>
						) : (
							pageBadges.map((badge) => (
								<div key={badge.badgeId} className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between border hover:shadow-lg transition">
									<div>
										<div className="w-full aspect-[4/3] bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
											<img src={badge.imageUrl} alt={badge.badgeName} className="h-24 object-contain" />
										</div>

										<h2 className="text-lg font-semibold">{badge.badgeName}</h2>
										<p className="text-sm text-gray-600 mt-1">
											{badge.description} {badge.value}
										</p>
									</div>
									<div className="mt-4 flex justify-end gap-2">
										<button
											onClick={() => {
												setIsModalOpen(true);
												setSelectedBadge(badge);
											}}
											className="flex items-center text-sm gap-1 px-3 py-1 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 hover:cursor-pointer transition">
											<Pencil className="w-4 h-4" />
											Update
										</button>
										<button
											onClick={() => {
												setIsConfirmDeleteOpen(true);
												setSelectedBadge(badge);
											}}
											className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
											<Trash2 className="w-4 h-4" />
											Remove
										</button>
									</div>
								</div>
							))
						)}
					</div>

					{/* Pagination */}
					{filteredList.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />}

					{/* Badge popup modal */}
					<BadgeModal
						isOpen={isModalOpen}
						onClose={() => {
							setIsModalOpen(false);
							setSelectedBadge(null);
						}}
						initialValues={selectedBadge}
					/>

					{/* Delete confirmation popup modal */}
					<DeleteConfirmation
						isOpen={isConfirmDeleteOpen}
						onCancel={() => {
							setIsConfirmDeleteOpen(false);
							setSelectedBadge(null);
						}}
						message={selectedBadge ? `Do you want to remove this badge named: ${selectedBadge.badgeName}?` : ""}
						onConfirm={async () => {
							try {
								await deleteBadge(selectedBadge.badgeId);
								toast.success("Remove badge successfully");
								setBadges((prev) => prev.filter((b) => b.badgeId !== selectedBadge.badgeId));
							} catch (error) {
								console.error(error);
								toast.error(error?.response?.data?.message || error.message || "Failed to remove account.");
							} finally {
								setIsConfirmDeleteOpen(false);
								setSelectedBadge(null);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default ManageBadges;
