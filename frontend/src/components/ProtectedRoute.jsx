import React from "react";
import { Navigate } from "react-router-dom";
import { getTokenData } from "../api/Auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
	const token = localStorage.getItem("userToken");
	if (!token) return <Navigate to="/login" />;

	try {
		const payload = getTokenData(token);
		const now = Math.floor(Date.now() / 1000);
		if (payload.exp < now) {
			localStorage.clear();
			alert("Session expired. Please login again.");
			return <Navigate to="/login" />;
		}

		const userRole = parseInt(payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
		if (!allowedRoles.includes(userRole)) {
			return <Navigate to="/memberhome" />;
		}

		return children;
	} catch (err) {
		console.error("Token error:", err);
		localStorage.clear();
		return <Navigate to="/login" />;
	}
};

export default ProtectedRoute;
