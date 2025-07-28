// src/components/Pagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
	const pages = [];

	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}

	return (
		<div className="flex justify-center items-center mt-4 gap-2">
			<button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
				<ChevronLeft />
			</button>

			{pages.map((page) => (
				<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1 border rounded ${page === currentPage ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}>
					{page}
				</button>
			))}

			<button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
				<ChevronRight />
			</button>
		</div>
	);
}

export default Pagination;
