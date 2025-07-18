import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUserCircle, FaEye, FaWindowClose } from "react-icons/fa";

const quitPlanContent = {
  light: {
    title: "Light Addiction Quit Plan",
    milestone: [
      "Identify your triggers",
      "Track your smoking times",
      "Replace smoking with healthy habits",
      "Reduce to 3 cigarettes/day",
      "Reduce to 1 cigarette/day",
      "Quit completely and celebrate",
    ],
    info: {
      startDate: "2025-07-01",
      goalDate: "2025-08-01",
      reason: "I want to take control of my health early.",
    },
  },
  moderate: {
    title: "Moderate Addiction Quit Plan",
    milestone: [
      "Log your daily intake",
      "Delay your first cigarette each day",
      "Cut down by 50%",
      "Introduce NRT (patch/gum)",
      "Join a support group",
      "Quit day and begin recovery journal",
    ],
    info: {
      startDate: "2025-07-01",
      goalDate: "2025-09-01",
      reason: "I want to break free from nicotine's grip.",
    },
  },
  strong: {
    title: "Strong Addiction Quit Plan",
    milestone: [
      "Health check and baseline screening",
      "Strict reduction schedule",
      "Begin weekly counseling",
      "Try nicotine alternatives",
      "Create daily routine without smoking",
      "Quit day with strong support system",
    ],
    info: {
      startDate: "2025-07-01",
      goalDate: "2025-10-01",
      reason: "My smoking is hurting my health and family.",
    },
  },
  severe: {
    title: "Severe Addiction Quit Plan",
    milestone: [
      "Intensive therapy session",
      "Medical support and prescription",
      "Monitor withdrawal symptoms",
      "Daily progress logging",
      "Family and coach involvement",
      "Quit day + relapse prevention program",
    ],
    info: {
      startDate: "2025-07-01",
      goalDate: "2025-11-01",
      reason: "I need full support to stop and rebuild my life.",
    },
  },
};

const QuitPlan = () => {
  const { level } = useParams();
  const [showAll, setShowAll] = useState(false);
  const userName = localStorage.getItem("userName") || "User";

  const plan = quitPlanContent[level];

  if (!plan) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        Invalid Quit Plan Level
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
        <h2 className="text-4xl font-bold mb-6 text-center">{plan.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Milestone list */}
          <div className="bg-white p-6 rounded-xl text-gray-800 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Current Milestone</h3>
            <ul className="list-disc list-inside">
              {plan.milestone.slice(0, 1).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowAll(true)}
              className="mt-4 text-sm text-green-600 flex items-center gap-1 hover:underline"
            >
              <FaEye />
              View All Milestones
            </button>
          </div>

          {/* Plan info */}
          <div className="bg-white p-6 rounded-xl text-gray-800 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Plan Details</h3>
            <p><strong>Start Date:</strong> {plan.info.startDate}</p>
            <p><strong>Goal Date:</strong> {plan.info.goalDate}</p>
            <p><strong>Reason:</strong> {plan.info.reason}</p>
          </div>
        </div>
      </div>

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
              {plan.milestone.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuitPlan;
