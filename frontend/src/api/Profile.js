import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getProfile(userId) {
  try {
    const response = await axios.get(`${baseApi}/AccountManagement/ViewProfile?userId=${userId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Get profile failed!";
    throw new Error(msg);
  }
}

export async function updateProfile(userId, { userName, age, gender, phoneNum, password, roleId, status, joinDate }) {
  try {
    const payload = {
      userId,
      userName,
      age,
      gender,
      phoneNum,
      password,
      roleId,
      status,
      joinDate,
    };
    const response = await axios.put(`${baseApi}/AccountManagement/UpdateProfile/${userId}`, payload, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Update profile failed!";
    throw new Error(msg);
  }
}

export async function deleteAccount(userId) {
  try {
    const response = await axios.delete(`${baseApi}/AccountManagement/DeleteAccount/${userId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Delete account failed!";
    throw new Error(msg);
  }
}