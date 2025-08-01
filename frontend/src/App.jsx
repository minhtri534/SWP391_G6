import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Các trang
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Membership from "./Membership";
import LoggedInHome from "./LoggedInHome";
import BookingCoach from "./BookingCoach";
import SmokingSelfReport from "./SmokingSelfReport";
import PlatformFeedback from "./PlatformFeedback";
import Payment from "./Payment";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import Forums from "./Forums";
import QuitPlan from "./QuitPlan";
import ChooseQuitPlan from "./ChooseQuitPlan";
import MyCoach from "./MyCoach";
import Badges from "./Badges";
import DailyProgress from "./DailyProgress";
import MemberHome from "./MemberHome";

// Admin routes
import AdminDashboard from "./routes/admin/AdminDashboard";
import ManageAccounts from "./routes/admin/ManageAccounts";
import ManageBadges from "./routes/admin/ManageBadges";
import ManageReport from "./routes/admin/ManageReport";
import ManageIncome from "./routes/admin/ManageIncome";

//Coach routes
import CoachHome from "./routes/coach/CoachHome";
import CoachingMember from "./routes/coach/CoachingMember";
import CoachFeedback from "./routes/coach/CoachFeedback";
import CoachNotification from "./routes/coach/CoachNotification";
import { getTokenData } from "./api/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagePosts from "./routes/admin/ManagePosts";

function App() {
	const AlreadyLoggedIn = ({ children }) => {
		const token = localStorage.getItem("userToken");
		if (token) {
			try {
				const payload = getTokenData(token);
				const now = Math.floor(Date.now() / 1000);
				if (payload.exp > now) {
					// Redirect based on role
					const role = parseInt(payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
					if (role === 4) return <Navigate to="/Admin/Dashboard" />;
					if (role === 3) return <Navigate to="/Coach/Home" />;
					return <Navigate to="/memberhome" />;
				}
			} catch (e) {
				localStorage.clear();
			}
		}
		return children;
	};

	return (
		<Router>
			<>
				<Routes>
					<Route
						path="/"
						element={
							<AlreadyLoggedIn>
								<Home />
							</AlreadyLoggedIn>
						}
					/>
					<Route
						path="/login"
						element={
							<AlreadyLoggedIn>
								<Login />
							</AlreadyLoggedIn>
						}
					/>
					<Route
						path="/signup"
						element={
							<AlreadyLoggedIn>
								<Signup />
							</AlreadyLoggedIn>
						}
					/>

					<Route path="/membership" element={<Membership />} />
					<Route path="/coaching" element={<BookingCoach />} />
					<Route path="/report" element={<SmokingSelfReport />} />
					<Route path="/home" element={<LoggedInHome />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/platform-feedback" element={<PlatformFeedback />} />
					<Route path="/edit-profile" element={<EditProfile />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/forums" element={<Forums />} />
					<Route path="/quitplan" element={<QuitPlan />} />
					<Route path="/choosequitplan" element={<ChooseQuitPlan />} />
					<Route path="/quitplan/:level" element={<QuitPlan />} />
					<Route path="/mycoach" element={<MyCoach />} />
					<Route path="/badges" element={<Badges />} />
					<Route path="/dailyprogress" element={<DailyProgress />} />
					<Route path="/memberhome" element={<MemberHome />} />

					{/* Admin routing. Need to have role Admin to use  */}
					<Route
						path="/Admin/Dashboard"
						element={
							<ProtectedRoute allowedRoles={[4]}>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/Admin/ManageAccounts"
						element={
							<ProtectedRoute allowedRoles={[4]}>
								<ManageAccounts />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/Admin/ManageBadges"
						element={
							<ProtectedRoute allowedRoles={[4]}>
								<ManageBadges />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/Admin/ManageReport"
						element={
							<ProtectedRoute allowedRoles={[4]}>
								<ManageReport />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/Admin/ManageIncome"
						element={
							<ProtectedRoute allowedRoles={[4]}>
								<ManageIncome />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/Admin/ManagePost"
						element={
							<ProtectedRoute allowedRoles={[4]}>
								<ManagePosts />
							</ProtectedRoute>
						}
					/>

					{/* Coach routing. Need to have role Coach to use */}
					<Route
						path="/Coach/Home"
						element={
							<ProtectedRoute allowedRoles={[3]}>
								<CoachHome />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/Coach/Member"
						element={
							<ProtectedRoute allowedRoles={[3]}>
								<CoachingMember />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/Coach/Notification"
						element={
							<ProtectedRoute allowedRoles={[3]}>
								<CoachNotification />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/Coach/Feedback"
						element={
							<ProtectedRoute allowedRoles={[3]}>
								<CoachFeedback />
							</ProtectedRoute>
						}
					/>
				</Routes>

				{/* Toast hiển thị thông báo ở góc dưới bên phải */}
				<ToastContainer position="bottom-right" autoClose={3000} />
			</>
		</Router>
	);
}

export default App;
