import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getCoaches() {
	try {
		const response = await axios.get(`${baseApi}/api/Booking/Coaches`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get coaches failed!";
		throw new Error(msg);
	}
}

export async function getCoachPackagesByCoachId(coachId) {
	try {
		const response = await axios.get(`${baseApi}/api/Booking/Package/${coachId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get coach packages failed!";
		throw new Error(msg);
	}
}

export async function bookCoaches(userId, packageId, start_Date ) {
	try {
		const payload = {
			UserId: userId,
			PackageId: packageId,
			Start_Date: start_Date
		};
		const response = await axios.post(`${baseApi}/api/Booking`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Book failed!";
		throw new Error(msg);
	}
}
