import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getSmokingStatus(userId) {
	try {
		const response = await axios.get(`${baseApi}/api/SmokingStatus/${userId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get smoking status failed!";
		throw new Error(msg);
	}
}

export async function createSmokingStatus({ userId, timePeriod, amountPerDay, frequency, pricePerPack, description }) {
	try {
		const payload = {
			userId: userId,
			timePeriod: timePeriod,
			amountPerDay: amountPerDay,
			frequency: frequency,
			pricePerPack: pricePerPack,
			description: description
		};
		const response = await axios.post(`${baseApi}/api/SmokingStatus`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Create smoking status failed!";
		throw new Error(msg);
	}
}

export async function updateSmokingStatus({ userId, timePeriod, amountPerDay, frequency, pricePerPack, description }) {
	try {
		const payload = {
			userId: userId,
			timePeriod: timePeriod,
			amountPerDay: amountPerDay,
			frequency: frequency,
			pricePerPack: pricePerPack,
			description: description
		};
		const response = await axios.patch(`${baseApi}/api/SmokingStatus`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update smoking status failed!";
		throw new Error(msg);
	}
}

