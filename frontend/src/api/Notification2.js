import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getNotifications(userId) {
  try {
    const response = await axios.get(`${baseApi}/api/Notification/${userId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch notifications!";
    throw new Error(msg);
  }
}