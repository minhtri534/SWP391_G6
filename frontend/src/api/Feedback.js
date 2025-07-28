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


export async function createFeedback({ userId, coachId, planId, content, rating }) {
	try {
		const payload = {
			userId: userId,
			coachId: coachId,
			planId: planId,
			content: content,
			rating: rating
		};
		const response = await axios.post(`${baseApi}/api/Feedback`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Create feedback failed!!!";
		throw new Error(msg);
	}
}

export async function updateBadge({ feedbackId, userId, content, rating }) {
	try {
		const payload = {
			userId: userId,
			content: content,
			rating: rating
		};
		const response = await axios.put(`${baseApi}/api/Feedback/${feedbackId}`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update feedback failed!!!";
		throw new Error(msg);
	}
}

export async function deleteBadge(feedbackId) {
	try {
		const response = await axios.delete(`${baseApi}/api/Feedback/${feedbackId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove feedback failed!!!";
		throw new Error(msg);
	}
}