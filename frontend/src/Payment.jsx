import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import momoQR from "./assets/momo-qr.png";
import { FaUserCircle } from "react-icons/fa";
import { getAuthConfig } from "./api/Auth";
import { buyMembershipPlan } from "./api/Membership"

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const membershipId = queryParams.get("membershipId");
  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");
  
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (membershipId === 1) setAmount(9.99);
    else if (membershipId === 2) setAmount(19.99);
    else if (membershipId === 3) setAmount(219.99);
    else setAmount(0);
  }, [membershipId]);

  const handlePayment = async () => {
    if (!userId) {
      toast.error("You must be logged in to proceed with payment.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        UserId: userId,
        MembershipId: membershipId,
        Start_Date: new Date().toISOString()
      };

      await buyMembershipPlan(payload);
      toast.success("Payment successful! Welcome to your upgraded membership.");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      console.log(membershipId);
    } finally {
      setLoading(false);
    }
    
  };

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
      }}
    >
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
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
          <span style={{ color: "#f57c00" }}>Quit</span>
          <span style={{ color: "#69c770" }}>Smoking.com</span>
        </h1>
        <div style={{ position: "relative" }} ref={menuRef}>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              background: "white",
              padding: "8px 12px",
              borderRadius: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              fontWeight: "500",
            }}
          >
            <FaUserCircle size={22} color="#4CAF50" />
            <span>{userName}</span>
          </div>
          {menuOpen && (
            <ul
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                background: "white",
                listStyle: "none",
                padding: "10px 0",
                boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                borderRadius: "8px",
                zIndex: 999,
                width: "180px",
              }}
            >
              <MenuItem label="👤 Edit Profile" onClick={() => handleNavigate("/edit-profile")} />
              <MenuItem label="🏆 My Coach" onClick={() => handleNavigate("/mycoach")} />
              <MenuItem label="⚙️ Settings" onClick={() => handleNavigate("/settings")} />
              <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
              <MenuItem label="🔓 Logout" onClick={handleLogout} />
            </ul>
          )}
        </div>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#2e7d32" }}>
            Membership Payment
          </h2>
          <p>
            <b>Selected Plan:</b>{" "}
            {membershipId === 1 ? "Basic" : membershipId === 2 ? "Standard" : "Premium"}
          </p>
          <p>
            <b>Amount:</b> $89.99
          </p>

          <div style={{ margin: "20px 0" }}>
            <img
              src={momoQR}
              alt="Momo QR Code"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
            <p style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>
              Scan the QR code using <b>MoMo</b> App to complete your payment.
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Processing..." : "I Have Paid"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ label, onClick }) {
  return (
    <li
      onClick={onClick}
      style={{
        padding: "10px 16px",
        fontSize: "14px",
        color: "#333",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f4f4f4")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {label}
    </li>
  );
}

export default Payment;
