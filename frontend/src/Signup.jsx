import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        minHeight: "100vh",
        padding: "30px",
        color: "#111",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "40px", textAlign: "left" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
                  <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
                    <span style={{ color: "#f57c00" }}>Quit</span>
                    <span style={{ color: "#69c770" }}>Smoking.com</span>
                  </h1>
                </Link>
      </div>

      {/* Sign Up Form */}
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "30px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            color: "#2e7d32",
            marginBottom: "30px",
          }}
        >
          Sign Up
        </h2>

        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label>Username</label>
            <input type="text" placeholder="Enter username" style={inputStyle} />
          </div>

          <div>
            <label>Phone number</label>
            <input type="text" placeholder="Enter phone number" style={inputStyle} />
          </div>

          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter password" style={inputStyle} />
          </div>

          <div>
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" style={inputStyle} />
          </div>

          <button
            style={{
              padding: "12px",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Link to login */}
        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4CAF50", textDecoration: "none", fontWeight: "500" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "95%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  marginTop: "5px",
};

export default Signup;
