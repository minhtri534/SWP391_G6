import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCrown, FaHeartbeat, FaFire, FaStar, FaRocket } from "react-icons/fa";

const quitPlans = [
  {
    id: "light",
    level: "Light Addiction",
    description: "You smoke occasionally or less than 5 cigarettes a day. This plan focuses on identifying triggers and gradually reducing intake.",
  },
  {
    id: "moderate",
    level: "Moderate Addiction",
    description: "You smoke regularly, around 5–10 cigarettes per day. This plan includes scheduled reduction, support tools, and motivational tracking.",
  },
  {
    id: "strong",
    level: "Strong Addiction",
    description: "You smoke a pack a day or more. This plan introduces structured reduction phases, health monitoring, and strong behavioral therapy.",
  },
  {
    id: "severe",
    level: "Severe Addiction",
    description: "You are highly dependent on nicotine, possibly chain-smoking. This plan provides intensive quit support, daily coaching, and relapse prevention strategies.",
  },
];

const ChooseQuitPlan = () => {
  const userName = localStorage.getItem("userName") || "User";
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleStartPlan = (level) => {
    navigate(`/quitplan/${level}`);
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
              <MenuItem label="🔓 Logout" onClick={() => {
                localStorage.clear();
                navigate("/login");
              }} />
            </ul>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center text-green-100 mb-10 flex items-center justify-center gap-2">
          <FaHeartbeat className="text-white" />
          Choose Your Quit Plan
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {quitPlans.map((plan, idx) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                {idx === 0 && <FaStar />}
                {idx === 1 && <FaFire />}
                {idx === 2 && <FaCrown />}
                {idx === 3 && <FaRocket />}
                {plan.level}
              </h3>
              <p className="text-gray-700 mb-6">{plan.description}</p>
              <button
                onClick={() => handleStartPlan(plan.id)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition text-sm"
              >
                Start Now
              </button>
            </div>
          ))}
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

export default ChooseQuitPlan;
