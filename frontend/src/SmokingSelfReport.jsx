import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SmokingSelfReport() {
  const userName = "Minh Tri";
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to bottom right, #a8e063, #56ab2f)",
        minHeight: "100vh",
      }}
    >
      {/* Header giống LoggedInHome */}
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

      {/* Form Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "50px 20px",
        }}
      >
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
            Smoking Self-Report
          </h2>

          <form>
            <FormGroup label="Full Name (Optional)" placeholder="Enter your name (if any)" />
            <FormGroup label="Age" placeholder="Enter your age" type="number" />
            <FormGroup label="Gender" placeholder="e.g. Male / Female / Other" />
            <FormGroup label="Are you currently smoking?" placeholder="Yes / No" />
            <FormGroup label="What do you smoke?" placeholder="e.g. Cigarettes, Vape, etc." />
            <FormGroup label="How many per day?" placeholder="e.g. 5-10" type="number" />
            <FormGroup label="At what age did you start smoking?" placeholder="e.g. 18" type="number" />
            <FormGroup label="When do you smoke the most?" placeholder="e.g. After meals, when stressed..." />
            <FormGroup label="Why do you want to quit smoking?" isTextArea />
            <FormGroup label="What support would help you quit?" isTextArea />

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

function FormGroup({ label, placeholder = "", type = "text", isTextArea = false }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder || "Type your response here..."}
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
          type={type}
          placeholder={placeholder}
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
