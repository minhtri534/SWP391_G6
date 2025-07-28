import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaStickyNote, FaSmileBeam, FaHeartbeat, FaCalendarAlt } from "react-icons/fa";

// Import các hàm API từ DailyProgress.js
import {
  getDailyProgressByUserId,
  createDailyProgress,
  updateDailyProgress,
} from "./api/DailyProgress"; // Đảm bảo đường dẫn này đúng
import { getDailyProgress } from "./api/Progress";

const DailyProgress = () => {
  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState({
    progressId: null, // Thêm trường progressId để theo dõi mục tiến độ hiện tại
    note: "",
    no_smoking: false,
    symptoms: "",
    date: new Date().toISOString().slice(0, 10), // Default to current date
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef();
  const navigate = useNavigate();

  // --- Logic tải Daily Progress hiện tại của người dùng ---
  useEffect(() => {
    const fetchUserDailyProgress = async () => {
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Lấy tất cả progress của người dùng
        // const userProgressList = await getDailyProgressByUserId(userId);
        const today = new Date().toISOString().slice(0, 10);
        const todayProgress = (await getDailyProgress(userId, today))[0];
        console.log(todayProgress)
        
        // Tìm tiến độ của ngày hôm nay
        
        //const todayProgress = userProgressList.find(p => p.date == today);

        if (todayProgress) {
          // Nếu có tiến độ cho ngày hôm nay, tải nó vào form
          setProgress(todayProgress );
        } else {
          // Nếu không có tiến độ cho ngày hôm nay, reset form và đặt ngày hiện tại
          setProgress({
            progressId: null, // Đặt null để báo hiệu đây là mục mới cần tạo
            note: "",
            no_smoking: false,
            symptoms: "",
            date: today,
          });
        }
      } catch (err) {
        console.error("Error fetching daily progress:", err);
        setError(err.message || "Failed to load daily progress.");
        // Nếu lỗi, vẫn reset form để người dùng có thể nhập mới
        setProgress({
          progressId: null,
          note: "",
          no_smoking: false,
          symptoms: "",
          date: new Date().toISOString().slice(0, 10),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDailyProgress();
  }, [userId]); // Chạy lại khi userId thay đổi (người dùng đăng nhập/đăng xuất)

  // Lưu ý: Loại bỏ useEffect cũ để lưu vào localStorage vì giờ chúng ta dùng API
  // useEffect(() => {
  //   localStorage.setItem("dailyProgress", JSON.stringify(progress));
  // }, [progress]);

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
      date: progress.date,
    };

    try {
      setLoading(true);
      if (progress.progressId) {
        // Nếu có progressId, tức là đang cập nhật mục hiện có
        const updatedEntry = await updateDailyProgress(progress.progressId, progressDataToSend);
        setProgress((prev) => ({ ...prev, ...updatedEntry })); // Cập nhật state với dữ liệu mới từ server
        alert("Progress updated successfully!");
      } else {
        // Nếu không có progressId, tức là tạo mục mới
        const newEntry = await createDailyProgress(progressDataToSend);
        setProgress((prev) => ({ ...prev, ...newEntry })); // Cập nhật state với progressId mới từ server
        alert("Progress saved successfully!");
      }
      setError(null); // Xóa lỗi nếu có
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
            {progress.progressId ? "Update Progress" : "Save Progress"}
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