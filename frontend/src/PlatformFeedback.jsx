// PlatformFeedback.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PlatformFeedback() {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!content || rating === 0) {
      toast.error("Please fill in both feedback and rating.");
      return;
    }

    const userId = anonymous ? null : localStorage.getItem("userId"); // if anonymous, skip

    // Fake API call
    console.log("Submitting feedback:", {
      userId,
      content,
      rating,
      coachId: null,
      planId: null,
    });

    toast.success("Thank you for your feedback!");
    setContent("");
    setRating(0);
    setAnonymous(false);

    // Optionally redirect
    // navigate("/home");
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
        
        <div style={styles.container}>
        <h2 style={styles.title}>📝 Share Your Feedback About Our Platform</h2>
        <p style={styles.subtitle}>
          Help us improve your experience. Your feedback is valuable!
        </p>

        <textarea
          placeholder="Write your feedback here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.ratingSection}>
            <label style={{ marginRight: 10 }}>Your Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
             <span
               key={star}
               onClick={() => setRating(star)}
               style={{
                 fontSize: 28,
                 cursor: "pointer",
                 color: star <= rating ? "#f57c00" : "#ccc",
               }}
             >
               ★
             </span>
         ))}
        </div>

        <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
            <label style={{ marginLeft: 8 }}>Submit as Anonymous</label>
        </div>

        <button style={styles.submitButton} onClick={handleSubmit}>
            Submit Feedback
        </button>
        </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "60px auto",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    fontSize: "26px",
    color: "#2e7d32",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "25px",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    resize: "vertical",
  },
  ratingSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
  submitButton: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
const articleImageStyle = {
  height: "100px",
  background: "linear-gradient(135deg, #a8e063, #56ab2f)",
  borderRadius: "6px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default PlatformFeedback;
