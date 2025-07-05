import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./LoggedInHome.css";

function LoggedInHome() {
  const userName = "Minh Tri";

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo-box">
          <div className="logo">
            Quit<span>Smoking</span>.com
          </div>
        </div>
        <div className="user-profile">
          <FaUserCircle size={24} />
          <span>{userName}</span>
        </div>
      </header>

      {/* Main Section */}
      <main className="main-content">
        <section className="intro">
          <h1>Breathe Free. Live Better</h1>
          <p>
            Your journey to quit smoking starts here — with expert support,
            personalized tools, and a community that cares.
          </p>
        </section>

        <hr className="divider" />

        {/* Articles */}
        <section className="articles">
          <h2>ARTICLES & INFORMATION</h2>
          <div className="article-grid">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="article-card">
                <div className="article-image"></div>
                <h3>Article Title {i + 1}</h3>
                <p>
                  Brief description of the article content that entices the
                  user to click.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoggedInHome;
