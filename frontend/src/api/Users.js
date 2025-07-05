import axios from "axios";

const baseApi = "http://localhost:5000";

export async function getUsers() {
	try {
		const response = await axios.get(`${baseApi}`);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get user failed!!!";
		throw new Error(msg);
	}
}

export async function addUser(params) {
	try {
		const response = await axios.post(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Add user failed";
		throw new Error(msg);
	}
}

export async function updateUser(params) {
	try {
		const response = await axios.patch(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update user failed";
		throw new Error(msg);
	}
}

export async function deleteUser(params) {
	try {
		const response = await axios.delete(`${baseApi}`, params);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove user failed";
		throw new Error(msg);
	}
}
