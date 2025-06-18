import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div style={{ padding: "30px" }}>
      {/* Logo */}
      <div style={{ marginBottom: "40px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>
            <span style={{ color: "orange" }}>Quit</span>
            <span style={{ color: "green" }}>Smoking.com</span>
          </h1>
        </Link>
      </div>

      {/* Sign Up Form */}
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
          borderRadius: "20px",
          border: "1px solid #38c172",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ color: "#38c172", fontSize: "36px", marginBottom: "30px" }}>Sign Up</h2>

        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ textAlign: "left" }}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              style={inputStyle}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label>Phone number</label>
            <input
              type="text"
              placeholder="Enter phone number"
              style={inputStyle}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              style={inputStyle}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              style={inputStyle}
            />
          </div>
            
        </form>
            <button style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", margin:"30px" }}>
            sign up
            </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "95%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "5px",
};

export default Signup;
