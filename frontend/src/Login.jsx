import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "./UserContext"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";

// PasswordInput component trong cùng file (hoặc import từ file riêng)
function PasswordInput({ value, onChange, placeholder, name, style }) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...style,
          paddingRight: "42px",    // Tăng padding bên phải cho đủ chỗ icon
          boxSizing: "border-box"  // Đảm bảo padding nằm trong width input
        }}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          top: "35%",             
          right: "30px",           
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#696969",        
          fontSize: "17px",        
          userSelect: "none"
        }}
        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        role="button"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
}



function Login() {
  const [form, setForm] = useState({
    phonenumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.phonenumber || !form.password) {
      toast.error("Please enter both PhoneNumber and Password.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5196/api/Auth/login", {
        PhoneNum: form.phonenumber,
        Password: form.password,
      });

      const token = response.data.token;
      const usernameFromServer = response.data.user?.userName ;
      const role = response.data.user?.roleId || 2;
      const userId = response.data.user?.userId;

      setUser({
        userId,
        username: usernameFromServer,
        role: role || "member",
      });

      localStorage.setItem("userToken", token);
      localStorage.setItem("userName", usernameFromServer);
      localStorage.setItem("userId", userId);

      toast.success("Login successful!");
    if (role == 1) {
				setTimeout(() => navigate("/home"), 1500);
			} else if (role == 2) {
				setTimeout(() => navigate("/memberhome"), 1500);
			} else if (role == 3) {
				setTimeout(() => navigate("/Coach/Home"), 1500);
			} else if (role == 4) {
				setTimeout(() => navigate("/Admin/Dashboard"), 1500);
			}
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
      <div style={{ marginBottom: "40px", textAlign: "left" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            <span style={{ color: "#f57c00" }}>Quit</span>
            <span style={{ color: "#69c770" }}>Smoking.com</span>
          </h1>
        </Link>
      </div>

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
          placeholder="Phone Number"
          name="phonenumber"
          value={form.phonenumber}
          onChange={handleChange}
          style={inputStyle}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
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
