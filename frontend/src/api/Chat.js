import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getChats(userId, coachId) {
	try {
		const response = await axios.get(`${baseApi}/api/Chat?UserId=${userId}&CoachId=${coachId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get chats failed!";
		throw new Error(msg);
	}
}

export async function createChat({ chatId, userId, coachId, content, type, status, chat_date, sender }) {
	try {
		const payload = {
			chatId,
			userId,
			coachId,
			content,
			type,
			status,
			chat_date,
			sender,
		};
		const response = await axios.post(`${baseApi}/api/Chat`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Create chat failed!";
		throw new Error(msg);
	}
}