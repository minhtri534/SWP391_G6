import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getCommentById(commentId) {
	try {
		const response = await axios.get(`${baseApi}/api/comments/${commentId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get comment failed!!!";
		throw new Error(msg);
	}
}
