import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getReport() {
	try {
		const response = await axios.get(`${baseApi}/api/Report`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get reports failed!!!";
		throw new Error(msg);
	}
}

export async function deleteReportedPost(postId, userId) {
	try {
		console.log(postId, userId);
		const response = await axios.delete(`${baseApi}/api/Report/post/${postId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Delete post failed!!!";
		throw new Error(msg);
	}
}

export async function deleteReportedComment(commentId, userId) {
	try {
		console.log(commentId, userId);
		const response = await axios.delete(`${baseApi}/api/Report/comment/${commentId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Delete comment failed!!!";
		throw new Error(msg);
	}
}

export async function deleteReport(reportId, userId) {
	try {
		console.log(reportId, userId);
		const response = await axios.delete(`${baseApi}/api/Report/report/${reportId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Delete report failed!!!";
		throw new Error(msg);
	}
}
