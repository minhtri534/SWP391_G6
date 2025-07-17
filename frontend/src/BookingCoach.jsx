import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BookingCoach() {
  const userName = "Minh Tri";
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to bottom right, #a8e063, #56ab2f)",
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
        <div
          style={{ fontSize: "20px", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          <span style={{ color: "#f57c00" }}>Quit</span>
          <span style={{ color: "#69c770" }}>Smoking.com</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "500" }}>
          <FaUserCircle size={24} />
          <span>{userName}</span>
        </div>
      </header>

      {/* Booking Form Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "600px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#2e7d32",
              marginBottom: "30px",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            Book a Coaching Session
          </h2>

          <form>
            {/* Full Name */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" placeholder="Your name" style={inputStyle} />
            </div>

            {/* Phone Number */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" placeholder="e.g. 0987 123 456" style={inputStyle} />
            </div>

            {/* Preferred Date */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Preferred Date</label>
              <input type="date" style={inputStyle} />
            </div>

            {/* Preferred Time */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Preferred Time</label>
              <input type="time" style={inputStyle} />
            </div>

            {/* Coaching Goals */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Coaching Goals</label>
              <textarea
                placeholder="Describe what you hope to achieve from this session"
                style={{ ...inputStyle, height: "100px", resize: "vertical" }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.background = "#1b5e20")}
              onMouseOut={(e) => (e.target.style.background = "#2e7d32")}
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const formGroupStyle = { marginBottom: "20px" };

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  fontFamily: "'Poppins', sans-serif",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2e7d32",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background 0.3s ease",
};

export default BookingCoach;
