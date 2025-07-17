import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SmokingSelfReport() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    time_period: "",
    amount_per_day: "",
    frequency: "",
    price_per_pack: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in.");
      return;
    }

    try {
      await axios.post("http://localhost:5196/api/SmokingStatus", {
        ...form,
        userId: userId,
        milestoneId: 1, // giả định milestone, bạn có thể cho chọn từ dropdown nếu cần
      });

      alert("Report submitted successfully!");
      navigate("/home");
    } catch (error) {
      alert("Error submitting report.");
      console.error(error);
    }
  };

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

      {/* Form */}
      <div style={{ display: "flex", justifyContent: "center", padding: "50px 20px" }}>
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
            Smoking Status Report
          </h2>

          <form onSubmit={handleSubmit}>
            <FormGroup
              label="🕒 Time Period (e.g. 1 week, 1 month)"
              name="time_period"
              value={form.time_period}
              onChange={handleChange}
            />
            <FormGroup
              label="🚬 Amount Smoked Per Day"
              name="amount_per_day"
              value={form.amount_per_day}
              onChange={handleChange}
              type="number"
            />
            <FormGroup
              label="🔁 Smoking Frequency (e.g. Daily, Occasionally)"
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
            />
            <FormGroup
              label="💵 Price Per Pack (USD)"
              name="price_per_pack"
              value={form.price_per_pack}
              onChange={handleChange}
              type="number"
            />
            <FormGroup
              label="📝 Additional Notes or Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              isTextArea
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#2e7d32",
                color: "white",
                fontSize: "16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, name, value, onChange, type = "text", isTextArea = false }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#333" }}>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Type here..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            resize: "vertical",
            minHeight: "100px",
          }}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder="Enter here..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      )}
    </div>
  );
}

export default SmokingSelfReport;
