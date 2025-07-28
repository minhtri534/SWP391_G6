import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

// Lấy danh sách tất cả bài đăng
export async function getPosts() {
  try {
    const response = await axios.get(`${baseApi}/api/posts`, getAuthConfig());
    return response.data; // Trả về mảng { postId, userId, title, content, create_date }
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch posts!";
    throw new Error(msg);
  }
}

// Tạo bài đăng mới (yêu cầu object chứa userId, title, content)
export async function createPost(postData) {
  try {
    const response = await axios.post(`${baseApi}/api/posts`, postData, getAuthConfig());
    return response.data; // Trả về { postId, userId, title, content, create_date }
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to create post!";
    throw new Error(msg);
  }
}

// Lấy chi tiết bài đăng theo postId
export async function getPostById(id) {
  try {
    const response = await axios.get(`${baseApi}/api/posts/${id}`, getAuthConfig());
    return response.data; // Trả về { postId, userId, title, content, create_date }
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch post!";
    throw new Error(msg);
  }
}

// Cập nhật bài đăng theo postId (yêu cầu object chứa title, content, hoặc toàn bộ)
export async function updatePost(id, postData) {
  try {
    const response = await axios.put(`${baseApi}/api/posts/${id}`, postData, getAuthConfig());
    return response.data; // Trả về { postId, userId, title, content, create_date } đã cập nhật
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to update post!";
    throw new Error(msg);
  }
}

// Xóa bài đăng theo postId
export async function deletePost(id) {
  try {
    const response = await axios.delete(`${baseApi}/api/posts/${id}`, getAuthConfig());
    return response.data; // Trả về thông báo thành công (ví dụ: { success: true })
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to delete post!";
    throw new Error(msg);
  }
}