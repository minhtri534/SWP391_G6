import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHeartbeat, FaFire, FaStar, FaLeaf } from "react-icons/fa";

// Mock data for daily progress (member-facing keys only)
const progressData = {
  daysSmokeFree: 7,
  cigarettesAvoided: 35,
  healthBenefits: "Improved lung capacity and better energy levels!",
  motivationalMessage: "You're doing great! Keep up the momentum!",
};

const DailyProgress = () => {
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

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        minHeight: "100vh",
        color: "#111", // Đảm bảo màu chữ có thể nhìn thấy trên nền gradient
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
        <Link to="/memberhome" style={{ textDecoration: "none" }}>
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
      <div style={{ padding: "32px" }}> {/* Thay thế p-8 bằng padding cố định */}
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2.5rem",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}>
          <FaHeartbeat style={{ color: "#ffffff" }} />
          Your Daily Progress
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          <div style={{
            background: "white",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "1.5rem",
            transition: "box-shadow 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 7px 10px rgba(0,0,0,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#15803d",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <FaLeaf />
              Days Smoke-Free
            </h3>
            <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1.5rem" }}>
              {progressData.daysSmokeFree} days
            </p>
          </div>
          <div style={{
            background: "white",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "1.5rem",
            transition: "box-shadow 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 7px 10px rgba(0,0,0,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#15803d",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <FaFire />
              Cigarettes Avoided
            </h3>
            <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1.5rem" }}>
              {progressData.cigarettesAvoided}
            </p>
          </div>
          <div style={{
            background: "white",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "1.5rem",
            transition: "box-shadow 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 7px 10px rgba(0,0,0,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#15803d",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <FaHeartbeat />
              Health Benefits
            </h3>
            <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1.5rem" }}>
              {progressData.healthBenefits}
            </p>
          </div>
          <div style={{
            background: "white",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "1.5rem",
            transition: "box-shadow 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 7px 10px rgba(0,0,0,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")}>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#15803d",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              <FaStar />
              Motivation
            </h3>
            <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1.5rem" }}>
              {progressData.motivationalMessage}
            </p>
          </div>
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

export default DailyProgress;