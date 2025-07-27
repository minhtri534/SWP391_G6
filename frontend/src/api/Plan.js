import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getMemberPlan(userId) {
	try {
		const response = await axios.get(`${baseApi}/api/QuitPlan/user/${userId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get member plan failed!!!";
		throw new Error(msg);
	}
}

export async function getPlanByPlanId(planId) {
	try {
		const response = await axios.get(`${baseApi}/api/QuitPlan/${planId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get plan by Id failed!!!";
		throw new Error(msg);
	}
}

export async function addPlan({ userId, coachId, statusId, reason, startDate, goalDate }) {
	try {
		const payload = {
			userId: userId,
			coachId: coachId,
			statusId: statusId,
			reason: reason,
			startDate: startDate,
			goalDate: goalDate,
		};
		console.log("Payload: ", payload);
		const response = await axios.post(`${baseApi}/api/QuitPlan/create`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Add plan failed!!!";
		throw new Error(msg);
	}
}

export async function updatePlan({ planId, userId, coachId, statusId, reason, startDate, goalDate }) {
	try {
		const payload = {
			userId: userId,
			coachId: coachId,
			statusId: statusId,
			reason: reason,
			startDate: startDate,
			goalDate: goalDate,
		};
		const response = await axios.put(`${baseApi}/api/QuitPlan/update/${planId}`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update plan failed!!!";
		throw new Error(msg);
	}
}

export async function deletePlan(planId) {
	try {
		const response = await axios.delete(`${baseApi}/api/QuitPlan/Delete/${planId}`);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove plan failed!!!";
		throw new Error(msg);
	}
}
