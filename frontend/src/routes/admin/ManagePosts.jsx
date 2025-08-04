import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import { List, Trash2 } from "lucide-react";
import PreviewPost from "../../components/PreviewPost";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { toast } from "react-toastify";
import { deletePost, getUnapprovedPost } from "../../api/Post";
import { getPosts } from "../../api/forum";
import Pagination from "../../components/Pagination";

function ManagePosts() {
	const [activeTab, setActiveTab] = useState("unapproved");

	// Data
	const [approvePosts, setApprovePosts] = useState([]);
	const [unapprovedPosts, setUnapprovedPosts] = useState([]);

	// Get data function
	const fetchUnapprovedPost = async () => {
		try {
			const data = await getUnapprovedPost();
			//some filtering if needed
			//...
			setUnapprovedPosts(data);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load posts list.");
		}
	};

	const fetchApprovedPost = async () => {
		try {
			const data = await getPosts();
			//some filtering if needed
			//...
			setApprovePosts(data);
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || error.message || "Failed to load posts list.");
		}
	};

	useEffect(() => {
		if (activeTab == "unapproved") {
			fetchUnapprovedPost();
		} else if (activeTab == "approved") {
			fetchApprovedPost();
		}
	}, [activeTab]);

	// Filter and sort

	//Format date
	const formatDate = (isoDateString) => {
		if (!isoDateString) return "";
		const date = new Date(isoDateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	// Pagination
	const [currentPageUnapproved, setCurrentPageUnapproved] = useState(1);
	const [currentPageApproved, setCurrentPageApproved] = useState(1);
	const itemsPerPage = 5;

	const getPaginatedData = (data, currentPage) => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return data.slice(startIndex, endIndex);
	};

	const paginatedUnapproved = getPaginatedData(unapprovedPosts, currentPageUnapproved);
	const paginatedApproved = getPaginatedData(approvePosts, currentPageApproved);

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
					{/* Tab control */}
					<div className="flex space-x-4 border-b border-gray-300 mt-4 px-6">
						<button
							className={`py-2 px-4 font-semibold ${activeTab === "unapproved" ? "border-b-4 border-green-600 text-green-700" : "text-gray-600 hover:text-green-700"}`}
							onClick={() => setActiveTab("unapproved")}>
							Waiting approval
						</button>
						<button
							className={`py-2 px-4 font-semibold ${activeTab === "approved" ? "border-b-4 border-green-600 text-green-700" : "text-gray-600 hover:text-green-700"}`}
							onClick={() => setActiveTab("approved")}>
							All posts
						</button>
					</div>
					{/* Tab content */}

					{activeTab === "unapproved" && (
						<div>
							{/* Filter and sort */}

							{/* Table */}
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
										{unapprovedPosts.length === 0 ? (
											<tr>
												<td colSpan="5" className="text-center text-lg px-6 py-4 text-red-500">
													No data retrieved. Check your network or database.
												</td>
											</tr>
										) : (
											paginatedUnapproved.map((post) => (
												<tr key={post.postId} className="border-t hover:bg-gray-50">
													<td className="px-6 py-3">{post.postId}</td>
													<td className="px-6 py-3">{formatDate(post.create_Date)}</td>
													<td className="px-6 py-3">{post.userId}</td>
													<td className="px-6 py-3">{post.title}</td>
													<td className="px-6 py-3">
														<div className="flex justify-end gap-2">
															<button
																onClick={() => {
																	setIsPreviewOpen(true);
																	setSelectedItem(post);
																}}
																className="flex items-center gap-1 px-3 py-1 border rounded text-gray-600 border-gray-600 hover:bg-gray-50 hover:cursor-pointer transition">
																<List className="w-4 h-4" />
																Preview
															</button>
															<button
																onClick={() => {
																	setIsDeleteOpen(true);
																	setSelectedItem(post);
																}}
																className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
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
							{unapprovedPosts.length > 0 && (
								<Pagination currentPage={currentPageUnapproved} totalPages={Math.ceil(unapprovedPosts.length / itemsPerPage)} onPageChange={(page) => setCurrentPageUnapproved(page)} />
							)}
						</div>
					)}

					{activeTab === "approved" && (
						<div>
							{/* Filter and sort */}

							{/* Table */}
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
										{approvePosts.length === 0 ? (
											<tr>
												<td colSpan="5" className="text-center text-lg px-6 py-4 text-red-500">
													No data retrieved. Check your network or database.
												</td>
											</tr>
										) : (
											paginatedApproved.map((post) => (
												<tr key={post.postId} className="border-t hover:bg-gray-50">
													<td className="px-6 py-3">{post.postId}</td>
													<td className="px-6 py-3">{formatDate(post.create_Date)}</td>
													<td className="px-6 py-3">{post.userId}</td>
													<td className="px-6 py-3">{post.title}</td>
													<td className="px-6 py-3">
														<div className="flex justify-end gap-2">
															<button
																onClick={() => {
																	setIsPreviewOpen(true);
																	setSelectedItem(post);
																}}
																className="flex items-center gap-1 px-3 py-1 border rounded text-gray-600 border-gray-600 hover:bg-gray-50 hover:cursor-pointer transition">
																<List className="w-4 h-4" />
																Preview
															</button>
															<button
																onClick={() => {
																	setIsDeleteOpen(true);
																	setSelectedItem(post);
																}}
																className="flex items-center gap-1 px-3 py-1 border rounded text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer transition">
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
							{approvePosts.length > 0 && <Pagination currentPage={currentPageApproved} totalPages={Math.ceil(approvePosts.length / itemsPerPage)} onPageChange={(page) => setCurrentPageApproved(page)} />}
						</div>
					)}

					{/* Preview modal */}
					{isPreviewOpen && selectedItem && (
						<PreviewPost
							isOpen={isPreviewOpen}
							onClose={() => {
								setIsPreviewOpen(false);
								setSelectedItem(null);
								fetchUnapprovedPost();
								fetchApprovedPost();
							}}
							item={selectedItem}
							isApproved={selectedItem.isApproved}
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
									await deletePost(selectedItem.postId);
									toast.success("Delete post success!!!");
								} catch (error) {
									console.error(error);
									toast.error(error?.response?.data?.message || error.message || "Failed to remove post.");
								} finally {
									setIsDeleteOpen(false);
									setSelectedItem(null);
									fetchUnapprovedPost();
									fetchApprovedPost();
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
