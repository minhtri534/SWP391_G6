import { useRef, useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UserDropdown({ userName = "User" }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef();
	const navigate = useNavigate();

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

	const navigateTo = (path) => {
		setMenuOpen(false);
		navigate(path);
	};

	return (
		<div className="relative inline-block text-left" ref={menuRef}>
			<button onClick={() => setMenuOpen((prev) => !prev)} className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow hover:shadow-md transition">
				<FaUserCircle className="text-green-600 text-xl" />
				<span className="text-sm font-medium text-gray-800">{userName}</span>
			</button>

			{menuOpen && (
				<ul className="absolute right-0 z-50 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg text-sm">
					<DropdownItem label="👤 Edit Profile" onClick={() => navigateTo("/edit-profile")} />
					<DropdownItem label="🏆 My Coach" onClick={() => navigateTo("/MyCoach")} />
					<DropdownItem label="⚙️ Settings" onClick={() => navigateTo("/settings")} />
					<li className="border-t my-1"></li>
					<DropdownItem label="🔓 Logout" onClick={handleLogout} />
				</ul>
			)}
		</div>
	);
}

function DropdownItem({ label, onClick }) {
	return (
		<li>
			<button onClick={onClick} className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
				{label}
			</button>
		</li>
	);
}

export default UserDropdown;
