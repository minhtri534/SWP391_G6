import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      toast.error("Please enter both username and password.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5196/api/Auth/login", {
        username: form.username,
        password: form.password,
      });

      const token = response.data.token;
      const usernameFromServer = response.data.username || form.username;

      // Lưu vào localStorage
      localStorage.setItem("userToken", token);
      localStorage.setItem("userName", usernameFromServer);

      toast.success("Login successful!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          name="username"
          value={form.username}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button style={buttonStyle} onClick={handleSubmit} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
          Don't have an account?{" "}
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
