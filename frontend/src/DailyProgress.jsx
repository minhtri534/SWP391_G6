import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaStickyNote, FaSmileBeam, FaHeartbeat, FaCalendarAlt } from "react-icons/fa";

// Initial mock data
const initialProgressData = {
  note: "",
  no_smoking: false,
  symptoms: "",
  date: new Date().toISOString().slice(0, 10), // Default to current date
};

const DailyProgress = () => {
  const userName = localStorage.getItem("userName") || "User";
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(initialProgressData);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("dailyProgress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save data to localStorage when progress changes
  useEffect(() => {
    localStorage.setItem("dailyProgress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProgress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("dailyProgress", JSON.stringify(progress));
    alert("Progress saved successfully!");
  };

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        minHeight: "100vh",
        color: "#111",
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
      <div style={{ padding: "32px" }}>
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
              <FaStickyNote />
              Note
            </h3>
            <input
              type="text"
              name="note"
              value={progress.note}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
              placeholder="Enter your note here"
            />
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
              <FaSmileBeam />
              No Smoking
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                name="no_smoking"
                checked={progress.no_smoking}
                onChange={handleChange}
                style={{ transform: "scale(1.5)", marginRight: "8px" }}
              />
              <label>No smoking today</label>
            </div>
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
              Symptoms
            </h3>
            <textarea
              name="symptoms"
              value={progress.symptoms}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db", minHeight: "80px" }}
              placeholder="Enter symptoms here"
            />
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
              <FaCalendarAlt />
              Date
            </h3>
            <input
              type="date"
              name="date"
              value={progress.date}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db" }}
            />
          </div>
        </div>

        {/* Save button */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#15803d",
              color: "white",
              fontSize: "1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#146c43")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#15803d")}
          >
            Save Progress
          </button>
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