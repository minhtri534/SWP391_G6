import React, { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaCrown,
  FaTag,
  FaMoneyBillWave,
  FaShoppingCart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const memberships = [
  {
    id: 1,
    name: "Bronze Package",
    duration: "1 Month",
    price: "$9.99",
  },
  {
    id: 2,
    name: "Silver Package",
    duration: "5 Months",
    price: "$39.99",
  },
  {
    id: 3,
    name: "Gold Package",
    duration: "1 Year",
    price: "$89.99",
  },
];

const Membership = () => {
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleBuy = (packageId) => {
    navigate(`/payment?packageId=${packageId}`);
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
              <MenuItem label="🏆 My Coach" onClick={() => navigate("/mycoach")} />
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
          Membership Packages
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberships.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <FaTag />
                {m.name}
              </h3>

              <p className="text-gray-700 mb-2">
                <strong>Duration:</strong> {m.duration}
              </p>
              <p className="text-gray-700 mb-4 flex items-center gap-2">
                <FaMoneyBillWave />
                <strong>Price:</strong> {m.price}
              </p>

              <button
                onClick={() => handleBuy(m.id)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition text-sm"
              >
                <FaShoppingCart />
                Buy Now
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

export default Membership;
