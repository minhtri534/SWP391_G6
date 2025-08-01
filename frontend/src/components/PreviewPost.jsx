import { X } from "lucide-react";
import React from "react";

function PreviewPost({ isOpen, onClose, item }) {
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
				<div className="text-gray-700 mb-6">This is the post need approval</div>
				<div className="flex justify-end gap-2 mt-4">
					<button onClick={handleClose} className="px-4 py-2 border rounded hover:bg-gray-100">
						Close
					</button>
					<button onClick={handleClose} className="px-4 py-2 border rounded  bg-green-100 text-green-600 hover:bg-green-200">
						Approve
					</button>
					<button onClick={handleClose} className="px-4 py-2 border rounded  bg-red-100 text-red-600 hover:bg-red-200">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default PreviewPost;
