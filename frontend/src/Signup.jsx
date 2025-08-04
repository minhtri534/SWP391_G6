import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
	const [form, setForm] = useState({
		username: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!form.username || !form.phone || !form.password || !form.confirmPassword) {
			toast.error("Please fill in all required fields.");
			return;
		}
		if (form.password !== form.confirmPassword) {
			toast.error("Password confirmation does not match.");
			return;
		}

		setLoading(true);
		try {
			await axios.post("http://localhost:5196/api/Auth/register", {
				username: form.username,
				phoneNum: form.phone,
				password: form.password,
			});

			toast.success("Registration successful! Redirecting to login...");
			setTimeout(() => navigate("/login"), 1500);
		} catch (err) {
			toast.error(err.response?.data?.message || "Registration failed. Please try again.");
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
			}}>
			{/* Logo Header */}
			<div style={{ marginBottom: "40px", textAlign: "left" }}>
				<Link to="/" style={{ textDecoration: "none" }}>
					<h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
						<span style={{ color: "#f57c00" }}>Quit</span>
						<span style={{ color: "#69c770" }}>Smoking.com</span>
					</h1>
				</Link>
			</div>

			{/* Signup Form */}
			<div
				style={{
					maxWidth: "400px",
					margin: "0 auto",
					background: "#fff",
					padding: "30px",
					borderRadius: "12px",
					boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
				}}>
				<h2
					style={{
						textAlign: "center",
						fontSize: "28px",
						color: "#2e7d32",
						marginBottom: "30px",
					}}>
					Sign Up
				</h2>

				<form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
					<input type="text" name="username" placeholder="Username" style={inputStyle} value={form.username} onChange={handleChange} />

					<input type="text" name="phone" placeholder="Phone Number" style={inputStyle} value={form.phone} onChange={handleChange} />

					<input type="password" name="password" placeholder="Password" style={inputStyle} value={form.password} onChange={handleChange} />

					<input type="password" name="confirmPassword" placeholder="Confirm Password" style={inputStyle} value={form.confirmPassword} onChange={handleChange} />

					<button
						type="submit"
						style={{
							padding: "12px",
							background: "#2e7d32",
							color: "#fff",
							border: "none",
							borderRadius: "6px",
							fontWeight: "bold",
							cursor: "pointer",
						}}
						disabled={loading}>
						{loading ? "Signing up..." : "Sign Up"}
					</button>
				</form>

				<p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
					Already have an account?{" "}
					<Link to="/login" style={{ color: "#4CAF50", textDecoration: "none" }}>
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
}

const inputStyle = {
	width: "95%",
	padding: "12px",
	marginBottom: "10px",
	borderRadius: "6px",
	border: "1px solid #ccc",
	fontSize: "14px",
	fontFamily: "'Poppins', sans-serif",
};

export default Signup;
