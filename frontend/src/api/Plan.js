import axios from "axios";

const baseApi = "http://localhost:5000";

export async function addPlan(params) {
	try {
		const response = await axios.post(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Add plan failed!!!";
		throw new Error(msg);
	}
}

export async function updatePlan(params) {
	try {
		const response = await axios.patch(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update plan failed!!!";
		throw new Error(msg);
	}
}

export async function deletePlan(params) {
	try {
		const response = await axios.delete(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove plan failed!!!";
		throw new Error(msg);
	}
}
