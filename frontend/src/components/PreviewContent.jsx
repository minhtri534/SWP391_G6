import React, { useEffect, useState } from "react";
import { getPostById } from "../api/Post";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { getCommentById } from "../api/Comment";
import DeleteConfirmation from "./DeleteConfirmation";
import { deleteReport, deleteReportedComment, deleteReportedPost } from "../api/Report";

function PreviewContent({ isOpen, onClose, item }) {
	const [data, setData] = useState(null);

	// Get chosen post or comment function
	const fetchItem = async () => {
		try {
			if (item.postId !== null) {
				const response = await getPostById(item.postId);
				setData(response);
			} else if (item.commentId !== null) {
				const response = await getCommentById(item.commentId);
				setData(response);
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	// Get content
	useEffect(() => {
		if (!item) return;
		fetchItem();
	}, [item]);

	const handleClose = () => {
		onClose();
	};

	const handleRemove = async () => {
		try {
			if (item.postId && data) {
				await deleteReportedPost(item.postId, data.userId);
				toast.success("Post deleted successfully!");
			} else if (item.commentId && data) {
				await deleteReportedComment(item.commentId, data.userId);
				toast.success("Comment deleted successfully!");
			} else {
				await deleteReport(item.reportId, item.userId);
				toast.success("Report deleted successfully!");
			}
			handleClose();
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	//Delete confirmation
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [confirmMsg, setConfirmMsg] = useState("");

	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			{console.log(item, data)}
			<div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
				<button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">Preview</h2>

				<div className="text-gray-700 mb-6">
					{data && item ? (
						<div>
							<p className="mb-2">
								<strong>User ID:</strong> {data.userId}
							</p>
							{data.title && (
								<p className="mb-2">
									<strong>Title:</strong> {data.title}
								</p>
							)}
							<p>
								<strong>Content:</strong> {data.content} <br />
								<strong>Reason:</strong> {item.content}
							</p>
						</div>
					) : (
						<p>Loading content...</p>
					)}
				</div>

				<div className="flex justify-end gap-2 mt-4">
					<button onClick={handleClose} className="px-4 py-2 border rounded hover:bg-gray-100">
						Cancel
					</button>
					<button
						onClick={() => {
							setIsConfirmOpen(true);
							setConfirmMsg(`Remove this ${item.postId ? "post" : "comment"}?`);
						}}
						className="px-4 py-2 border rounded bg-red-100 text-red-600 hover:bg-red-200">
						Remove {item.postId ? "Post" : "Comment"}
					</button>
					<button
						onClick={() => {
							setIsConfirmOpen(true);
							setConfirmMsg("Remove this report?");
						}}
						className="px-4 py-2 border rounded bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
						Remove Report
					</button>
				</div>
			</div>

			<DeleteConfirmation
				isOpen={isConfirmOpen}
				onCancel={() => {
					setIsConfirmOpen(false);
					setConfirmMsg("");
				}}
				message={confirmMsg}
				onConfirm={() => {
					handleRemove();
					setIsConfirmOpen(false);
					setConfirmMsg("");
				}}
			/>
		</div>
	);
}

export default PreviewContent;
