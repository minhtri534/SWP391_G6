import { Bell, CircleUserRound } from "lucide-react";
import React from "react";

function CoachTopbar({ title }) {
	return (
		<div className="flex justify-between items-center p-4 bg-green-300">
			<h1 className="text-2xl font-semibold">{title}</h1>
			<div className="flex items-center gap-4">
				<Bell className="w-6 h-6" />
				<CircleUserRound className="w-8 h-8" />
			</div>
		</div>
	);
}

export default CoachTopbar;
