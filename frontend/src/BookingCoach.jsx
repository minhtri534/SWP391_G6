import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCoaches, getCoachPackagesByCoachId } from "./api/BookCoach";
import {
  FaUserCircle,
  FaCheckCircle,
  FaTag,
  FaClock,
  FaDollarSign,
  FaUpload,
  FaShoppingCart,
} from "react-icons/fa";

const BookingCoach = () => {
  const userName = localStorage.getItem("userName") || "Member";
  const [menuOpen, setMenuOpen] = useState(false);
  const [coachPackages, setCoachPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoachPackages = async () => {
      try {
        setLoading(true);
        const coaches = await getCoaches();
        const packages = await Promise.all(
          coaches.map((coach) => getCoachPackagesByCoachId(coach.id))
        );
        const flattenedPackages = packages.flat().map(pkg => ({
          ...pkg,
          duration: `${pkg.duration} days`, // Convert duration to readable format
          price: `$${pkg.price}`, // Add $ symbol to price
        }));
        setCoachPackages(flattenedPackages);
      } catch (err) {
        setError(err.message || "Error fetching coach packages");
      } finally {
        setLoading(false);
      }
    };
    fetchCoachPackages();
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const openPaymentPopup = (packageItem) => {
    setSelectedPackage(packageItem);
  };

  const closePaymentPopup = () => {
    setSelectedPackage(null);
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Uploaded: ${file.name}`);
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        minHeight: "100vh",
        paddingTop: "100px",
        paddingInline: "2rem",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "white",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 100,
        }}
      >
        <Link to="/memberhome" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
            <span style={{ color: "#f57c00" }}>Quit</span>
            <span style={{ color: "#4caf50" }}>Smoking.com</span>
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
              <MenuItem
                label="👤 Edit Profile"
                onClick={() => navigate("/edit-profile")}
              />
              <MenuItem
                label="🏆 My Coach"
                onClick={() => navigate("/mycoach")}
              />
              <MenuItem
                label="⚙️ Settings"
                onClick={() => navigate("/settings")}
              />
              <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
              <MenuItem label="🔓 Logout" onClick={handleLogout} />
            </ul>
          )}
        </div>
      </header>

      {/* Title */}
      <h2
        style={{
          fontSize: "32px",
          marginBottom: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <FaCheckCircle /> Buy a Coach
      </h2>

      {/* Package Cards */}
      {loading && <p style={{ textAlign: "center", color: "#fff" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "#ff0000" }}>{error}</p>}
      {!loading && !error && coachPackages.length === 0 && (
        <p style={{ textAlign: "center", color: "#fff" }}>No coach packages available.</p>
      )}
      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {coachPackages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                background: "white",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                padding: "1.5rem",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 7px 10px rgba(0,0,0,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")
              }
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#15803d",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FaTag />
                {pkg.name}
              </h3>
              <p
                style={{
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FaClock />
                <strong>Duration:</strong> {pkg.duration}
              </p>
              <p
                style={{
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FaDollarSign />
                <strong>Price:</strong> {pkg.price}
              </p>
              <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
                <strong>Description:</strong> {pkg.description || "No description available"}
              </p>
              <button
                onClick={() => openPaymentPopup(pkg)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#4CAF50",
                  color: "white",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <FaShoppingCart /> Buy Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Payment Popup */}
      {selectedPackage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "0.5rem",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Payment for {selectedPackage.name}
            </h3>
            <p>
              <strong>Duration:</strong> {selectedPackage.duration}
            </p>
            <p>
              <strong>Price:</strong> {selectedPackage.price}
            </p>
            <p>
              <strong>Transfer Link:</strong>{" "}
              <a
                href="https://example.com/transfer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here to transfer
              </a>
            </p>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <label>
                <strong>Upload Receipt:</strong>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleReceiptUpload}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #d1d5db",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={closePaymentPopup}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#f44336",
                  color: "white",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={closePaymentPopup}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#4CAF50",
                  color: "white",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
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

export default BookingCoach;