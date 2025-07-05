import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoSmokingIcon from "./assets/no-smoking.png";
import Coach from "./assets/instructor.png";
import Report from "./assets/immigration.png";
import Achievement from "./assets/goal.png";
import Forums from "./assets/meeting.png";
import Feedback from "./assets/talking.png";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userToken");

  const handleMembershipClick = () => {
    if (!isLoggedIn) {
      toast.warning("You need to login or register an account before purchasing a membership package.");
    } else {
      navigate("/membership");
    }
  };

  const handleRequireLogin = () => {
    toast.info("Please login to access this feature.");
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: '"Segoe UI", sans-serif',
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        color: "#111",
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
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            <span style={{ color: "#f57c00" }}>Quit</span>
            <span style={{ color: "#69c770" }}>Smoking.com</span>
          </h1>
        </Link>
        <nav style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link to="/login" style={navBtn}>Login</Link>
          <Link to="/signup" style={navBtn}>Sign Up</Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="main-content" style={{ padding: "40px 30px" }}>
        {/* Hero */}
        <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h1 style={{ fontSize: "32px", color: "white", marginBottom: "10px" }}>
              🌿 Breathe Free. Live Better
            </h1>
            <p style={{ color: "white", fontSize: "16px" }}>
              Your journey to quit smoking starts here — with expert support,
              personalized tools, and a community that cares. Let’s build a healthier future together.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: "250px", textAlign: "center", marginLeft: "50%" }}>
            <img
              src={NoSmokingIcon}
              alt="illustration"
              style={{ maxWidth: "190px", filter: "drop-shadow(0 0 6px rgba(0,0,0,0.3))" }}
            />
          </div>
        </section>

        <hr className="divider" style={{ margin: "40px 0", border: "none", height: "5px", background: "white", opacity: 0.3 }} />

        {/* Articles */}
        <section className="articles">
          <h2 style={{ color: "black", fontSize: "15px", marginBottom: "30px", textAlign: "center", marginLeft: "1%" }}>
            <b>📚 ARTICLES & TOOLS</b>
          </h2>
          <div className="article-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "30px"
          }}>
            {[
              {
                title: "📝 Smoking Self-Report",
                desc: "Help us understand your smoking habits through a short form. It tailors your quitting journey more effectively.",
                img: Report,
              },
              {
                title: "🎯 Coaching Sessions",
                desc: "Book 1-on-1 time with certified coaches. Build a plan, stay motivated, and succeed in quitting smoking.",
                img: Coach,
              },
              {
                title: "🏆 Achievements Overview",
                desc: "Track your smoke-free milestones and celebrate success. A powerful way to stay motivated throughout your journey.",
                img: Achievement,
              },
              {
                title: "💬 Community Forums",
                desc: "Connect with peers, ask questions, share wins and struggles. You’re not alone — our community is here.",
                img: Forums,
              },
              {
                title: "📢 Feedback & Reviews",
                desc: "Share your experience with our system or coaching team. Your insights help us grow and serve you better.",
                img: Feedback,
              },
              {
                title: "📄 Health Tips & Strategies",
                desc: "Discover expert-backed health tips and lifestyle changes that support your smoke-free transformation.",
                img: "",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="article-card"
                onClick={!isLoggedIn ? handleRequireLogin : undefined}
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "10px 15px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                  cursor: isLoggedIn ? "pointer" : "not-allowed",
                }}
              >
                <div className="article-image gradient-image" style={{
                  height: "100px",
                  background: "linear-gradient(135deg, #a8e063, #56ab2f)",
                  borderRadius: "6px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  {item.img && (
                    <img
                      src={item.img}
                      alt="icon"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "6px"
                      }}
                    />
                  )}
                </div>
                <h3 style={{ fontSize: "16px", marginBottom: "5px", color: "#111" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "#666" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
             <hr className="divider" style={{ margin: "40px 0", border: "none", height: "5px", background: "white", opacity: 0.3 }} />
        {/* Membership Section */}
        <section style={{ textAlign: "center", padding: "50px 0" }}>
          <h3 style={{ fontSize: "26px", fontWeight: "600", color: "#111" }}>
            Want more personalized support?
          </h3>
          <p style={{
            fontSize: "16px",
            color: "#666",
            maxWidth: "600px",
            margin: "10px auto"
          }}>
            Join our premium membership for coaching, tracking, and more.
          </p>
          <button style={orangeBtn} onClick={handleMembershipClick}>
            Become a Member
          </button>
        </section>
         <hr className="divider" style={{ margin: "40px 0", border: "none", height: "5px", background: "white", opacity: 0.3 }} />
        {/* Blog Section */}
<section className="blog-section" style={{ marginTop: "50px" }}>
  <h2 style={{ textAlign: "center", color: "white", fontSize: "20px", marginBottom: "30px" }}>
    🧠 Coach Insights & Community Wisdom
  </h2>
  <div className="blog-grid" style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  }}>
    {[
      {
        title: "How to Mentally Prepare for Quitting",
        author: "Coach Linh Nguyen",
        role: "Certified Smoking Cessation Specialist",
        content:
          "Quitting smoking is not just about breaking a habit — it’s about reshaping how you view yourself. I always tell my clients: prepare your mind before your lungs. That means understanding your triggers, creating a daily plan, and visualizing life without cigarettes. Write down your 'why' and read it every morning. Remember, mindset drives momentum.",
      },
      {
        title: "The First 7 Days: What to Expect",
        author: "Coach David Tran",
        role: "Health & Recovery Advisor",
        content:
          "The first week is often the hardest — but it’s also the most transformational. Expect cravings, irritability, and sudden mood swings. This is your body detoxing. Drink plenty of water, avoid triggers, and reward yourself for small victories. Reach out to your coach when things get tough. You are not alone.",
      },
      {
        title: "Helping a Loved One Quit",
        author: "Admin Team",
        role: "Support Staff",
        content:
          "Supporting someone who’s trying to quit smoking can be both rewarding and challenging. The key is patience and consistency. Encourage without judging. Celebrate even minor improvements. Share resources and offer to join them in their journey (like a healthy habit challenge). Sometimes, your belief in them is the spark they need.",
      },
    ].map((blog, index) => (
      <div key={index} style={{
        background: "white",
        padding: "24px",
        borderRadius: "10px",
        boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}>
        <h3 style={{ color: "#2e7d32", fontSize: "18px", fontWeight: "600" }}>{blog.title}</h3>
        <p style={{ fontSize: "14px", fontWeight: "500", color: "#555" }}>
          ✍️ {blog.author} <span style={{ fontStyle: "italic", color: "#888" }}>– {blog.role}</span>
        </p>
        <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.6" }}>
          {blog.content}
        </p>
      </div>
    ))}
  </div>
</section>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "16px",
          backgroundColor: "#ffffff",
          fontSize: "14px",
          borderTop: "1px solid #ddd",
          color: "#777777",
        }}
      >
        © 2025 QuitSmoking.com. All rights reserved.
      </footer>
    </div>
  );
}

const navBtn = {
  margin: "0 10px",
  padding: "8px 16px",
  background: "#69c770",
  color: "white",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "14px",
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

export default Home;
