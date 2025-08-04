import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, updateProfile, deleteAccount } from "./api/Profile"; // Đảm bảo đường dẫn đúng
import { FaLock } from "react-icons/fa";


const EditProfile = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const userId = localStorage.getItem("userId");

  // State để lưu trữ toàn bộ dữ liệu profile gốc từ backend
  const [fullProfileData, setFullProfileData] = useState({});

  // State cho dữ liệu form mà người dùng có thể chỉnh sửa
  const [formData, setFormData] = useState({
    userName: "",
    age: "",
    gender: "",
    phoneNum: "",
  });

  // Xử lý đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch dữ liệu profile khi component mount hoặc userId thay đổi
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(userId);
        console.log("Fetched profile gender:", profile.gender);
        // Lưu toàn bộ đối tượng profile nhận được từ API
        setFullProfileData(profile);
        // Điền dữ liệu vào form chỉ với các trường cần chỉnh sửa
        setFormData({
          userName: profile.userName || "",
          age: profile.age || "",
          gender: profile.gender || "",
          phoneNum: profile.phoneNum || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Chuẩn bị payload để gửi đi
      // Kết hợp dữ liệu từ form (formData) và các trường gốc không thay đổi (fullProfileData)
      const payload = {
        userId: userId, // Luôn đảm bảo userId được gửi
        userName: formData.userName,
        // Đảm bảo age là số nếu backend yêu cầu, nếu không thì gửi string hoặc null nếu cần
        age: formData.age === "" ? null : parseInt(formData.age), // Gửi null nếu rỗng, hoặc chuyển đổi sang số
        gender: formData.gender,
        phoneNum: formData.phoneNum,
        // Các trường này không được chỉnh sửa trên form, lấy từ dữ liệu gốc
        password: fullProfileData.password, // Cần cẩn thận với password
        roleId: fullProfileData.roleId,
        status: fullProfileData.status,
        joinDate: fullProfileData.joinDate,
      };

      console.log("Sending payload to updateProfile:", payload); // Debug: Kiểm tra payload trước khi gửi

      await updateProfile(userId, payload);
      alert("Profile updated successfully!");
      const username = localStorage.setItem("userName",payload.userName);
      const age = localStorage.setItem("age",payload.age);
      const gender = localStorage.setItem("gender",payload.gender);
      
      window.location.reload();
    } catch (err) {
      alert("Failed to update profile: " + err.message);
      console.error("Update profile error:", err); // Debug: In lỗi chi tiết từ catch
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteAccount(userId);
        alert("Account deleted successfully!");
        localStorage.clear();
        navigate("/login");
      } catch (err) {
        alert("Failed to delete account: " + err.message);
      }
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

      {/* Main Content */}
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-12">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Edit Profile</h2>
        <form onSubmit={handleSave} className="space-y-5">
          <InputField label="Name" name="userName" value={formData.userName} onChange={handleChange} />
          <InputField label="Phone Number" name="phoneNum" value={formData.phoneNum} readOnly />
          <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />
<label htmlFor="gender">Gender</label>
<select
  label="Gender"
  name="gender"
  value={formData.gender}
  onChange={handleChange}
  style={{
    width: "95%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
  }}
>
  
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition text-sm font-semibold"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition text-sm font-semibold mt-4"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

// Component con cho Input Field
function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}

// Component con cho Menu Item
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

export default EditProfile;