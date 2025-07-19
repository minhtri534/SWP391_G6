import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getUsers() {
	try {
		const response = await axios.get(`${baseApi}/AccountManageAdmin/ViewAllUsers`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get user failed!!!";
		throw new Error(msg);
	}
}

export async function addUser({ userName, phoneNum, password, gender, age, experience, availableTime, specialty }) {
	try {
		const payload = {
			username: userName,
			phoneNum: phoneNum,
			password: password,
			gender: gender,
			age: age,
			experience: experience,
			availableTime: availableTime,
			specialty: specialty,
		};
		const response = await axios.post(`${baseApi}/AccountManageAdmin/CreateCoachAcc`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Add user failed";
		throw new Error(msg);
	}
}

export async function updateUser({ userName, phoneNum, password, gender, age, experience, availableTime, specialty }) {
	try {
		const payload = {
			username: userName,
			phoneNum: phoneNum,
			password: password,
			gender: gender,
			age: age,
			experience: experience,
			availableTime: availableTime,
			specialty: specialty,
		};
		const response = await axios.patch(`${baseApi}/AccountManageAdmin`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update user failed";
		throw new Error(msg);
	}
}

export async function deleteUser(userId) {
	try {
		const response = await axios.delete(`${baseApi}/AccountManageAdmin/DeleteAccount/${userId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove user failed";
		throw new Error(msg);
	}
}

export async function lockUser(userId) {
	try {
		const response = await axios.put(`${baseApi}/AccountManageAdmin/LockAccount/${userId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Lock user failed";
		throw new Error(msg);
	}
}

export async function unlockUser(userId) {
	try {
		const response = await axios.put(`${baseApi}/AccountManageAdmin/UnlockAccount/${userId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Unlock user failed";
		throw new Error(msg);
	}
}

export async function getCoachMember(coachId) {
	try {
		const response = await axios.put(`${baseApi}/AccountManageAdmin/${coachId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get member list failed";
		throw new Error(msg);
	}
}
