import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { toast } from "react-toastify"; // Thêm react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast
import NoSmokingIcon from "./assets/no-smoking.png";
import Coach from "./assets/instructor.png";
import Report from "./assets/immigration.png";
import Achievement from "./assets/goal.png";
import Forums from "./assets/meeting.png";
import Feedback from "./assets/talking.png";
import QuitPlan from "./assets/project.png";
import Progress from "./assets/progress.png";
import { getUserNotification } from "./api/Notification"; // Sử dụng getUserNotification

function LoggedInHome() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId") || "1"; // Giả định userId từ localStorage hoặc mặc định "1"
  // Kiểm tra trạng thái membership từ localStorage, mặc định là guest (false)
  const isMember = localStorage.getItem("isMember") === "true";

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getUserNotification(userId);
      setNotifications(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load notifications!");
      setNotifications([]); // Đặt mảng rỗng nếu lỗi
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

  const handleNavigateReport = () => {
    if (!isMember) {
      toast.info("Please subscribe to a membership plan to access this feature.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      navigate("/report");
    }
  };

  const handleNavigateCoaching = () => {
    if (!isMember) {
      toast.info("Please subscribe to a membership plan to access this feature.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      navigate("/coaching");
    }
  };

  const handleMembershipClick = () => navigate("/membership");

  const articleItems = [
    {
      title: "🏆 Achievements Overview",
      desc: "Track your smoke-free milestones and celebrate success. A powerful way to stay motivated throughout your journey.",
      img: Achievement,
      onClick: () => {
        if (!isMember) {
          toast.info("Please subscribe to a membership plan to access this feature.", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else {
          navigate("/Badges");
        }
      },
    },
    {
      title: "💬 Community Forums",
      desc: "Connect with peers, ask questions, share wins and struggles. You’re not alone — our community is here.",
      img: Forums,
      onClick: () => {
        if (!isMember) {
          toast.info("Please subscribe to a membership plan to access this feature.", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else {
          navigate("/forums");
        }
      },
    },
    {
      title: "📢 Feedback & Reviews",
      desc: "Share your experience with our system or coaching team. Your insights help us grow and serve you better.",
      img: Feedback,
      onClick: () => {
        if (!isMember) {
          toast.info("Please subscribe to a membership plan to access this feature.", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else {
          navigate("/platform-feedback");
        }
      },
    },
    {
      title: "📄 Start with Quitplan now",
      desc: "Discover expert-backed health tips and lifestyle changes that support your smoke-free transformation.",
      img: QuitPlan,
      onClick: () => {
        if (!isMember) {
          toast.info("Please subscribe to a membership plan to access this feature.", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else {
          navigate("/choosequitplan");
        }
      },
    },
    {
      title: "📈 Daily Progress",
      desc: "Monitor your daily efforts and progress towards a smoke-free life. Stay on track with personalized insights and tips.",
      img: Progress,
      onClick: () => {
        if (!isMember) {
          toast.info("Please subscribe to a membership plan to access this feature.", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else {
          navigate("/dailyprogress");
        }
      },
    },
  ];

  // Split articles for top (4) and bottom (3) rows
  const topRowArticles = [
    { title: "📝 Smoking Self-Report", desc: "Help us understand your smoking habits through a short form. It tailors your quitting journey more effectively.", img: Report, onClick: handleNavigateReport },
    { title: "🎯 Coaching Sessions", desc: "Book 1-on-1 time with certified coaches. Build a plan, stay motivated, and succeed in quitting smoking.", img: Coach, onClick: handleNavigateCoaching },
    articleItems[0], // Achievements Overview
    articleItems[1], // Community Forums
  ];
  const bottomRowArticles = [
    articleItems[2], // Feedback & Reviews
    articleItems[3], // Start with Quitplan now
    articleItems[4], // Daily Progress
  ];

  return (
    <div style={{ fontFamily: '"Segoe UI", sans-serif', background: "linear-gradient(to bottom, #a8e063, #56ab2f)", color: "#111", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "white", borderBottom: "2px solid #ccc" }}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            <span style={{ color: "#f57c00" }}>Quit</span><span style={{ color: "#69c770" }}>Smoking.com</span>
          </h1>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ position: "relative" }} ref={notifRef}>
            <div
              onClick={() => setNotifOpen(!notifOpen)}
              style={{ cursor: "pointer", position: "relative", padding: "8px", borderRadius: "50%", background: "white", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
            >
              <FaBell size={22} color="#4CAF50" />
              {notifications.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "10px",
                    height: "10px",
                    background: "red",
                    borderRadius: "50%",
                    border: "1px solid white",
                  }}
                ></span>
              )}
            </div>
            {notifOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  background: "white",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  zIndex: 999,
                  width: "300px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  padding: "10px",
                }}
              >
                <h3 style={{ fontSize: "16px", padding: "10px", color: "#333", borderBottom: "1px solid #eee" }}>
                  Notifications
                </h3>
                {loading && <p style={{ padding: "10px", color: "#666", fontSize: "14px" }}>Loading...</p>}
                {error && <p style={{ padding: "10px", color: "#ff0000", fontSize: "14px" }}>{error}</p>}
                {!loading && !error && (notifications.length === 0 ? (
                  <p style={{ padding: "10px", color: "#666", fontSize: "14px" }}>No notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #eee",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    >
                      <p style={{ margin: 0 }}>{notif.content}</p>
                      <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>{notif.date}</p>
                    </div>
                  ))
                ))}
              </div>
            )}
          </div>
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
        </div>
      </header>

      {/* Main */}
      <main style={{ padding: "40px 30px" }}>
        {/* Hero */}
        <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h1 style={{ fontSize: "32px", color: "white", marginBottom: "10px" }}>🌿 Breathe Free. Live Better</h1>
            <p style={{ color: "white", fontSize: "16px" }}>
              Your journey to quit smoking starts here — with expert support, personalized tools, and a community that cares. Let’s build a healthier future together.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: "250px", textAlign: "center", marginLeft: "50%" }}>
            <img src={NoSmokingIcon} alt="illustration" style={{ maxWidth: "190px", filter: "drop-shadow(0 0 6px rgba(0,0,0,0.3))" }} />
          </div>
        </section>

        <hr style={{ margin: "40px 0", border: "none", height: "5px", background: "white", opacity: 0.3 }} />

        {/* Articles */}
        <section>
          <h2 style={{ color: "black", fontSize: "15px", marginBottom: "30px", textAlign: "center" }}>
            <b>📚 ARTICLES & TOOLS</b>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Top Row: 4 Articles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(200px, 1fr))", gap: "30px" }}>
              {topRowArticles.map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick || null}
                  style={articleCardStyle(!!item.onClick)}
                >
                  <div style={articleImageStyle}>
                    <img src={item.img} alt="icon" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "6px" }} />
                  </div>
                  <h3 style={{ fontSize: "16px", marginBottom: "5px", color: "#111" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "#666", flexGrow: 1 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            {/* Bottom Row: 3 Articles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(200px, 1fr))", gap: "30px" }}>
              {bottomRowArticles.map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick || null}
                  style={articleCardStyle(!!item.onClick)}
                >
                  <div style={articleImageStyle}>
                    <img src={item.img} alt="icon" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "6px" }} />
                  </div>
                  <h3 style={{ fontSize: "16px", marginBottom: "5px", color: "#111" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "#666", flexGrow: 1 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Responsive adjustment for smaller screens */}
          <style jsx>{`
            @media (max-width: 600px) {
              div[style*="gridTemplateColumns: repeat(4, minmax(200px, 1fr))"],
              div[style*="gridTemplateColumns: repeat(3, minmax(200px, 1fr))"] {
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
              }
            }
          `}</style>
        </section>

        <hr style={{ margin: "40px 0", border: "none", height: "5px", background: "white", opacity: 0.3 }} />

        {/* Membership */}
        <section style={{ textAlign: "center", padding: "50px 0" }}>
          <h3 style={{ fontSize: "26px", fontWeight: "600", color: "#111" }}>Want more personalized support?</h3>
          <p style={{ fontSize: "16px", color: "#666", maxWidth: "600px", margin: "10px auto" }}>
            Join our premium membership for coaching, tracking, and more.
          </p>
          <button style={orangeBtn} onClick={handleMembershipClick}>Become a Member</button>
        </section>

        <hr style={{ margin: "40px 0", border: "none", height: "5px", background: "white", opacity: 0.3 }} />

        {/* Blog */}
        <section style={{ marginTop: "50px" }}>
          <h2 style={{ textAlign: "center", color: "white", fontSize: "20px", marginBottom: "30px" }}>
            🧠 Coach Insights & Community Wisdom
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              {
                title: "How to Mentally Prepare for Quitting",
                author: "Coach Linh Nguyen",
                role: "Certified Smoking Cessation Specialist",
                content:
                  "Quitting smoking is not just about breaking a habit — it’s about reshaping how you view yourself. Understand your triggers, create a plan, and visualize life without cigarettes.",
              },
              {
                title: "The First 7 Days: What to Expect",
                author: "Coach David Tran",
                role: "Health & Recovery Advisor",
                content:
                  "Expect cravings, irritability, and mood swings. This is your body detoxing. Stay hydrated, avoid triggers, and reward yourself for small wins.",
              },
              {
                title: "Helping a Loved One Quit",
                author: "Admin Team",
                role: "Support Staff",
                content:
                  "Support them with patience and consistency. Encourage, celebrate small improvements, and offer resources. Your belief can be the spark they need.",
              },
            ].map((blog, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "24px",
                  borderRadius: "10px",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <h3 style={{ color: "#2e7d32", fontSize: "18px", fontWeight: "600" }}>{blog.title}</h3>
                <p style={{ fontSize: "14px", fontWeight: "500", color: "#555" }}>
                  ✍️ {blog.author} <span style={{ fontStyle: "italic", color: "#888" }}>– {blog.role}</span>
                </p>
                <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.6" }}>{blog.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "16px", backgroundColor: "#ffffff", fontSize: "14px", borderTop: "1px solid #ddd", color: "#777777" }}>
        © 2025 QuitSmoking.com. All rights reserved.
      </footer>
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

const articleCardStyle = (clickable) => ({
  background: "white",
  borderRadius: "8px",
  padding: "10px 15px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
  cursor: clickable ? "pointer" : "default",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  minHeight: "220px",
  display: "flex",
  flexDirection: "column",
});

const articleImageStyle = {
  height: "100px",
  background: "linear-gradient(135deg, #a8e063, #56ab2f)",
  borderRadius: "6px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const orangeBtn = {
  marginTop: "20px",
  padding: "12px 24px",
  background: "#f57c00",
  color: "white",
  fontSize: "18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

export default LoggedInHome;