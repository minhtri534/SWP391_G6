import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
	const [inputPage, setInputPage] = useState("");

	const generateVisiblePages = () => {
		const pages = new Set();

		// Always add first two pages if they exist
		if (totalPages >= 1) pages.add(1);
		if (totalPages >= 2) pages.add(2);

		// Always add last two pages if they are different from first two
		if (totalPages > 2) pages.add(totalPages);
		if (totalPages > 3) pages.add(totalPages - 1);

		// Add pages around current
		for (let i = currentPage - 2; i <= currentPage + 2; i++) {
			if (i >= 1 && i <= totalPages) {
				pages.add(i);
			}
		}

		return Array.from(pages).sort((a, b) => a - b);
	};

	const visiblePages = generateVisiblePages();

	const renderPagesWithEllipsis = () => {
		const elements = [];
		for (let i = 0; i < visiblePages.length; i++) {
			const page = visiblePages[i];

			// Add ellipsis if gap from previous page
			if (i > 0 && page - visiblePages[i - 1] > 1) {
				elements.push(
					<span key={`ellipsis-${i}`} className="px-2">
						...
					</span>
				);
			}

			elements.push(
				<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1 border rounded ${page === currentPage ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}>
					{page}
				</button>
			);
		}
		return elements;
	};

	return (
		<div className="flex flex-wrap justify-center items-center mt-4 gap-2">
			{/* Prev Button */}
			<button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
				<ChevronLeft />
			</button>

			{/* Page Numbers with Ellipsis */}
			{renderPagesWithEllipsis()}

			{/* Next Button */}
			<button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
				<ChevronRight />
			</button>

			{/* Go to page */}
			<div className="flex items-center gap-2 ml-4">
				<span>Go to:</span>
				<input type="number" min="1" max={totalPages} value={inputPage} onChange={(e) => setInputPage(e.target.value)} className="w-16 px-2 py-1 border rounded" />
				<button
					onClick={() => {
						const page = parseInt(inputPage);
						if (!isNaN(page) && page >= 1 && page <= totalPages) {
							onPageChange(page);
							setInputPage("");
						}
					}}
					className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
					Go
				</button>
			</div>
		</div>
	);
}

export default Pagination;
