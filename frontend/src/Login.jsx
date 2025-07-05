import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={{ padding: "30px" }}>
      {/* Logo */}
      <div style={{ marginBottom: "40px", marginLeft: "10px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>
            <span style={{ color: "orange" }}>Quit</span>
            <span style={{ color: "green" }}>Smoking.com</span>
          </h1>
        </Link>
      </div>

      {/* Login box */}
      <div style={{ maxWidth: "400px", margin: "0 auto", background: "#f9f9f9", padding: "30px", borderRadius: "8px", height: "50vh" }}>
        <h2 style={{ marginBottom: "70px", textAlign: "center", fontSize: "233%" }}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          style={{ width: "95%", padding: "10px", marginBottom: "50px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ width: "95%", padding: "10px", marginBottom: "53px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>
            Login
          </button>
        </div>

        {/* Link to signup */}
        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#4CAF50", textDecoration: "none" }}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
