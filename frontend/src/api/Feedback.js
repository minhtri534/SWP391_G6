import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getFeedbacks() {
	try {
		const response = await axios.get(`${baseApi}/api/Feedback`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get feedbacks failed!!!";
		throw new Error(msg);
	}
}

export async function getFeedbacksByCoachId(coachId) {
	try {
		const response = await axios.get(`${baseApi}/api/Feedback?${coachId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get feedbacks failed!!!";
		throw new Error(msg);
	}
}
