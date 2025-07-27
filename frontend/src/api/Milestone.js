import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getMilestoneByPlanId(planId) {
	try {
		const response = await axios.get(`${baseApi}/api/CRUDMilestone/ViewMilestonesByPlanId/${planId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Failed to fetch milestones details!";
		throw new Error(msg);
	}
}

export async function addMilestone({ planId, badgeId, title, description, targetDate }) {
	try {
		const payload = {
			planId: planId,
			badgeId: badgeId,
			title: title,
			description: description,
			targetDate: targetDate,
		};
		console.log("Milestone payload: ", payload);
		const response = await axios.post(`${baseApi}/CRUDMilestone/CreateMilestone`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Add milestone failed!!!";
		throw new Error(msg);
	}
}

export async function updateMilestone({ milestoneId, planId, badgeId, title, description, targetDate }) {
	try {
		const payload = {
			planId: planId,
			badgeId: badgeId,
			title: title,
			description: description,
			targetDate: targetDate,
		};
		const response = await axios.put(`${baseApi}/CRUDMilestone/UpdateMilestone/${milestoneId}`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update milestone failed!!!";
		throw new Error(msg);
	}
}

export async function deleteMilestone(milestoneId) {
	try {
		const response = await axios.delete(`${baseApi}/CRUDMilestone/DeleteMilestone/${milestoneId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove milestone failed!!!";
		throw new Error(msg);
	}
}
