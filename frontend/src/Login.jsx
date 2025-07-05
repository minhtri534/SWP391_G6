import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to bottom right, #a8e063, #56ab2f)",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      {/* Logo Header giống LoggedInHome */}
      <div style={{ marginBottom: "40px", textAlign: "left" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
                  <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
                    <span style={{ color: "#f57c00" }}>Quit</span>
                    <span style={{ color: "#69c770" }}>Smoking.com</span>
                  </h1>
                </Link>
      </div>

      {/* Login box */}
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
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
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button style={buttonStyle}>Login</button>
        </div>

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
          Don't have an account? {" "}
          <Link to="/signup" style={{ color: "#4CAF50", textDecoration: "none" }}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "95%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  fontFamily: "'Poppins', sans-serif",
};

const buttonStyle = {
  padding: "12px 24px",
  background: "#2e7d32",
  color: "white",
  fontSize: "16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Login;
