import React, { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaClipboardList,
  FaEye,
  FaListUl,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const currentMilestone = {
  title: "Reduce Smoking",
  description: "Cut down to 5 cigarettes per day",
};

const allMilestones = [
  {
    id: 1,
    title: "Start Plan",
    description: "Initial commitment to quit",
    date: "2024-01-01",
  },
  {
    id: 2,
    title: "Week 1 Goal",
    description: "Reduce to 10 cigarettes/day",
    date: "2024-01-08",
  },
  {
    id: 3,
    title: "Week 2 Goal",
    description: "Reduce to 5 cigarettes/day",
    date: "2024-01-15",
  },
];

const QuitPlan = () => {
  const userName = localStorage.getItem("userName") || "User";
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          background: "white",
          borderBottom: "2px solid #ccc",
        }}
      >
        <Link to="/home" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            <span style={{ color: "#f57c00" }}>Quit</span>
            <span style={{ color: "#69c770" }}>Smoking.com</span>
          </h1>
        </Link>
        <div style={{ position: "relative" }} ref={menuRef}>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              background: "white",
              padding: "8px 12px",
              borderRadius: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              fontWeight: "500",
            }}
          >
            <FaUserCircle size={22} color="#4CAF50" />
            <span>{userName}</span>
          </div>
          {menuOpen && (
            <ul
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                background: "white",
                listStyle: "none",
                padding: "10px 0",
                boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                borderRadius: "8px",
                zIndex: 999,
                width: "180px",
              }}
            >
              <MenuItem label="👤 Edit Profile" onClick={() => navigate("/edit-profile")} />
              <MenuItem label="⚙️ Settings" onClick={() => navigate("/settings")} />
              <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
              <MenuItem label="🔓 Logout" onClick={handleLogout} />
            </ul>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center text-green-100 mb-10 flex items-center justify-center gap-2">
          <FaClipboardList className="text-white" />
          Quit Plan
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Current Milestone */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700">
              <FaCalendarAlt />
              Current Milestone
            </h3>
            <p className="text-gray-800">
              <strong>Title:</strong> {currentMilestone.title}
            </p>
            <p className="text-gray-800 mt-2">
              <strong>Description:</strong> {currentMilestone.description}
            </p>
          </div>

          {/* Right: Info */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-green-700">
              <FaRegCalendarCheck />
              Plan Info
            </h3>
            <p className="text-gray-800">
              <strong>Start Date:</strong> 2024-01-01
            </p>
            <p className="text-gray-800">
              <strong>Goal Date:</strong> 2024-04-01
            </p>
            <p className="text-gray-800">
              <strong>Reason:</strong> For better health and family
            </p>
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-lg text-sm shadow-md"
          >
            <FaListUl />
            View All Milestones
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center gap-2">
              <FaClipboardList />
              All Milestones
            </h3>
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {allMilestones.map((m) => (
                <li key={m.id} className="border-b pb-2">
                  <strong>{m.title}</strong> – {m.description}
                  <div className="text-sm text-gray-500">{m.date}</div>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm float-right"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function MenuItem({ label, onClick }) {
  return (
    <li
      onClick={onClick}
      style={{
        padding: "10px 16px",
        fontSize: "14px",
        color: "#333",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f4f4f4")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {label}
    </li>
  );
}

export default QuitPlan;
