import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
	const navigate = useNavigate();
	const isLoggedIn = localStorage.getItem("userToken");

	const handleMembershipClick = () => {
		if (!isLoggedIn) {
			toast.warning("You need to login or register an account before purchasing a membership package.");
		} else {
			navigate("/membership");
		}
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
			}}>
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
				className="header">
				<Link to="/" style={{ textDecoration: "none" }}>
					<h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }} className="logo">
						<span style={{ color: "#69c770" }}>Quit</span>
						<span>Smoking.com</span>
					</h1>
				</Link>

				<nav style={{ display: "flex", gap: "8px", alignItems: "center" }} className="user-profile">
					<Link to="/login" style={navBtn}>
						Login
					</Link>
					<Link to="/signup" style={navBtn}>
						Sign Up
					</Link>
				</nav>
			</header>

			{/* Intro Section */}
			<div className="home-container">
				<section
					style={{
						padding: "40px 30px",
					}}
					className="main-content">
					<div className="intro">
						<h1
							style={{
								fontSize: "28px",
								fontWeight: "700",
								color: "white",
							}}>
							Breathe Free. Live Better
						</h1>
						<p
							style={{
								marginTop: "10px",
								fontSize: "16px",
								color: "white",
							}}>
							Your journey to quit smoking starts here — with expert support, personalized tools, and a community that cares.
						</p>
					</div>
					<hr
						style={{
							margin: "40px 0 30px",
							border: "none",
							height: "2px",
							background: "white",
							opacity: "0.3",
						}}
						className="divider"
					/>
				</section>

				{/* Articles & Information Section */}
				<section style={{ padding: "0 30px" }} className="articles">
					<h2
						style={{
							fontSize: "16px",
							letterSpacing: "2px",
							textAlign: "center",
							background: "white",
							display: "inline-block",
							padding: "5px 10px",
							borderRadius: "4px",
							margin: "0 auto 20px",
						}}>
						ARTICLES & INFORMATION
					</h2>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: "30px",
						}}
						className="article-grid">
						{["Article Title 1", "Article Title 2", "Article Title 3", "Article Title 4", "Article Title 5", "Article Title 6"].map((title, index) => (
							<div
								key={index}
								style={{
									background: "white",
									borderRadius: "8px",
									padding: "10px 15px",
									boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
									transition: "transform 0.3s",
								}}
								className="article-card">
								<div
									style={{
										height: "100px",
										background: "#ccc",
										borderRadius: "6px",
										marginBottom: "10px",
									}}
									className="article-image"></div>
								<h4 style={{ fontSize: "16px", fontWeight: "500", margin: "0 0 5px", color: "#111" }}>{title}</h4>
								<p style={{ fontSize: "14px", color: "#666", margin: "0" }}>Brief description of the article content that entices the user to click.</p>
							</div>
						))}
					</div>
				</section>

				{/* Membership Section */}
				<section style={{ textAlign: "center", padding: "40px 30px" }}>
					<h3
						style={{
							fontSize: "26px",
							fontWeight: "600",
							color: "#111",
						}}>
						Want more personalized support?
					</h3>
					<p
						style={{
							fontSize: "16px",
							color: "#666",
							maxWidth: "600px",
							margin: "10px auto",
						}}>
						Join our premium membership for coaching, tracking, and more.
					</p>
					<button style={orangeBtn} onClick={handleMembershipClick}>
						Become a Member
					</button>
				</section>
			</div>

			{/* Footer */}
			<footer
				style={{
					textAlign: "center",
					padding: "16px",
					backgroundColor: "#ffffff",
					fontSize: "14px",
					borderTop: "1px solid #ddd",
					color: "#777777",
				}}>
				© 2025 QuitSmoking.com. All rights reserved.
			</footer>
		</div>
	);
}

const navLink = {
	margin: "0 10px",
	textDecoration: "none",
	color: "#333",
	fontSize: "14px",
};

const navBtn = {
	margin: "0 10px",
	padding: "8px 16px",
	background: "#69c770",
	color: "white",
	borderRadius: "10px",
	fontWeight: "bold",
	fontSize: "14px",
};

const orangeBtn = {
	marginTop: "20px",
	padding: "12px 24px",
	background: "#f57c00",
	color: "white",
	fontSize: "18px",
	borderRadius: "8px",
	border: "none",
	cursor: "pointer",
};

export default Home;
