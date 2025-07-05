import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate cơ bản
    if (!form.username || !form.phone || !form.password || !form.confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    try {
      // Gọi API đăng ký
      const response = await axios.post("http://localhost:5196/api/Auth/register"),{
        username: form.username,
        phone: form.phone,
        password: form.password,
      });
      setSuccess("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => navigate("/login"), 1500); // Chuyển sang trang login sau 1.5s
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại, thử lại!");
    }
  };

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

        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit}
        >
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              style={inputStyle}
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Phone number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              style={inputStyle}
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              style={inputStyle}
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              style={inputStyle}
              value={form.confirmPassword}
              onChange={handleChange}
            />
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
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* Hiển thị lỗi hoặc thành công */}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "15px" }}>{error}</p>
        )}
        {success && (
          <p style={{ color: "green", textAlign: "center", marginTop: "15px" }}>{success}</p>
        )}

        {/* Link to login */}
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#4CAF50",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
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
