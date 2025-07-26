import React, { useState, useEffect, useRef } from "react";
import {
  FaCalendarAlt,
  FaSmoking,
  FaClock,
  FaDollarSign,
  FaPen,
  FaSave,
  FaUserCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  getSmokingStatus,
  createSmokingStatus,
  updateSmokingStatus,
} from "./api/SmokingStatus";

const SmokingSelfReport = () => {
  const [report, setReport] = useState({
    time_period: "",
    amount_per_day: "",
    frequency: "",
    price_per_pack: "",
    description: "",
  });
  const [hasData, setHasData] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef();
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getSmokingStatus(userId);
        if (data) {
          setReport({
            time_period: data.timePeriod || "",
            amount_per_day: data.amountPerDay || "",
            frequency: data.frequency || "",
            price_per_pack: data.pricePerPack || "",
            description: data.description || "",
          });
          setHasData(true);
        } else {
          setHasData(false); // Không có dữ liệu, cho phép tạo mới
        }
      } catch (err) {
        setError(err.message || "Error fetching smoking status");
        setHasData(false); // Nếu lỗi, vẫn cho phép tạo mới
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [userId]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        userId: userId,
        timePeriod: report.time_period,
        amountPerDay: report.amount_per_day,
        frequency: report.frequency,
        pricePerPack: report.price_per_pack,
        description: report.description,
      };

      if (hasData) {
        await updateSmokingStatus(payload);
      } else {
        await createSmokingStatus(payload);
        setHasData(true);
      }

      alert("Saved successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to save smoking status");
      alert("Failed to save: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Segoe UI", sans-serif',
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        minHeight: "100vh",
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
        <Link to="/memberhome" style={{ textDecoration: "none" }}>
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
              <MenuItem label="🏆  My Coach" onClick={() => navigate("/mycoach")} />
              <MenuItem label="⚙️ Settings" onClick={() => navigate("/settings")} />
              <hr style={{ margin: "6px 0", borderColor: "#eee" }} />
              <MenuItem label="🔓 Logout" onClick={handleLogout} />
            </ul>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-12">
        <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
          <FaSmoking />
          Smoking Self Report
        </h2>

        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {error && <p style={{ textAlign: "center", color: "#ff0000" }}>{error}</p>}
        {!loading && !error && (
          <>
            {isEditing ? (
              <div className="space-y-4">
                <InputField label="Time Period" icon={<FaClock />} name="time_period" value={report.time_period} onChange={handleChange} />
                <InputField label="Amount per Day" icon={<FaSmoking />} name="amount_per_day" value={report.amount_per_day} onChange={handleChange} />
                <InputField label="Frequency" icon={<FaCalendarAlt />} name="frequency" value={report.frequency} onChange={handleChange} />
                <InputField label="Price per Pack" icon={<FaDollarSign />} name="price_per_pack" value={report.price_per_pack} onChange={handleChange} />
                <div>
                  <label className="font-semibold flex items-center gap-2 mb-1">
                    <FaPen />
                    Description:
                  </label>
                  <textarea name="description" rows="4" value={report.description} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-gray-800 text-lg">
                <ReportView label="⏱ Time Period" value={report.time_period} />
                <ReportView label="🚬 Amount per Day" value={report.amount_per_day} />
                <ReportView label="📅 Frequency" value={report.frequency} />
                <ReportView label="💵 Price per Pack" value={report.price_per_pack} />
                <ReportView label="📝 Description" value={report.description} />
              </div>
            )}

            <div className="mt-6 flex justify-end gap-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaPen />
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  disabled={loading}
                >
                  <FaSave />
                  Save
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, icon, name, value, onChange }) => (
  <div>
    <label className="font-semibold flex items-center gap-2 mb-1">
      {icon}
      {label}:
    </label>
    <input type="text" name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" />
  </div>
);

const ReportView = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <FaInfoCircle className="text-green-600" />
    <span className="font-semibold">{label}:</span>
    <span>{value || "Not provided"}</span>
  </div>
);

const MenuItem = ({ label, onClick }) => (
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

export default SmokingSelfReport;