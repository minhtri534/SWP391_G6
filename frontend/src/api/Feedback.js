import axios from "axios";

const baseApi = "http://localhost:5000";

export async function getFeedbacks() {
	try {
		const response = await axios.get(`${baseApi}`);
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get feedbacks failed!!!";
		throw new Error(msg);
	}
}
