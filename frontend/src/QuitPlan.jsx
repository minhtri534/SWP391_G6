import React, { useState, useRef, useEffect, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaComments,
  FaUserFriends,
  FaLightbulb,
  FaPaperPlane,
  FaExclamationCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "./api/forum";
import { getProfile } from "./api/Profile";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", color: "#fff", padding: "20px" }}>
          <h3>Something went wrong in the forum.</h3>
          <p>{this.state.error.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              background: "#16a34a",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Forums = () => {
  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const [posts, setPosts] = useState({ support: [], tips: [], general: [] });
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
    support: { postId: null, title: "", content: "" },
    tips: { postId: null, title: "", content: "" },
    general: { postId: null, title: "", content: "" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const fetchUserName = async (userId) => {
    try {
      const profile = await getProfile(userId);
      return profile.userName || "Unknown User";
    } catch (err) {
      console.error("Failed to fetch user name:", err);
      return "Unknown User";
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId || !localStorage.getItem("userToken")) {
        setError("Please log in to view forums.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        console.log("Fetching posts from API...");
        const data = await getPosts();
        console.log("API response:", data);
        const categorizedPosts = { support: [], tips: [], general: [] };
        for (let post of data) {
          const userName = await fetchUserName(post.userId);
          post.userName = userName;
          if (post.title.toLowerCase().includes("support")) categorizedPosts.support.push(post);
          else if (post.title.toLowerCase().includes("tips")) categorizedPosts.tips.push(post);
          else categorizedPosts.general.push(post);
        }
        setPosts(categorizedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        if (err.message.includes("401")) {
          setError("Session expired. Please log in again.");
          navigate("/login");
        } else {
          setError(err.message || "Failed to fetch posts!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId, navigate]);

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

  const handlePostSubmit = async (type) => {
    const { postId, title, content } = postInputs[type];
    if (title.trim() === "" || content.trim() === "") return;

    const postData = { userId, title, content };
    try {
      if (postId) {
        const updatedPost = await updatePost(postId, postData);
        updatedPost.userName = await fetchUserName(userId);
        setPosts((prev) => ({
          ...prev,
          [type]: prev[type].map((p) => (p.postId === postId ? updatedPost : p)),
        }));
      } else {
        const newPost = await createPost(postData);
        console.log("New post response:", newPost); // Debug response từ API
        const postWithUserId = { ...newPost, userId: userId }; // Gán userId trực tiếp
        postWithUserId.userName = await fetchUserName(userId);
        setPosts((prev) => ({
          ...prev,
          [type]: [...prev[type], postWithUserId],
        }));
      }
      setPostInputs((prev) => ({
        ...prev,
        [type]: { postId: null, title: "", content: "" },
      }));
      setEditing(null);
    } catch (err) {
      setError(err.message || "Failed to save post");
    }
  };

  const handleEditPost = (type, post) => {
    setEditing(type);
    setPostInputs((prev) => ({
      ...prev,
      [type]: { postId: post.postId, title: post.title, content: post.content },
    }));
  };

  const handleDeletePost = async (type, postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        setPosts((prev) => ({
          ...prev,
          [type]: prev[type].filter((p) => p.postId !== postId),
        }));
      } catch (err) {
        setError(err.message || "Failed to delete post");
      }
    }
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
            <ErrorBoundary key={type}>
              <ForumCard
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
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                userName={userName}
                userId={userId}
                editing={editing === type}
                loading={loading}
                error={error}
              />
            </ErrorBoundary>
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
  onEdit,
  onDelete,
  userName,
  userId,
  editing,
  loading,
  error,
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

    setPosts((prev) => {
      const updatedPosts = { ...prev };
      const postIndex = updatedPosts[type].findIndex((p) => p.postId === postId);
      if (postIndex !== -1) {
        updatedPosts[type][postIndex] = {
          ...updatedPosts[type][postIndex],
          comments: [...updatedPosts[type][postIndex].comments, newComment],
        };
      }
      return updatedPosts;
    });

    setCommentInput("");
  };

  if (loading) return <div style={{ textAlign: "center", color: "#fff" }}>Loading...</div>;
  if (error) return <div style={{ textAlign: "center", color: "#fff" }}>{error}</div>;

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

      {/* Create/Edit Post Form */}
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
          {editing ? "Save Changes" : "Create Post"}
        </button>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.postId} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #eee", borderRadius: "0.375rem" }}>
            {post && post.postId && (
              <>
                <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#2e7d32", marginBottom: "0.25rem" }}>{post.title}</h4>
                <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.25rem" }}>
                  By {post.userName || "Unknown User"}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "0.5rem" }}>{post.content}</p>
                <div style={{ fontSize: "0.75rem", color: "#666", marginBottom: "0.5rem" }}>
                  Created: {post.create_date || post.created_at || "N/A"}
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  {renderComments(post.comments || [])}
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
                    onClick={() => handleCommentSubmitLocal(post.postId)}
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
                {userId && post.userId && post.userId === userId && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => onEdit(type, post)}
                      style={{
                        background: "#eab308",
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
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#ca8a04")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#eab308")}
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(type, post.postId)}
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
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                )}
                <button
                  onClick={() => onReport(type, post.postId)}
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
                    marginTop: "0.5rem",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#dc2626")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#ef4444")}
                >
                  <FaExclamationCircle />
                  Report
                </button>
              </>
            )}
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