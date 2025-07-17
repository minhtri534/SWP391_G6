import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function UserDropdownMenu({ userName }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Tắt dropdown nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div ref={menuRef} style={{ position: "relative", display: "inline-block" }}>
      <div
        onClick={() => setOpen(!open)}
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

      {open && (
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
          <MenuItem label="👤 Edit Profile" onClick={() => handleNavigate("/edit-profile")} />
          <MenuItem label="🏆 View Achievements" onClick={() => handleNavigate("/achievements")} />
          <MenuItem label="⚙️ Settings" onClick={() => handleNavigate("/settings")} />
          <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
          <MenuItem label="🔓 Logout" onClick={handleLogout} />
        </ul>
      )}
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

export default UserDropdownMenu;
