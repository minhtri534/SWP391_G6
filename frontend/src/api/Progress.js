import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getDailyProgress(userId, date) {
	try {
		const response = await axios.get(`${baseApi}/api/Chat?UserId=${userId}&date=${date}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get member daily progress failed!";
		throw new Error(msg);
	}
}
