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

export async function getUnapprovedPost() {
	try {
		const response = await axios.get(`${baseApi}/api/posts/unapproved`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get unapproved posts failed!!!";
		throw new Error(msg);
	}
}

export async function approvePost(postId) {
	try {
		const response = await axios.put(`${baseApi}/api/posts/${postId}/approve`, null, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Approve post failed!!!";
		throw new Error(msg);
	}
}

export async function deletePost(postId) {
	try {
		const response = await axios.delete(`${baseApi}/api/posts/${postId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Delete post failed!!!";
		throw new Error(msg);
	}
}
