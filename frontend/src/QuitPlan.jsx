import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEye, FaWindowClose } from "react-icons/fa";
import { getQuitPlanById, getQuitPlanByUserId } from "./api/Plan2";
import { getMilestonesByPlanId } from "./api/Milestone2";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const QuitPlan = () => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";
  const [plan, setPlan] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get("planId");

  useEffect(() => {
    const fetchQuitPlan = async () => {
      try {
        setLoading(true);
        if (userId) {
          let data;
          if (planId !== "5") {
            data = await getQuitPlanById(planId);
          } else {
            data = await getQuitPlanByUserId(userId);
          }
          setPlan(data);
          if (data && data.planId) {
            const milestoneData = await getMilestonesByPlanId(data.planId);
            setMilestones(Array.isArray(milestoneData) ? milestoneData : [milestoneData]);
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load quit plan");
      } finally {
        setLoading(false);
      }
    };
    fetchQuitPlan();
  }, [userId, planId]);

  const fetchMilestoneDetail = async (milestoneId) => {
    try {
      const milestone = milestones.find(m => m.milestoneId === milestoneId);
      setSelectedMilestone(milestone || null);
      setShowAll(false); // Đảm bảo không mở popup "View All" khi xem chi tiết
    } catch (err) {
      setError(err.message || "Failed to load milestone details");
    }
  };

  const handleViewAllMilestones = () => {
    setShowAll(true);
  };

  const formatDate = (isoDateString) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!userId) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        Please log in to view your quit plan.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-white font-bold">
        Loading your quit plan...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        {error}
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        No quit plan found for this user.
      </div>
    );
  }

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
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
      </header>

      {/* Main content */}
      <div className="p-8 text-white">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Your Quit Plan #{plan.planId}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Milestone list */}
          <div className="bg-white p-6 rounded-xl text-gray-800 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Current Milestones</h3>
            <ul className="list-disc list-inside">
              {milestones.length > 0 ? (
                milestones.map((milestone) => (
                  <li key={milestone.milestoneId} onClick={() => fetchMilestoneDetail(milestone.milestoneId)} style={{ cursor: "pointer" }}>
                    <strong>{milestone.title}</strong> (Target: {formatDate(milestone.target_date)})
                  </li>
                ))
              ) : (
                <li>No milestones available</li>
              )}
            </ul>
            <button
              onClick={handleViewAllMilestones}
              className="mt-4 text-sm text-green-600 flex items-center gap-1 hover:underline"
              disabled={milestones.length === 0}
            >
              <FaEye />
              View All Milestones
            </button>
          </div>

          {/* Plan info */}
          <div className="bg-white p-6 rounded-xl text-gray-800 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Plan Details</h3>
            <p><strong>Start Date:</strong> {formatDate(plan.start_Date)}</p>
            <p><strong>Goal Date:</strong> {formatDate(plan.goal_Date)}</p>
            <p><strong>Reason:</strong> {plan.reason}</p>
          </div>
        </div>
      </div>

      {/* Popup for selected milestone */}
      {selectedMilestone && !showAll && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-lg relative">
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <FaWindowClose size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-green-700">{selectedMilestone.title}</h3>
            <ul className="list-decimal list-inside text-gray-800 space-y-2">
              <li><strong>Description:</strong> {selectedMilestone.description}</li>
              <li><strong>Target Date:</strong> {formatDate(selectedMilestone.target_date)}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Popup for all milestones */}
      {showAll && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-lg relative">
            <button
              onClick={() => setShowAll(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <FaWindowClose size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-green-700">All Milestones</h3>
            <ul className="list-decimal list-inside text-gray-800 space-y-2">
              {milestones.map((milestone) => (
                <li key={milestone.milestoneId}>
                  <strong>{milestone.title}</strong> (Target Date: {formatDate(milestone.target_date)}, Description: {milestone.description})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuitPlan;