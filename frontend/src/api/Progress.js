import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getDailyProgress(userId, date) {
	try {
		if (date != null) {
			const response = await axios.get(`${baseApi}/api/TrackProgress?UserId=${userId}&date=${date}`, getAuthConfig());
			return response.data;
		} else {
			const response = await axios.get(`${baseApi}/api/TrackProgress?UserId=${userId}`, getAuthConfig());
			return response.data;
		}
	} catch (error) {
		const msg = error.response?.data?.message || "Get member daily progress failed!";
		throw new Error(msg);
	}
}
