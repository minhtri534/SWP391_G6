import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getQuitPlanByUserId(userId) {
  try {
    const response = await axios.get(`${baseApi}/api/QuitPlan/user/${userId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch quit plan!";
    throw new Error(msg);
  }
}

export async function getMilestoneById(id) {
  try {
    const response = await axios.get(`${baseApi}/api/CRUDMilestone/ViewMilestoneById/${id}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch milestone details!";
    throw new Error(msg);
  }
}

export async function getQuitPlanById(planId) {
  try {
    const response = await axios.get(`${baseApi}/api/QuitPlan/${planId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch quit plan!";
    throw new Error(msg);
  }
}

export async function getMilestonesByPlanId(planId) {
  try {
    const response = await axios.get(`${baseApi}/api/CRUDMilestone/ViewMilestonesByPlanId/${planId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch milestone details!";
    throw new Error(msg);
  }
}