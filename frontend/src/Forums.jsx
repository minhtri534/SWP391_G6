import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const dummyPosts = [
  {
    postId: 1,
    userId: 101,
    title: "Tôi đã bỏ thuốc lá được 7 ngày!",
    content: "Cảm ơn cộng đồng rất nhiều vì sự động viên! Mọi người cố lên nhé!",
    create_date: "2025-07-10",
    comments: ["Quá tuyệt vời!", "Tui mới ngày 2 thôi, cố lên!"],
  },
  {
    postId: 2,
    userId: 102,
    title: "Mẹo vượt qua cơn thèm thuốc buổi sáng",
    content: "Mình thường uống nước và đi bộ nhanh 10 phút mỗi sáng. Khá hiệu quả!",
    create_date: "2025-07-12",
    comments: [],
  },
];

function Forums() {
  const [posts, setPosts] = useState(dummyPosts);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [newComment, setNewComment] = useState("");

  const handleReport = (postId) => {
    alert(`Reported post ID: ${postId}`);
  };

  const toggleDetail = (postId) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const handleNewPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const updated = [
        ...posts,
        {
          postId: posts.length + 1,
          userId: 999,
          title: newPost.title,
          content: newPost.content,
          create_date: new Date().toISOString().split("T")[0],
          comments: [],
        },
      ];
      setPosts(updated);
      setNewPost({ title: "", content: "" });
    }
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    const updated = posts.map((post) =>
      post.postId === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    );
    setPosts(updated);
    setNewComment("");
  };

  const userMenu = {
    items: [
      {
        key: "1",
        label: <Link to="/profile">Profile</Link>,
      },
      {
        key: "2",
        label: <Link to="/logout">Logout</Link>,
      },
    ],
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        background: "linear-gradient(to bottom right, #a8e063, #56ab2f)",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      {/* Header giống Membership */}
      <header
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          borderBottom: "2px solid #eee",
        }}
      >
        <Link to="/home" style={{ textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>
            <span style={{ color: "#f57c00" }}>Quit</span>
            <span style={{ color: "#69c770" }}>Smoking.com</span>
          </h1>
        </Link>

        <Dropdown menu={userMenu} placement="bottomRight">
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#87d068" }} />
            <span style={{ marginLeft: "8px", marginRight: "4px", fontWeight: "500" }}>
              Member
            </span>
            <DownOutlined />
          </div>
        </Dropdown>
      </header>

      <main style={{ padding: "40px 80px", color: "#111" }}>
        <h2 style={{ textAlign: "center", color: "white", marginBottom: "40px" }}>
          💬 Community Forum – Share & Support
        </h2>

        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            marginBottom: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Đăng bài mới</h3>
          <input
            type="text"
            placeholder="Tiêu đề"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="Nội dung bài viết"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            style={{ ...inputStyle, height: "80px" }}
          />
          <button onClick={handleNewPost} style={buttonStylePrimary}>
            Đăng bài
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {posts.map((post) => (
            <div
              key={post.postId}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3>{post.title}</h3>
                  <p style={{ color: "#666", fontSize: "14px" }}>
                    🧑‍💻 User ID: {post.userId} | 📅 {post.create_date}
                  </p>
                </div>
                <button
                  onClick={() => handleReport(post.postId)}
                  style={{
                    backgroundColor: "#e53935",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    height: "fit-content",
                    marginTop: "6px",
                  }}
                >
                  🚩 Report
                </button>
              </div>

              {selectedPostId === post.postId ? (
                <>
                  <p style={{ marginTop: "15px", fontSize: "15px" }}>{post.content}</p>
                  <div style={{ marginTop: "10px" }}>
                    <h4>Bình luận:</h4>
                    {post.comments.length > 0 ? (
                      <ul style={{ paddingLeft: "20px" }}>
                        {post.comments.map((cmt, idx) => (
                          <li key={idx} style={{ fontSize: "14px", marginBottom: "4px" }}>{cmt}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontSize: "14px" }}>Chưa có bình luận.</p>
                    )}
                    <input
                      type="text"
                      placeholder="Thêm bình luận..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      style={{ ...inputStyle, marginTop: "10px" }}
                    />
                    <button
                      onClick={() => handleAddComment(post.postId)}
                      style={{ ...buttonStylePrimary, marginLeft: "10px" }}
                    >
                      Gửi
                    </button>
                  </div>
                  <button
                    onClick={() => toggleDetail(post.postId)}
                    style={buttonStyleSecondary}
                  >
                    Ẩn nội dung
                  </button>
                </>
              ) : (
                <button
                  onClick={() => toggleDetail(post.postId)}
                  style={buttonStylePrimary}
                >
                  Xem chi tiết
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const buttonStylePrimary = {
  marginTop: "10px",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  cursor: "pointer",
};

const buttonStyleSecondary = {
  marginTop: "10px",
  backgroundColor: "#ccc",
  color: "#111",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

export default Forums;
