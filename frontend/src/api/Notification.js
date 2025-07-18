import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getNotification() {
	try {
		const response = await axios.get(`${baseApi}/api/NotificationManagement`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get notifications list failed!!!";
		throw new Error(msg);
	}
}

export async function getUserNotification(userId) {
	try {
		const response = await axios.get(`${baseApi}/api/Notification/${userId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get user notifications failed!!!";
		throw new Error(msg);
	}
}

export async function deleteNotification(notificationId) {
	try {
		const response = await axios.get(`${baseApi}/api/NotificationManagement${notificationId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove notifications failed!!!";
		throw new Error(msg);
	}
}
