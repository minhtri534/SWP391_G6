import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Membership from "./Membership";
import LoggedInHome from "./LoggedInHome"; // đúng đường dẫn

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/home" element={<LoggedInHome user={{ name: "Minh Tri" }} />} />
        </Routes>

        {/* Toast hiển thị thông báo ở góc dưới bên phải */}
        <ToastContainer position="bottom-right" autoClose={10000} />
      </>
    </Router>
  );
}

export default App;
