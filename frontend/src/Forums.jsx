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
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./api/forum";
import { getProfile } from "./api/Profile";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "./api/Comment";

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
  const [commentInputs, setCommentInputs] = useState({});
  const [postInputs, setPostInputs] = useState({
    support: { postId: null, title: "", content: "" },
    tips: { postId: null, title: "", content: "" },
    general: { postId: null, title: "", content: "" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostType, setEditingPostType] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

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
      console.log("Current userId from localStorage:", userId);

      if (!userId || !localStorage.getItem("userToken")) {
        setError("Please log in to view forums.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getPosts();
        const allCommentsData = await getComments();

        const categorizedPosts = { support: [], tips: [], general: [] };
        const initialCommentInputs = {};

        for (let post of data) {
          const userName = await fetchUserName(post.userId);
          post.userName = userName;

          const postComments = allCommentsData.filter(comment => comment.postId === post.postId);
          post.comments = await Promise.all(postComments.map(async (comment) => ({
            ...comment,
            name: await fetchUserName(comment.userId),
          })));

          if (post.title.toLowerCase().includes("support")) categorizedPosts.support.push(post);
          else if (post.title.toLowerCase().includes("tips")) categorizedPosts.tips.push(post);
          else categorizedPosts.general.push(post);

          initialCommentInputs[post.postId] = "";
        }
        setPosts(categorizedPosts);
        setCommentInputs(initialCommentInputs);
      } catch (err) {
        if (err.message.includes("401")) {
          setError("Session expired. Please log in again.");
        } else {
          setError(err.message || "Failed to load posts");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
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

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value,
    }));
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
        newPost.userName = await fetchUserName(userId);
        newPost.comments = [];
        setPosts((prev) => ({
          ...prev,
          [type]: [...prev[type], newPost],
        }));
        setCommentInputs(prev => ({
          ...prev,
          [newPost.postId]: "",
        }));
      }
      setPostInputs((prev) => ({
        ...prev,
        [type]: { postId: null, title: "", content: "" },
      }));
      setEditingPostType(null);
    } catch (err) {
      setError(err.message || "Failed to save post");
    }
  };

  const handleEditPost = (type, post) => {
    setEditingPostType(type);
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
  };

  const handleCommentSubmit = async (postId) => {
    const content = commentInputs[postId];
    if (!content || content.trim() === "") return;

    try {
      await createComment(postId, userId, content);

      const allCommentsAfterNew = await getComments();

      const commentsForThisPost = allCommentsAfterNew.filter(
        (comment) => comment.postId === postId
      );

      const commentsWithNamesPromises = commentsForThisPost.map(async (comment) => ({
        ...comment,
        name: await fetchUserName(comment.userId),
      }));

      const finalCommentsForPost = await Promise.all(commentsWithNamesPromises);

      setPosts((prev) => {
        const updatedPosts = { ...prev };
        let postFound = false;

        for (const category of Object.keys(updatedPosts)) {
          const postIndex = updatedPosts[category].findIndex((p) => p.postId === postId);

          if (postIndex !== -1) {
            updatedPosts[category][postIndex] = {
              ...updatedPosts[category][postIndex],
              comments: finalCommentsForPost,
            };
            postFound = true;
            break;
          }
        }
        return updatedPosts;
      });

      handleCommentInputChange(postId, "");
    } catch (err) {
      setError(err.message || "Failed to add comment");
      console.error("Error submitting comment:", err);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditingCommentContent(comment.content);
  };

  const handleUpdateComment = async (postId, commentId) => {
    if (!editingCommentContent.trim()) return;

    try {
      const updatedComment = await updateComment(commentId, postId, userId, editingCommentContent);
      updatedComment.name = await fetchUserName(userId);

      setPosts((prev) => {
        const updatedPosts = { ...prev };
        for (const category of Object.keys(updatedPosts)) {
          const postIndex = updatedPosts[category].findIndex((p) => p.postId === postId);
          if (postIndex !== -1) {
            const commentIndex = updatedPosts[category][postIndex].comments.findIndex(c => c.commentId === commentId);
            if (commentIndex !== -1) {
              updatedPosts[category][postIndex].comments[commentIndex] = updatedComment;
            }
            break;
          }
        }
        return updatedPosts;
      });
      setEditingCommentId(null);
      setEditingCommentContent("");
    } catch (err) {
      setError(err.message || "Failed to update comment");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(commentId);
        setPosts((prev) => {
          const updatedPosts = { ...prev };
          for (const category of Object.keys(updatedPosts)) {
            const postIndex = updatedPosts[category].findIndex((p) => p.postId === postId);
            if (postIndex !== -1) {
              updatedPosts[category][postIndex] = {
                ...updatedPosts[category][postIndex],
                comments: updatedPosts[category][postIndex].comments.filter(c => c.commentId !== commentId),
              };
              break;
            }
          }
          return updatedPosts;
        });
      } catch (err) {
        setError(err.message || "Failed to delete comment");
      }
    }
  };

  const renderPostComments = (post) =>
    (post.comments || []).map((c) => (
      <div key={c.commentId} style={{ marginBottom: "8px" }}>
        <span style={{ fontWeight: "bold", color: "#2e7d32" }}>{c.name || "Unknown User"}:</span>{" "}
        {editingCommentId === c.commentId ? (
          <input
            type="text"
            value={editingCommentContent}
            onChange={(e) => setEditingCommentContent(e.target.value)}
            style={{ padding: "4px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "0.875rem", width: "calc(100% - 100px)" }}
          />
        ) : (
          <span>{c.content}</span>
        )}
        <div style={{ fontSize: "12px", color: "#888", marginLeft: "10px" }}>
          {c.created_date || "N/A"}
        </div>
        {console.log(`Comment ID: ${c.commentId}, Current User ID: ${userId}, Comment User ID: ${c.userId}`)}
        {userId && c.userId === userId && (
          <div style={{ display: "flex", gap: "8px", marginTop: "0.25rem" }}>
            {editingCommentId === c.commentId ? (
              <button
                onClick={() => handleUpdateComment(post.postId, c.commentId)}
                style={{
                  background: "#16a34a",
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
                onMouseEnter={(e) => (e.currentTarget.style.background = "#15803d")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#16a34a")}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditComment(c)}
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
            )}
            <button
              onClick={() => handleDeleteComment(post.postId, c.commentId)}
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
          {["general"].map((type) => (
            <ErrorBoundary key={type}>
              <ForumCard
                type={type}
                title={type === "support" ? "Support Group" : type === "tips" ? "Tips & Advice" : "General Discussion"}
                icon={type === "support" ? <FaUserFriends /> : type === "tips" ? <FaLightbulb /> : <FaComments />}
                posts={posts[type]}
                postInputs={postInputs[type]}
                onPostChange={handlePostChange}
                onPostSubmit={handlePostSubmit}
                renderComments={renderPostComments}
                onReport={handleReport}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                userName={userName}
                userId={userId}
                editing={editingPostType === type}
                loading={loading}
                error={error}
                onCommentSubmit={handleCommentSubmit}
                commentInputs={commentInputs}
                onCommentInputChange={handleCommentInputChange}
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
  renderComments,
  onReport,
  onEdit,
  onDelete,
  userId,
  editing,
  loading,
  error,
  onCommentSubmit,
  commentInputs,
  onCommentInputChange,
}) {
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
                  {renderComments(post)}
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "0.5rem" }}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[post.postId] || ""}
                    onChange={(e) => onCommentInputChange(post.postId, e.target.value)}
                    style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.375rem", fontSize: "0.875rem" }}
                  />
                  <button
                    onClick={() => onCommentSubmit(post.postId)}
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
                {console.log(`Post ID: ${post.postId}, Current User ID: ${userId}, Post User ID: ${post.userId}`)}
                {userId && post.userId == userId && (
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