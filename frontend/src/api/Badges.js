import axios from "axios";

const baseApi = "http://localhost:5000";

export async function getBadges() {
	try {
		const response = await axios.get(`${baseApi}`);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get badges failed!!!";
		throw new Error(msg);
	}
}

export async function addBadge(params) {
	try {
		const response = await axios.post(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Add badge failed!!!";
		throw new Error(msg);
	}
}

export async function updateBadge(params) {
	try {
		const response = await axios.patch(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update badge failed!!!";
		throw new Error(msg);
	}
}

export async function deleteBadge(params) {
	try {
		const response = await axios.delete(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove badge failed!!!";
		throw new Error(msg);
	}
}
