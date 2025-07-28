import axios from "axios";
import { getAuthConfig } from "./Auth";
import { send } from "vite";

const baseApi = "http://localhost:5196";

export async function getChat({ userId, coachId }) {
	try {
		const response = await axios.get(`${baseApi}/api/Chat`, getAuthConfig(), {params: {userId: userId, coachId: coachId}});
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get chat failed!";
		throw new Error(msg);
	}
}

export async function geBookedCoachByMemberId(memberId) {
	try {
		const response = await axios.get(`${baseApi}/api/Booking/${memberId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get coach failed!";
		throw new Error(msg);
	}
}

export async function sendChat({ userId, coachId, content, type, status, chat_Date, sender }) {
	try {
		const payload = {
			userId: userId,
			coachId: coachId,
			content: content,
			type: type,
			status: status,
			chat_Date: chat_Date,
			sender: sender
		};
		const response = await axios.post(`${baseApi}/api/Chat`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Send chat failed!";
		throw new Error(msg);
	}
}
