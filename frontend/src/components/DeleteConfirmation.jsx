import React from "react";

function DeleteConfirmation({ isOpen, onCancel, onConfirm, message }) {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
				<h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
				<p className="mb-6">{message || "Are you sure you want to delete this item?"}</p>
				<div className="flex justify-end gap-3">
					<button onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-100">
						Cancel
					</button>
					<button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteConfirmation;
