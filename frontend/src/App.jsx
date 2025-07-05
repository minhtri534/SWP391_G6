import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingCoach from "./BookingCoach";
import SmokingSelfReport from "./SmokingSelfReport";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Membership from "./Membership";
import LoggedInHome from "./LoggedInHome"; // đúng đường dẫn
import AdminDashboard from "./routes/admin/AdminDashboard";
import ManageAccounts from "./routes/admin/ManageAccounts";
import ManageBadges from "./routes/admin/ManageBadges";
import ManageReport from "./routes/admin/ManageReport";
import CoachHome from "./routes/coach/CoachHome";
import CoachingMember from "./routes/coach/CoachingMember";
import CoachFeedback from "./routes/coach/CoachFeedback";
import CoachNotification from "./routes/coach/CoachNotification";

function App() {
	return (
		<Router>
			<>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/membership" element={<Membership />} />
					<Route path="/coaching" element={<BookingCoach />} />
					<Route path="/report" element={<SmokingSelfReport />} />
					<Route path="/home" element={<LoggedInHome user={{ name: "Minh Tri" }} />} />

					{/* Admin routing. Need to have role ADMIN to use */}
					<Route path="/Admin/Dashboard" element={<AdminDashboard />} />
					<Route path="/Admin/ManageAccounts" element={<ManageAccounts />} />
					<Route path="/Admin/ManageBadges" element={<ManageBadges />} />
					<Route path="/Admin/ManageReport" element={<ManageReport />} />

					{/* Coach routing. Need to have role COACH to use */}
					<Route path="/Coach/Home" element={<CoachHome />} />
					<Route path="/Coach/Member" element={<CoachingMember />} />
					<Route path="/Coach/Notification" element={<CoachNotification />} />
					<Route path="/Coach/Feedback" element={<CoachFeedback />} />
				</Routes>

				{/* Toast hiển thị thông báo ở góc dưới bên phải */}
				<ToastContainer position="bottom-right" autoClose={3000} />
			</>
		</Router>
	);
}

export default App;
