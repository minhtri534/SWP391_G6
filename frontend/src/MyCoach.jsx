import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const MyCoach = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const userName = localStorage.getItem("userName") || "User";
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "coach", text: "Hi there! How can I support your quitting journey today?" },
  ]);

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

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { sender: "user", text: chatInput }]);
    setChatInput("");
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

      {/* Main Content */}
      <div style={{ padding: "40px 60px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Coach Info */}
        <div
        style={{
            background: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            flex: "1",
            minWidth: "280px",
            height: "250px", // 👈 Thêm dòng này
            overflowY: "auto", 
        }}
>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#4CAF50", marginBottom: "15px" }}>
            Coach Information
          </h2>
          <p><strong>Name:</strong> John Smith</p>
          <p className="flex items-center gap-2">
            <FaEnvelope style={{ marginRight: "6px", color: "#4CAF50" }} />
            <strong>Email:</strong> coach.john@example.com
          </p>
          <p className="flex items-center gap-2">
            <FaPhone style={{ marginRight: "6px", color: "#4CAF50" }} />
            <strong>Phone:</strong> +1 234 567 890
          </p>
          <p><strong>Specialty:</strong> Behavioral Therapy, Smoking Cessation</p>
          <p><strong>Experience:</strong> 5+ years</p>
        </div>

        {/* Chat Box */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            flex: "2",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            height: "70vh",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#4CAF50", marginBottom: "15px" }}>
            <FaCommentDots style={{ marginRight: "8px" }} />
            Chat with Your Coach
          </h2>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "16px",
              background: "#f9f9f9",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: msg.sender === "user" ? "#a8e063" : "#e0e0e0",
                    color: "#000",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                outline: "none",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#4CAF50",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
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

export default MyCoach;
