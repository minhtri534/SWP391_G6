import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaComments,
  FaUserFriends,
  FaLightbulb,
  FaPaperPlane,
  FaExclamationCircle,
} from "react-icons/fa";

// Initial state for posts with sample data including author
const initialPosts = {
  support: [
    {
      id: 1,
      title: "Struggling with cravings today",
      content: "I’ve been trying to quit for a week, but the cravings are intense. Any tips?",
      author: "Nguyen Van A",
      comments: [
        { name: "Nguyen Van A", content: "Try chewing gum, it worked for me!", time: "2025-07-17 14:20" },
      ],
      created_at: "2025-07-16 10:30",
    },
    {
      id: 2,
      title: "Need motivation to keep going",
      content: "Feeling down after a slip-up. How do you stay motivated?",
      author: "Tran Thi B",
      comments: [
        { name: "Tran Thi B", content: "Focus on your health benefits!", time: "2025-07-18 09:10" },
      ],
      created_at: "2025-07-17 15:45",
    },
  ],
  tips: [
    {
      id: 3,
      title: "Best ways to distract from smoking",
      content: "I found exercise helps a lot. What works for you?",
      author: "Le Van C",
      comments: [
        { name: "Le Van C", content: "Deep breathing exercises are great!", time: "2025-07-17 11:00" },
        { name: "Nguyen Van A", content: "I agree, plus some music!", time: "2025-07-17 12:30" },
      ],
      created_at: "2025-07-15 09:15",
    },
    {
      id: 4,
      title: "Herbal teas that helped me",
      content: "Drinking chamomile tea reduced my urge to smoke. Anyone else try this?",
      author: "Tran Thi B",
      comments: [
        { name: "Tran Thi B", content: "Yes, peppermint tea works too!", time: "2025-07-18 08:45" },
      ],
      created_at: "2025-07-16 14:20",
    },
  ],
  general: [
    {
      id: 5,
      title: "Share your success stories",
      content: "I’ve been smoke-free for 30 days! What’s your story?",
      author: "Nguyen Van A",
      comments: [
        { name: "Le Van C", content: "Amazing! I hit 15 days yesterday.", time: "2025-07-17 16:00" },
        { name: "Nguyen Van A", content: "Congrats! I’m at 10 days.", time: "2025-07-18 07:30" },
        { name: "Tran Thi B", content: "Great job everyone!", time: "2025-07-18 09:00" },
      ],
      created_at: "2025-07-14 11:45",
    },
    {
      id: 6,
      title: "How smoking affects family",
      content: "I’m quitting for my kids. Has anyone else felt this pressure?",
      author: "Le Van C",
      comments: [
        { name: "Le Van C", content: "Yes, my family motivated me too!", time: "2025-07-17 13:20" },
      ],
      created_at: "2025-07-15 16:30",
    },
  ],
};

const Forums = () => {
  const userName = localStorage.getItem("userName") || "User";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const [posts, setPosts] = useState(initialPosts);
  const [comments, setComments] = useState({
    support: [],
    tips: [],
    general: [],
  });
  const [inputs, setInputs] = useState({
    support: "",
    tips: "",
    general: "",
  });
  const [postInputs, setPostInputs] = useState({
    support: { title: "", content: "" },
    tips: { title: "", content: "" },
    general: { title: "", content: "" },
  });

  useEffect(() => {
    console.log("Initial posts:", posts); // Debug initial state
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

  const handleCommentChange = (type, value) => {
    setInputs((prev) => ({ ...prev, [type]: value }));
  };

  const handleCommentSubmit = (type) => {
    if (inputs[type].trim() === "") return;

    const newComment = {
      name: userName,
      content: inputs[type],
      time: new Date().toLocaleString(),
    };

    setComments((prev) => ({
      ...prev,
      [type]: [...prev[type], newComment],
    }));

    setInputs((prev) => ({ ...prev, [type]: "" }));
  };

  const handlePostChange = (type, field, value) => {
    setPostInputs((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handlePostSubmit = (type) => {
    const { title, content } = postInputs[type];
    if (title.trim() === "" || content.trim() === "") return;

    const newPost = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      content,
      author: userName, // Set current user as author
      comments: [],
      created_at: new Date().toLocaleString(),
    };

    setPosts((prev) => ({
      ...prev,
      [type]: [...prev[type], newPost],
    }));

    setPostInputs((prev) => ({
      ...prev,
      [type]: { title: "", content: "" },
    }));
  };

  const handleReport = (type, postId) => {
    console.log(`Reported post ${postId} in ${type} forum`);
    // Add your report logic here (e.g., API call)
  };

  const renderComments = (type) =>
    comments[type].map((c, index) => (
      <div key={index} style={{ marginBottom: "8px" }}>
        <span style={{ fontWeight: "bold", color: "#2e7d32" }}>{c.name}:</span>{" "}
        <span>{c.content}</span>
        <div style={{ fontSize: "12px", color: "#888", marginLeft: "10px" }}>
          {c.time}
        </div>
      </div>
    ));

  const renderPostComments = (postComments) =>
    postComments.map((c, index) => (
      <div key={index} style={{ marginBottom: "8px" }}>
        <span style={{ fontWeight: "bold", color: "#2e7d32" }}>{c.name}:</span>{" "}
        <span>{c.content}</span>
        <div style={{ fontSize: "12px", color: "#888", marginLeft: "10px" }}>
          {c.time}
        </div>
      </div>
    ));

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

      {/* Main */}
      <div style={{ padding: "32px" }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2.5rem",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}>
          <FaComments style={{ color: "#ffffff" }} />
          Community Forums
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          {["support", "tips", "general"].map((type) => (
            <ForumCard
              key={type}
              type={type}
              title={type === "support" ? "Support Group" : type === "tips" ? "Tips & Advice" : "General Discussion"}
              icon={type === "support" ? <FaUserFriends /> : type === "tips" ? <FaLightbulb /> : <FaComments />}
              posts={posts[type]}
              postInputs={postInputs[type]}
              onPostChange={handlePostChange}
              onPostSubmit={handlePostSubmit}
              onCommentChange={handleCommentChange}
              onCommentSubmit={handleCommentSubmit}
              renderComments={renderPostComments}
              onReport={handleReport}
              userName={userName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function ForumCard({
  type,
  title,
  icon,
  posts,
  postInputs,
  onPostChange,
  onPostSubmit,
  onCommentChange,
  onCommentSubmit,
  renderComments,
  onReport,
  userName,
}) {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentChangeLocal = (value) => {
    setCommentInput(value);
  };

  const handleCommentSubmitLocal = (postId) => {
    if (commentInput.trim() === "") return;

    const newComment = {
      name: userName,
      content: commentInput,
      time: new Date().toLocaleString(),
    };

    setPosts((prev) => ({
      ...prev,
      [type]: prev[type].map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      ),
    }));

    setCommentInput("");
  };

  return (
    <div style={{
      background: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      padding: "1.5rem",
      transition: "box-shadow 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 7px 10px rgba(0,0,0,0.2)")}
    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")}>
      <h3 style={{
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "#15803d",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        {icon}
        {title}
      </h3>

      {/* Create Post Form */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Post title..."
          value={postInputs.title}
          onChange={(e) => onPostChange(type, "title", e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", border: "1px solid #ccc", borderRadius: "0.375rem", fontSize: "0.875rem" }}
        />
        <textarea
          placeholder="Post content..."
          value={postInputs.content}
          onChange={(e) => onPostChange(type, "content", e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", border: "1px solid #ccc", borderRadius: "0.375rem", fontSize: "0.875rem", minHeight: "60px" }}
        />
        <button
          onClick={() => onPostSubmit(type)}
          style={{
            background: "#16a34a",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.875rem",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#15803d")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#16a34a")}
        >
          Create Post
        </button>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #eee", borderRadius: "0.375rem" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#2e7d32", marginBottom: "0.25rem" }}>{post.title}</h4>
            <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.25rem" }}>
              By {post.author || "Unknown Author"} {/* Enhanced fallback */}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "0.5rem" }}>{post.content}</p>
            <div style={{ fontSize: "0.75rem", color: "#666", marginBottom: "0.5rem" }}>
              Created: {post.created_at}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              {renderComments(post.comments)}
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "0.5rem" }}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => handleCommentChangeLocal(e.target.value)}
                style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.375rem", fontSize: "0.875rem" }}
              />
              <button
                onClick={() => handleCommentSubmitLocal(post.id)}
                style={{
                  background: "#16a34a",
                  color: "white",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#15803d")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#16a34a")}
              >
                <FaPaperPlane />
                Send
              </button>
            </div>
            <button
              onClick={() => onReport(type, post.id)}
              style={{
                background: "#ef4444",
                color: "white",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.375rem",
                fontSize: "0.75rem",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#dc2626")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#ef4444")}
            >
              <FaExclamationCircle />
              Report
            </button>
          </div>
        ))
      ) : (
        <p style={{ fontSize: "0.875rem", color: "#666" }}>No posts yet. Create one to start!</p>
      )}
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

export default Forums;