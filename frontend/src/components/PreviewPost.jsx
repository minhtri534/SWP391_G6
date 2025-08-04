import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { approvePost, deletePost } from "../api/Post";
import DeleteConfirmation from "./DeleteConfirmation";

function PreviewPost({ isOpen, onClose, item, isApproved }) {
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	//Format date
	const formatDate = (isoDateString) => {
		if (!isoDateString) return "";
		const date = new Date(isoDateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	// Approve post function
	const handleApprove = async () => {
		try {
			await approvePost(item.postId);
			toast.success("Post approved!!!");
			handleClose();
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	const handleClose = () => {
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
				<button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">Preview</h2>
				{console.log(item)}
				<div className="flex items-start gap-3 mb-4">
					<div className="w-10 h-10 rounded-full bg-gray-300" />
					<div className="flex flex-col">
						<span className="font-semibold text-sm">{item.userName}</span>
						<span className="text-xs text-gray-500">{formatDate(item.create_Date)}</span>
					</div>
				</div>
				<div className="text-lg font-semibold mb-2">{item.title}</div>
				<div className="text-gray-800 whitespace-pre-line">{item.content}</div>
				<div className="flex justify-end gap-2 mt-4">
					{!isApproved && (
						<button onClick={handleApprove} className="px-4 py-2 border rounded  bg-green-100 text-green-600 hover:bg-green-200">
							Approve
						</button>
					)}
					<button onClick={() => setIsConfirmOpen(true)} className="px-4 py-2 border rounded  bg-red-100 text-red-600 hover:bg-red-200">
						Delete
					</button>
					<button onClick={handleClose} className="px-4 py-2 border rounded hover:bg-gray-100">
						Close
					</button>
				</div>
				{/* Delete confirmation */}
				{isConfirmOpen && (
					<DeleteConfirmation
						isOpen={isConfirmOpen}
						onCancel={() => setIsConfirmOpen(false)}
						message={`Do you want to remove this post?`}
						onConfirm={async () => {
							try {
								await deletePost(item.postId);
								toast.success("Delete post success!!!");
								handleClose();
							} catch (error) {
								console.error(error);
								toast.error(error?.response?.data?.message || error.message || "Failed to delete post.");
							} finally {
								setIsConfirmOpen(false);
							}
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default PreviewPost;
