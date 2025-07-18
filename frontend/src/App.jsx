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
import Achievements from "./Achievements";
import Settings from "./Settings";
import Forums from "./Forums";
import QuitPlan from "./QuitPlan";
import ChooseQuitPlan from "./ChooseQuitPlan";
import MyCoach from "./MyCoach";
import Badges from "./Badges";

// Admin routes
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
          <Route path="/payment" element={<Payment />} />
          <Route path="/platform-feedback" element={<PlatformFeedback />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/quitplan" element={<QuitPlan />} />
          <Route path="/choosequitplan" element={<ChooseQuitPlan />} />
          <Route path="/quitplan/:level" element={<QuitPlan />} /> 
          <Route path="/mycoach" element={<MyCoach />} /> 
          <Route path="/badges" element={<Badges />} />


          {/* Admin routing */}
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
