import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaComments,
  FaUserFriends,
  FaLightbulb,
  FaPaperPlane,
} from "react-icons/fa";

const Forums = () => {
  const userName = localStorage.getItem("userName") || "User";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const [comments, setComments] = useState({
    support: [],
    tips: [],
    general: [],
  });

  const [inputs, setInputs] = useState({
    support: "",
    tips: "",
    general: "",
  });

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

  const handleCommentChange = (type, value) => {
    setInputs((prev) => ({ ...prev, [type]: value }));
  };

  const handleCommentSubmit = (type) => {
    if (inputs[type].trim() === "") return;

    const newComment = {
      name: userName,
      content: inputs[type],
      time: new Date().toLocaleString(),
    };

    setComments((prev) => ({
      ...prev,
      [type]: [...prev[type], newComment],
    }));

    setInputs((prev) => ({ ...prev, [type]: "" }));
  };

  const renderComments = (type) =>
    comments[type].map((c, index) => (
      <div key={index} style={{ marginBottom: "8px" }}>
        <span style={{ fontWeight: "bold", color: "#2e7d32" }}>{c.name}:</span>{" "}
        <span>{c.content}</span>
        <div style={{ fontSize: "12px", color: "#888", marginLeft: "10px" }}>
          {c.time}
        </div>
      </div>
    ));

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
              <MenuItem
                label="👤 Edit Profile"
                onClick={() => navigate("/edit-profile")}
              />
              <MenuItem
                label="🏆 View Achievements"
                onClick={() => navigate("/achievements")}
              />
              <MenuItem
                label="⚙️ Settings"
                onClick={() => navigate("/settings")}
              />
              <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
              <MenuItem label="🔓 Logout" onClick={handleLogout} />
            </ul>
          )}
        </div>
      </header>

      {/* Main */}
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center text-green-100 mb-10 flex items-center justify-center gap-2">
          <FaComments className="text-white" />
          Community Forums
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ForumCard
            title="Support Group"
            icon={<FaUserFriends />}
            description="Connect with other members who are also on their quit journey."
            type="support"
            input={inputs.support}
            onInputChange={handleCommentChange}
            onSubmit={handleCommentSubmit}
            renderComments={renderComments}
          />
          <ForumCard
            title="Tips & Advice"
            icon={<FaLightbulb />}
            description="Share your strategies or learn what has helped others quit successfully."
            type="tips"
            input={inputs.tips}
            onInputChange={handleCommentChange}
            onSubmit={handleCommentSubmit}
            renderComments={renderComments}
          />
          <ForumCard
            title="General Discussion"
            icon={<FaComments />}
            description="Open space to discuss anything related to smoking cessation or lifestyle changes."
            type="general"
            input={inputs.general}
            onInputChange={handleCommentChange}
            onSubmit={handleCommentSubmit}
            renderComments={renderComments}
          />
        </div>
      </div>
    </div>
  );
};

function ForumCard({
  title,
  icon,
  description,
  type,
  input,
  onInputChange,
  onSubmit,
  renderComments,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <div style={{ marginTop: "16px", marginBottom: "10px" }}>
        {renderComments(type)}
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={input}
          onChange={(e) => onInputChange(type, e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm"
          style={{ flex: 1 }}
        />
        <button
          onClick={() => onSubmit(type)}
          className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-1 text-sm"
        >
          <FaPaperPlane />
          Send
        </button>
      </div>
    </div>
  );
}

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

export default Forums;
