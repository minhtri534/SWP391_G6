import { MessageSquare } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FaComment } from "react-icons/fa";
import ChatBox from "./Chatbox";

function MessageDropdown({ messages, coachId }) {
	const [msgOpen, setMsgOpen] = useState(false);
	const [selectedMember, setSelectedMember] = useState(null);
	const msgRef = useRef();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (msgRef.current && !msgRef.current.contains(e.target)) {
				setMsgOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleChatClick = (member) => {
		setSelectedMember(member);
		setMsgOpen(false); // close dropdown
	};

	return (
		<div className="relative" ref={msgRef}>
			<div onClick={() => setMsgOpen((prev) => !prev)} className="cursor-pointer relative p-2 rounded-full bg-white shadow">
				<FaComment className="text-green-600 text-xl" />
				{/* {messages.length > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>} */}
			</div>
			{msgOpen && (
				<div className="absolute top-full right-0 mt-2 w-72 max-h-96 bg-white rounded-lg shadow-lg overflow-y-auto z-50">
					<h3 className="text-sm font-semibold px-4 py-2 border-b text-gray-700">Messages</h3>
					{messages.length === 0 ? (
						<div className="px-4 py-2 text-gray-500 text-sm">No messages yet</div>
					) : (
						messages.map((msgGroup, idx) => {
							// console.log("Dislaying: ", msgGroup.messages[0]);
							const latestMsg = msgGroup.messages[msgGroup.messages.length - 1];

							return (
								<div key={idx} onClick={() => handleChatClick(msgGroup)} className="px-4 py-2 border-b last:border-b-0">
									<p className="text-sm text-gray-800">{msgGroup.memberName}</p>
									<p className="text-xs text-gray-500 mt-1">
										{latestMsg ? (
											<>
												{latestMsg.sender === "Member" ? msgGroup.memberName : "You"} : {latestMsg.content}
											</>
										) : (
											<>No message yet</>
										)}
									</p>
								</div>
							);
						})
					)}
				</div>
			)}

			{/* ChatBox */}
			{selectedMember && <ChatBox member={selectedMember} coachId={coachId} onClose={() => setSelectedMember(null)} />}
		</div>
	);
}

export default MessageDropdown;
