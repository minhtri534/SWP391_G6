import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getBadgesByUserId(userId) {
  try {
    const response = await axios.get(`${baseApi}/api/Badge/${userId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch badges!";
    throw new Error(msg);
  }
}

export async function getBadgeDetail(userId, badgeId) {
  try {
    const response = await axios.get(`${baseApi}/api/Badge/${userId}/${badgeId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch badge details!";
    throw new Error(msg);
  }
}

export async function getUnearnedBadgesByUserId(userId) {
  try {
    const response = await axios.get(`${baseApi}/api/Badge/Unearned/${userId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch unearned badges!";
    throw new Error(msg);
  }
}