import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NoSmokingIcon from "./assets/no-smoking.png";
import Coach from "./assets/instructor.png";
import Report from "./assets/immigration.png";
import Achievement from "./assets/goal.png";
import Forums from "./assets/meeting.png";
import Feedback from "./assets/talking.png";
import "./LoggedInHome.css";

function LoggedInHome() {
  const userName = "Minh Tri";
  const navigate = useNavigate();

  const handleNavigateReport = () => {
    navigate("/report");
  };

  const handleNavigateCoaching = () => {
    navigate("/coaching");
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo-box">
          <div className="logo">
            <span style={{ color: "#f57c00" }}>Quit</span>
            <span style={{ color: "#69c770" }}>Smoking.com</span>
          </div>
        </div>
        <div className="user-profile">
          <FaUserCircle size={24} />
          <span>{userName}</span>
        </div>
      </header>

      {/* Main Section */}
      <main className="main-content">
        {/* Hero Section */}
        <section
          className="intro"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h1 style={{ fontSize: "32px", color: "white", marginBottom: "10px" }}>
              🌿 Breathe Free. Live Better
            </h1>
            <p style={{ color: "white", fontSize: "16px" }}>
              Your journey to quit smoking starts here — with expert support,
              personalized tools, and a community that cares.
              Let’s build a healthier future together.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: "250px", textAlign: "center", marginLeft: "50%" }}>
            <img
              src={NoSmokingIcon}
              alt="illustration"
              style={{
                maxWidth: "190px",
                filter: "drop-shadow(0 0 6px rgba(0,0,0,0.3))",
              }}
            />
          </div>
        </section>

        <hr className="divider" style={{ margin: "40px 0", border: "none", height: "5px", background: "white", opacity: 0.3 }} />

        {/* Articles Section */}
<section className="articles">
  <h2 style={{ color: "black", fontSize: "15px", marginBottom: "30px", marginLeft: "47%" }}>
  📚 TOOLS
  </h2>
  <div className="article-grid">
    {/* Article 1: Self Report */}
    <div className="article-card" onClick={handleNavigateReport} style={{ cursor: "pointer" }}>
      <div className="article-image gradient-image">
        <img
          src={Report}
          alt="Instructor"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "6px"
          }}
      />    
      </div>
           
      <h3><b>📝 Smoking Self-Report</b></h3>
      <p>
        Help us understand your smoking habits through a short form.
        It tailors your quitting journey more effectively.
      </p>
    </div>

    {/* Article 2: Coaching */}
    <div className="article-card" onClick={handleNavigateCoaching} style={{ cursor: "pointer" }}>
    <div className="article-image">
      <img
        src={Coach}
        alt="Instructor"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "6px"
        }}
      />
    </div>
  <h3><b>🎯 Coaching Sessions</b></h3>
  <p>
    Book 1-on-1 time with certified coaches. Build a plan, stay motivated,
    and succeed in quitting smoking.
  </p>
</div>

    {/* Article 3: Achievements */}
    <div className="article-card">
      <div className="article-image gradient-image">
        <img
          src={Achievement}
          alt="Instructor"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "6px"
          }}
        />
      </div>
      <h3><b>🏆 Achievements Overview</b></h3>
      <p>
        Track your smoke-free milestones and celebrate success. A powerful way to
        stay motivated throughout your journey.
      </p>
    </div>

    {/* Article 4: Community Forums */}
    <div className="article-card">
      <div className="article-image gradient-image">
        <img
          src={Forums}
          alt="Instructor"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "6px"
          }}
        />
      </div>
      <h3><b>💬 Community Forums</b></h3>
      <p>
        Connect with peers, ask questions, share wins and struggles.
        You’re not alone — our community is here.
      </p>
    </div>

    {/* Article 5: Feedback */}
    <div className="article-card">
      <div className="article-image gradient-image">
        <img
          src={Feedback}
          alt="Instructor"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "6px"
          }}
        />
      </div>
      <h3><b>📢 Feedback & Reviews</b></h3>
      <p>
        Share your experience with our system or coaching team.
        Your insights help us grow and serve you better.
      </p>
    </div>

    {/* Article 6: Placeholder */}
    <div className="article-card">
      <div className="article-image gradient-image"></div>
      <h3><b>📄 Health Tips & Strategies</b></h3>
      <p>
        Discover expert-backed health tips and lifestyle changes that
        support your smoke-free transformation.
      </p>
    </div>
  </div>
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

export default LoggedInHome;
