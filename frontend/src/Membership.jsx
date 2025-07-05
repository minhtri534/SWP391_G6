import React from "react";
import { Link } from "react-router-dom";

function Membership() {
	return (
		<div
			style={{
				fontFamily: "Poppins, sans-serif",
				background: "linear-gradient(to bottom, #a8f5a2, #ddfcb2)", // màu nền giữ nguyên
				minHeight: "100vh",
				paddingBottom: "40px",
			}}>
			{/* Logo */}
			<header
				style={{
					padding: "20px 40px",
					display: "flex",
					alignItems: "center",
				}}>
				<Link to="/" style={{ textDecoration: "none" }}>
					<h1 style={{ margin: 0 }}>
						<span style={{ color: "orange" }}>Quit</span>
						<span style={{ color: "green" }}>Smoking.com</span>
					</h1>
				</Link>
			</header>

			<section style={{ textAlign: "center", padding: "20px" }}>
				<h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px", color: "#2e7d32" }}>Choose Your Membership Plan</h2>
				<p style={{ fontSize: "16px", color: "#333", marginBottom: "40px" }}>Find the right plan to help you quit smoking and stay on track.</p>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
						gap: "30px",
						padding: "0 20px",
					}}>
					{/* Basic Plan */}
					<PlanCard title="Basic" price="$9.99" features={["Limited Tracking", "Community Access"]} color="#81c784" buttonColor="#388e3c" />

					{/* Standard Plan */}
					<PlanCard title="Standard" price="$19.99/mo" features={["Full Tracking", "Personal Coach", "Daily Tips"]} color="#64b5f6" buttonColor="#1976d2" />

					{/* Premium Plan */}
					<PlanCard title="Premium" price="$219.99/mo" features={["All Features", "24/7 Support", "1-on-1 Counseling", "Progress Reports"]} color="#ffb74d" buttonColor="#f57c00" />
				</div>
			</section>
		</div>
	);
}

function PlanCard({ title, price, features, color, buttonColor }) {
	return (
		<div
			style={{
				backgroundColor: "white",
				borderRadius: "16px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
				padding: "30px 20px",
				maxWidth: "280px",
				flex: "1",
				borderTop: `8px solid ${color}`,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
				height: "100%", // để mọi card bằng chiều cao
			}}>
			<div style={{ textAlign: "center" }}>
				<h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>{title}</h3>
				<p style={{ fontSize: "20px", marginBottom: "20px", color: "#333" }}>{price}</p>
			</div>

			<ul
				style={{
					listStyle: "none",
					padding: 0,
					marginBottom: "20px",
					textAlign: "left",
					minHeight: "120px", // đảm bảo đủ chỗ cho các dòng feature
				}}>
				{features.map((feature, index) => (
					<li key={index} style={{ marginBottom: "10px" }}>
						✅ {feature}
					</li>
				))}
			</ul>

			<button
				style={{
					backgroundColor: buttonColor,
					color: "white",
					padding: "10px 20px",
					border: "none",
					borderRadius: "10px",
					fontSize: "16px",
					fontWeight: "bold",
					cursor: "pointer",
					marginTop: "auto",
				}}>
				Upgrade
			</button>
		</div>
	);
}

export default Membership;
