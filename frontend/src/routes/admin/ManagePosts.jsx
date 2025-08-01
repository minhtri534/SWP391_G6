import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import { List, Trash2 } from "lucide-react";
import PreviewPost from "../../components/PreviewPost";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { toast } from "react-toastify";

function ManagePosts() {
	// Data
	const [posts, setPosts] = useState([]);

	// Get data function

	// Filter and sort

	// Pagination

	// Modal
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	return (
		<div className="flex">
			<AdminSidebar />
			<div className="ml-60 flex-1 flex flex-col h-screen overflow-hidden">
				<AdminTopbar title={"Posts Manager"} />
				<div
					className="flex-1 overflow-y-auto p-6 space-y-6"
					style={{
						background: "linear-gradient(to bottom, #98fcb1, #d0f3a3)",
					}}>
					<div className="bg-white rounded-xl shadow-md overflow-x-auto">
						<table className="min-w-full text-sm">
							<thead className="bg-green-100 text-gray-600">
								<tr>
									<th className="text-left px-6 py-3">Id</th>
									<th className="text-left px-6 py-3">Create date</th>
									<th className="text-left px-6 py-3">Account</th>
									<th className="text-left px-6 py-3">Title</th>
									<th className="text-right px-6 py-3">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr key={"1"} className="border-t hover:bg-gray-50">
									<td className="px-6 py-3">ID1</td>
									<td className="px-6 py-3">01-08-2025</td>
									<td className="px-6 py-3">Coach1</td>
									<td className="px-6 py-3">Test</td>
									<td className="px-6 py-3">
										<div className="flex justify-end gap-2">
											<button
												onClick={() => {
													setIsPreviewOpen(true);
													setSelectedItem("Change later");
												}}
												className="flex items-center gap-1 px-3 py-1 border rounded text-gray-600 border-gray-600 hover:bg-gray-50 hover:cursor-pointer transition">
												<List className="w-4 h-4" />
												Preview
											</button>
											<button
												onClick={() => {
													setIsDeleteOpen(true);
													setSelectedItem("ID1");
												}}
												className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
												<Trash2 className="w-4 h-4" />
												Delete
											</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Preview modal */}
					{isPreviewOpen && selectedItem && (
						<PreviewPost
							isOpen={isPreviewOpen}
							onClose={() => {
								setIsPreviewOpen(false);
								setSelectedItem(null);
							}}
							item={selectedItem}
						/>
					)}

					{/* Delete confirmation */}
					{isDeleteOpen && (
						<DeleteConfirmation
							isOpen={isDeleteOpen}
							onCancel={() => {
								setIsDeleteOpen(false);
								setSelectedItem(null);
							}}
							message={"Do you want to delete this post?"}
							onConfirm={async () => {
								try {
									toast.info("Not available yet");
								} catch (error) {
									console.error(error);
									toast.error(error?.response?.data?.message || error.message || "Failed to remove account.");
								} finally {
									setIsDeleteOpen(false);
									setSelectedItem(null);
								}
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default ManagePosts;
