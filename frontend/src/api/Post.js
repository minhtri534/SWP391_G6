import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getPostById(postId) {
	try {
		const response = await axios.get(`${baseApi}/api/posts/${postId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get report failed!!!";
		throw new Error(msg);
	}
}
