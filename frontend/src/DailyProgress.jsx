import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaStickyNote, FaSmileBeam, FaHeartbeat, FaCalendarAlt, FaBars, FaWindowClose } from "react-icons/fa";

// Import các hàm API
import { getDailyProgress } from "./api/Progress";
import { createDailyProgress, updateDailyProgress } from "./api/DailyProgress";

const DailyProgress = () => {
  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState({
    progressId: null,
    note: "",
    no_smoking: false,
    symptoms: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [allProgress, setAllProgress] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (isoDateString) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // --- Logic tải Daily Progress của người dùng ---
  useEffect(() => {
    const fetchUserDailyProgress = async () => {
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const today = new Date().toISOString().slice(0, 10);
        const todayProgress = (await getDailyProgress(userId, today)[0] || null);
        setProgress(todayProgress || { progressId: null, note: "", no_smoking: false, symptoms: "", date: today });

        setAllProgress(await getDailyProgress(userId, null));
      } catch (err) {
        console.error("Error fetching daily progress:", err);
        setError(err.message || "Failed to load daily progress.");
        setProgress({ progressId: null, note: "", no_smoking: false, symptoms: "", date: new Date().toISOString().slice(0, 10) });
      } finally {
        setLoading(false);
      }
    };
    fetchUserDailyProgress();
  }, [userId]);

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
    if (name !== "date") {
      setProgress((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // --- Logic Lưu (Create/Update) Daily Progress ---
  const handleSave = async () => {
    if (!userId) {
      alert("Please log in to save your progress.");
      return;
    }

    const progressDataToSend = {
      userId: userId,
      note: progress.note,
      no_smoking: progress.no_smoking,
      symptoms: progress.symptoms,
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      setLoading(true);
      if (progress.progressId) {
        const updatedEntry = await updateDailyProgress(progress.progressId, progressDataToSend);
        setProgress((prev) => ({ ...prev, ...updatedEntry }));
        setAllProgress(await getDailyProgress(userId)); // Cập nhật lại toàn bộ lịch sử
        alert("Progress updated successfully!");
      } else {
        const newEntry = await createDailyProgress(progressDataToSend);
        setProgress((prev) => ({ ...prev, ...newEntry }));
        setAllProgress(await getDailyProgress(userId)); // Cập nhật lại toàn bộ lịch sử
        alert("Progress saved successfully!");
      }
      setError(null);
    } catch (err) {
      console.error("Error saving daily progress:", err);
      setError(err.message || "Failed to save daily progress.");
      alert(`Error: ${err.message || "Failed to save progress."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const hasTodayProgress = allProgress.some(p => p.date === new Date().toISOString().slice(0, 10));

  if (loading) {
    return (
      <div style={{
        fontFamily: '"Segoe UI", sans-serif',
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "1.5rem"
      }}>
        Loading daily progress...
      </div>
    );
  }

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
              <MenuItem label="🏆 My Coach" onClick={() => navigate("/mycoach")} />
              <MenuItem label="⚙️ Settings" onClick={() => navigate("/settings")} />
              <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
              <MenuItem label="🔓 Logout" onClick={handleLogout} />
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

        {error && (
          <div style={{
            background: "#ffe0b2",
            color: "#e65100",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "bold"
          }}>
            {error}
          </div>
        )}

        {/* Danh sách các ngày đã ghi */}
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {allProgress.length > 0 ? (
            allProgress.map((p, index) => (
              <div
                key={p.progressId || index}
                style={{
                  background: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 7px 10px rgba(0,0,0,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")}
              >
                <span style={{ fontSize: "1.2rem", color: "#15803d" }}>{formatDate(p.date)}</span>
                <button
                  onClick={() => setSelectedProgress(p)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "#15803d",
                  }}
                >
                  <FaBars />
                </button>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", color: "white" }}>No previous progress recorded.</div>
          )}
        </div>

        {/* Form nhập liệu cho ngày hiện tại */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "2rem auto 0",
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
              type="text"
              value={formatDate(progress.date)}
              readOnly
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem", borderRadius: "0.375rem", border: "1px solid #d1d5db", backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />
          </div>
        </div>

        {/* Save button */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={handleSave}
            disabled={!progress.progressId && hasTodayProgress}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#15803d",
              color: "white",
              fontSize: "1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: (!progress.progressId && hasTodayProgress) ? "not-allowed" : "pointer",
              fontWeight: "bold",
              transition: "background 0.3s",
              opacity: (!progress.progressId && hasTodayProgress) ? 0.5 : 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = (!progress.progressId && hasTodayProgress) ? "#15803d" : "#146c43")}
            onMouseLeave={(e) => (e.currentTarget.style.background = (!progress.progressId && hasTodayProgress) ? "#15803d" : "#15803d")}
          >
            {progress.progressId || hasTodayProgress ? "Update Progress" : "Save Progress"}
          </button>
        </div>

        {/* Popup chi tiết daily progress */}
        {selectedProgress && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
              <button
                onClick={() => setSelectedProgress(null)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <FaWindowClose size={24} />
              </button>
              <h3 className="text-xl font-bold mb-4 text-green-700">Daily Progress - {formatDate(selectedProgress.date)}</h3>
              <ul className="list-decimal list-inside text-gray-800 space-y-2">
                <li><strong>Note:</strong> {selectedProgress.note || "No note"}</li>
                <li><strong>No Smoking:</strong> {selectedProgress.no_smoking ? "Yes" : "No"}</li>
                <li><strong>Symptoms:</strong> {selectedProgress.symptoms || "None"}</li>
                <li><strong>Date:</strong> {formatDate(selectedProgress.date)}</li>
              </ul>
            </div>
          </div>
        )}
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
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f4f0f4")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {label}
    </li>
  );
}

export default DailyProgress;