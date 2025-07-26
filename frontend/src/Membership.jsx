import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCrown, FaTag, FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { getMembershipPlans } from "./api/Membership";

const Membership = () => {
  const userName = localStorage.getItem("userName") || "User";
  const userRole = localStorage.getItem("role") || "0";
  const isAdmin = userRole === "1";
  const [menuOpen, setMenuOpen] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembershipPlans();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchMembershipPlans = async () => {
    try {
      setLoading(true);
      const data = await getMembershipPlans();
      setMemberships(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleBuy = (membershipId) => {
    navigate(`/payment?packageId=${membershipId}`);
  };

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
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
        <Link to="/home" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            <span style={{ color: "#f57c00" }}>Quit</span>
            <span style={{ color: "#69c770" }}>Smoking.com</span>
          </h1>
        </Link>
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
              <MenuItem label="👤 Edit Profile" onClick={() => navigate("/edit-profile")} />
              <MenuItem label="🏆 My Coach" onClick={() => navigate("/mycoach")} />
              <MenuItem label="⚙️ Settings" onClick={() => navigate("/settings")} />
              <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
              <MenuItem label="🔓 Logout" onClick={handleLogout} />
            </ul>
          )}
        </div>
      </header>

      {/* Main */}
      <div style={{ padding: "32px" }}>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#ffffff",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <FaCrown style={{ color: "#ffffff" }} />
            Membership Packages
          </h2>
        </div>

        {loading && <p style={{ textAlign: "center", color: "#ffffff" }}>Loading...</p>}
        {error && <p style={{ textAlign: "center", color: "#ff0000" }}>{error}</p>}

        {!loading && !error && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {memberships.map((m) => (
              <div
                key={m.id}
                style={{
                  background: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  padding: "1.5rem",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 7px 10px rgba(0,0,0,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")}
              >
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#15803d",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                  <FaTag />
                  {m.membershipName}
                </h3>
                <p style={{ color: "#4b5563", marginBottom: "0.5rem" }}>
                  <strong>Duration:</strong> {m.duration}
                </p>
                <p style={{
                  color: "#4b5563",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <FaMoneyBillWave />
                  <strong>Price:</strong> ${m.price}
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleBuy(m.id)}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "#4CAF50",
                      color: "white",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <FaShoppingCart /> Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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

export default Membership;
