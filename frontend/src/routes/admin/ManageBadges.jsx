import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import Pagination from "../../components/Pagination";
import { Pencil, Trash2 } from "lucide-react";
import BadgeModal from "../../components/BadgeModal";

function ManageBadges() {
	// Fake data
	const badges = Array.from({ length: 2000 }, (_, i) => ({
		title: `Badge ${i + 1}`,
		description: "Something about this character calls to you.",
		imageUrl: "/path/to/image.png",
	}));

	//For filter and sort

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 12;
	const totalPages = Math.max(1, Math.ceil(badges.length / pageSize));
	const startIndex = (currentPage - 1) * pageSize;
	const pageBadges = badges.slice(startIndex, startIndex + pageSize);

	//For popup modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBadge, setSelectedBadge] = useState(null);

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
						<h1 className="text-2xl font-semibold">Manage Badges</h1>
						<button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer transition">
							Add New Badge
						</button>
					</div>

					{/* Filter */}

					{/* Main */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{pageBadges.map((badge, index) => (
							<div key={index} className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between border hover:shadow-lg transition">
								<div>
									<div className="w-full aspect-[4/3] bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
										<img src={badge.imageUrl} alt={badge.title} className="h-24 object-contain" />
									</div>

									<h2 className="text-lg font-semibold">{badge.title}</h2>
									<p className="text-sm text-gray-600 mt-1">{badge.description}</p>
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
									<button className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
										<Trash2 className="w-4 h-4" />
										Remove
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					{badges.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />}

					{/* Badge popup modal */}
					<BadgeModal
						isOpen={isModalOpen}
						onClose={() => {
							setIsModalOpen(false);
							setSelectedBadge(null);
						}}
						initialValues={selectedBadge}
					/>
				</div>
			</div>
		</div>
	);
}

export default ManageBadges;
