import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getComments() {
  try {
    const response = await axios.get(`${baseApi}/api/comments`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Get comments failed!!!";
    throw new Error(msg);
  }
}

export async function createComment(postId, userId, content) {
  try {
    const response = await axios.post(`${baseApi}/api/comments`, { postId, userId, content }, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Create comment failed!!!";
    throw new Error(msg);
  }
}

export async function getCommentById(commentId) {
  try {
    const response = await axios.get(`${baseApi}/api/comments/${commentId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Get comment failed!!!";
    throw new Error(msg);
  }
}

export async function updateComment(commentId, postId, userId, content) {
  try {
    const response = await axios.put(`${baseApi}/api/comments/${commentId}`, { postId, userId, content }, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Update comment failed!!!";
    throw new Error(msg);
  }
}

export async function deleteComment(commentId) {
  try {
    const response = await axios.delete(`${baseApi}/api/comments/${commentId}`, getAuthConfig());
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Delete comment failed!!!";
    throw new Error(msg);
  }
}