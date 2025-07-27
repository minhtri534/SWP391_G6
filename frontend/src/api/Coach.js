import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getCoachId(userId) {
	try {
		const response = await axios.get(`${baseApi}/api/CoachInfo/${userId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get coachId failed!";
		throw new Error(msg);
	}
}
