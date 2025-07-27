import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createChat } from "../api/Chat";

function ChatBox({ member, coachId, onClose }) {
	const [input, setInput] = useState("");
	const [chatHistory, setChatHistory] = useState(member.messages || []);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const scrollRef = useRef();

	useEffect(() => {
		// Sort chat history newest to oldest initially
		const sorted = [...(member.messages || [])].sort((a, b) => new Date(a.chat_Date) - new Date(b.chat_Date));
		setChatHistory(sorted);
	}, [member]);

	useEffect(() => {
		// Auto-scroll to bottom when new message is added
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [chatHistory]);

	const handleSend = async () => {
		if (!input.trim()) return;

		const newMsg = {
			userId: member.memberId,
			coachId: coachId,
			content: input.trim(),
			type: "Text",
			status: "Replied",
			chat_Date: new Date().toISOString(),
			sender: "Coach",
		};

		try {
			setLoading(true);
			await createChat(newMsg);
			setChatHistory((prev) => [...prev, newMsg]); // Append to bottom
			setInput("");
			setError(null);
		} catch (err) {
			console.error(err);
			setError(err?.response?.data?.message || err.message || "Failed to send message.");
			setTimeout(() => setError(null), 3000); // Clear error after 3s
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-lg z-50 border border-gray-300 flex flex-col max-h-[80vh]">
			<div className="p-3 border-b font-semibold flex justify-between items-center bg-green-100">
				<span>Chat with {member.memberName}</span>
				<button onClick={onClose} className="text-gray-500 hover:text-red-500 hover:cursor-pointer">
					<X />
				</button>
			</div>
			<div className="flex-1 overflow-y-auto p-3 space-y-2">
				{/* {console.log(member)}
				{console.log(coachId)}
				{console.log("Chat history: ", chatHistory)} */}
				{chatHistory.length === 0 && <p className="text-sm text-gray-400">No messages yet</p>}
				{chatHistory.map((msg, idx) => (
					<div key={idx} className={`text-sm p-2 rounded-lg max-w-[80%] ${msg.sender === "Coach" ? "ml-auto bg-green-200" : "bg-gray-100"}`}>
						{msg.content}
					</div>
				))}
			</div>
			<div className="p-2 border-t flex items-center gap-2">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="flex-1 px-3 py-1.5 border rounded-full text-sm"
					placeholder="Type a message..."
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>
				<button onClick={handleSend} disabled={loading} className={`text-sm font-semibold hover:cursor-pointer ${loading ? "text-gray-400" : "text-green-600"}`}>
					Send
				</button>
			</div>
			{error && <div className="px-3 py-1 text-xs text-red-600 border-t bg-red-50">{error}</div>}
		</div>
	);
}

export default ChatBox;
