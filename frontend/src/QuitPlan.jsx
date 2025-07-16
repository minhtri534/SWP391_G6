import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function QuitPlan() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [coachId, setCoachId] = useState(""); // if applicable

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason || !startDate || !goalDate || !status) {
      alert("Please fill in all required fields.");
      return;
    }
    if (new Date(startDate) > new Date(goalDate)) {
      alert("Start date must be before goal date.");
      return;
    }

    // Simulate API POST here
    alert("Quit Plan saved successfully!");
    navigate("/home");
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

      <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px" }}>
        <div
          style={{
            background: "white",
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
            Create Your Quit Plan
          </h2>

          <form onSubmit={handleSubmit}>
            <FormGroup
              label="Reason for Quitting"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              isTextArea
            />

            <FormGroup
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <FormGroup
              label="Goal Date"
              type="date"
              value={goalDate}
              onChange={(e) => setGoalDate(e.target.value)}
            />

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={inputStyle}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button type="submit" style={submitBtn}>
              Save Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, value, onChange, type = "text", isTextArea = false }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={labelStyle}>{label}</label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={onChange}
          style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
        />
      ) : (
        <input type={type} value={value} onChange={onChange} style={inputStyle} />
      )}
    </div>
  );
}

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
};

const submitBtn = {
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
};

export default QuitPlan;
