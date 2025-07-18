import React, { useState, useRef, useEffect } from "react";
import {
  FaStar,
  FaUserTie,
  FaCalendarAlt,
  FaRegCheckCircle,
  FaTimesCircle,
  FaUserCheck,
  FaDollarSign,
  FaLink,
  FaFileUpload,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const coaches = [
  {
    id: 1,
    name: "Coach John",
    review: "Great for beginners",
    stars: 4,
    status: "Available",
    type: "Fitness & Wellness",
    startDate: "2025-07-20",
    endDate: "2025-08-20",
  },
  {
    id: 2,
    name: "Coach Lisa",
    review: "Amazing support!",
    stars: 5,
    status: "Available",
    type: "Mental Support",
    startDate: "2025-07-25",
    endDate: "2025-08-25",
  },
  {
    id: 3,
    name: "Coach Mark",
    review: "Strict but effective",
    stars: 3,
    status: "Unavailable",
    type: "Quit Strategy Planning",
    startDate: "2025-07-22",
    endDate: "2025-08-22",
  },
];

const BookingCoach = () => {
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  const handleBuyClick = (coach) => {
    setSelectedCoach(coach);
  };

  const closePopup = () => {
    setSelectedCoach(null);
    setReceipt(null);
  };

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

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-4xl font-bold text-center text-green-100 mb-10 flex items-center justify-center gap-2">
          <FaUserCheck className="text-white" />
          Buy a Coach
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2">
                <FaUserTie /> {coach.name}
              </h3>

              <p className="text-gray-600 mb-1 flex items-center gap-2">
                {[...Array(coach.stars)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                <span className="ml-2">{coach.review}</span>
              </p>

              <p className="text-gray-600 mb-1 flex items-center gap-2">
                {coach.status === "Available" ? (
                  <FaRegCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
                <strong>Status:</strong> {coach.status}
              </p>

              <p className="text-gray-600 mb-1 flex items-center gap-2">
                <FaUserTie />
                <strong>Type:</strong> {coach.type}
              </p>

              <p className="text-gray-600 mb-1 flex items-center gap-2">
                <FaCalendarAlt />
                <strong>Start:</strong> {coach.startDate}
              </p>

              <p className="text-gray-600 mb-4 flex items-center gap-2">
                <FaCalendarAlt />
                <strong>End:</strong> {coach.endDate}
              </p>

              <button
                onClick={() => handleBuyClick(coach)}
                disabled={coach.status !== "Available"}
                className={`w-full py-2 rounded-lg font-semibold transition ${
                  coach.status === "Available"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                {coach.status === "Available" ? "Buy Coach" : "Unavailable"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Popup */}
      {selectedCoach && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
              <FaDollarSign />
              Payment for {selectedCoach.name}
            </h3>

            <p className="mb-4 text-gray-700">
              Please complete your payment using the link below. After payment,
              upload a receipt image as proof.
            </p>

            <div className="mb-4 flex items-center gap-2">
              <FaLink className="text-blue-600" />
              <a
                href="https://example-payment-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                👉 Payment Link
              </a>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-700 flex items-center gap-2">
                <FaFileUpload />
                Upload Receipt:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReceipt(e.target.files[0])}
                className="border p-2 rounded w-full"
              />
            </div>

            <button
              onClick={() => {
                alert("Receipt submitted (local only).");
                closePopup();
              }}
              className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition"
              disabled={!receipt}
            >
              Submit Receipt
            </button>
          </div>
        </div>
      )}
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

export default BookingCoach;
