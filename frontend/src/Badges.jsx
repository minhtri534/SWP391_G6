import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaCrown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const allBadges = [
  { id: 1, name: "Smoke-Free Week", description: "Completed one week without smoking.", issuedDate: "2025-06-01", achieved: true },
  { id: 2, name: "30 Days Strong", description: "Completed 30 days smoke-free.", issuedDate: "2025-07-01", achieved: true },
  { id: 3, name: "First Check-in", description: "Completed your first progress check-in.", issuedDate: "2025-06-05", achieved: true },
  { id: 4, name: "Community Helper", description: "Helped someone in the forum.", achieved: false },
  { id: 5, name: "Milestone Master", description: "Completed all milestones in your plan.", achieved: false },
  { id: 6, name: "Motivation Speaker", description: "Shared motivation story in community.", achieved: false }
];

const Badges = () => {
  const userName = localStorage.getItem("userName") || "User";
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const [showAchieved, setShowAchieved] = useState(true);
  const filteredBadges = allBadges.filter(badge => badge.achieved === showAchieved);

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
              <MenuItem label="🏆 View Achievements" onClick={() => navigate("/achievements")} />
              <MenuItem label="⚙️ Settings" onClick={() => navigate("/settings")} />
              <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
              <MenuItem label="🔓 Logout" onClick={handleLogout} />
            </ul>
          )}
        </div>
      </header>

      {/* Main */}
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center text-green-100 mb-10 flex items-center justify-center gap-2">
          <FaCrown className="text-white" />
          {showAchieved ? "Your Achieved Badges" : "Badges You Haven’t Achieved Yet"}
        </h2>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <button
            onClick={() => setShowAchieved(!showAchieved)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded text-sm transition"
          >
            {showAchieved ? "View Unachieved Badges" : "View Achieved Badges"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.length > 0 ? (
            filteredBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {badge.name}
                </h3>
                <p className="text-gray-700 mb-2">{badge.description}</p>
                {badge.issuedDate && (
                  <p className="text-gray-400 text-sm">
                    <strong>Issued:</strong> {badge.issuedDate}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-white text-center w-full text-md">
              {showAchieved
                ? "You haven’t achieved any badges yet. Keep going!"
                : "You’ve achieved all badges. Great job!"}
            </div>
          )}
        </div>
      </div>
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

export default Badges;
