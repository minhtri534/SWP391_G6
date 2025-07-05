import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const membershipId = location.state?.membershipId;

  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("Credit Card");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Giả sử giá tiền tính theo membershipId
    if (membershipId === 1) setAmount(9.99);
    else if (membershipId === 2) setAmount(19.99);
    else if (membershipId === 3) setAmount(219.99);
    else setAmount(0);
  }, [membershipId]);

  const handlePayment = async () => {
    if (!userId) {
      toast.error("You must be logged in to proceed with payment.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5196/api/Payment", {
        userId_fk: userId,
        membershipId_fk: membershipId,
        amount: amount,
        pay_date: new Date().toISOString(),
        method: method,
        type: "Online",
        status: "Completed",
      });

      toast.success("Payment successful! Welcome to your upgraded membership.");
      navigate("/home");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #a8e063, #56ab2f)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#2e7d32" }}>
          Membership Payment
        </h2>

        <p>
          <b>Selected Plan:</b>{" "}
          {membershipId === 1 ? "Basic" : membershipId === 2 ? "Standard" : "Premium"}
        </p>
        <p>
          <b>Amount:</b> ${amount}
        </p>

        <div style={{ marginTop: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>Payment Method:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Momo">Momo</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Payment;
