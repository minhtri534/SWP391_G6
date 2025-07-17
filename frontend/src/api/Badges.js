import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getBadges() {
	try {
		const response = await axios.get(`${baseApi}/api/BadgeManagement`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get badges failed!!!";
		throw new Error(msg);
	}
}

export async function addBadge({ badgeName, description, conditionType, value }) {
	try {
		const payload = {
			badgeName: badgeName,
			description: description,
			condition_Type: conditionType,
			value: value,
		};
		const response = await axios.post(`${baseApi}/api/BadgeManagement`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Add badge failed!!!";
		throw new Error(msg);
	}
}

export async function updateBadge({ badgeId, badgeName, description, conditionType, value }) {
	try {
		const payload = {
			badgeName: badgeName,
			description: description,
			condition_Type: conditionType,
			value: value,
		};
		const response = await axios.patch(`${baseApi}/api/BadgeManagement/${badgeId}`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update badge failed!!!";
		throw new Error(msg);
	}
}

export async function deleteBadge(badgeId) {
	try {
		const response = await axios.delete(`${baseApi}/api/BadgeManagement/${badgeId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove badge failed!!!";
		throw new Error(msg);
	}
}
