import axios from "axios";
import { getAuthConfig } from "./Auth"; // Đảm bảo đường dẫn này đúng tới file Auth.js của bạn

const baseApi = "http://localhost:5196"; // Đặt baseURL của API của bạn ở đây

/**
 * Lấy tất cả các mục Daily Progress.
 * @returns {Promise<Array>} - Một Promise giải quyết với một mảng các đối tượng Daily Progress.
 * @throws {Error} - Ném lỗi nếu yêu cầu API thất bại.
 */
export async function getDailyProgress() {
    try {
        // Nếu không cần xác thực cho việc lấy tất cả (ví dụ: cho admin), không dùng getAuthConfig()
        // Nếu chỉ người dùng đã đăng nhập mới xem được, thì dùng getAuthConfig()
        const response = await axios.get(`${baseApi}/api/DailyProgress`, getAuthConfig());
        return response.data;
    } catch (error) {
        const msg = error.response?.data?.message || "Get daily progress failed!!!";
        throw new Error(msg);
    }
}

/**
 * Lấy các mục Daily Progress của một người dùng cụ thể.
 * @param {string} userId - ID của người dùng để lọc tiến độ hàng ngày.
 * @returns {Promise<Array>} - Một Promise giải quyết với một mảng các đối tượng Daily Progress của người dùng đó.
 * @throws {Error} - Ném lỗi nếu yêu cầu API thất bại.
 */
export async function getDailyProgressByUserId(userId) {
    try {
        // Sử dụng getAuthConfig() vì đây là dữ liệu cá nhân của người dùng
        const response = await axios.get(`${baseApi}/api/DailyProgress?userId=${userId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        const msg = error.response?.data?.message || `Get daily progress for user ${userId} failed!!!`;
        throw new Error(msg);
    }
}

/**
 * Tạo một mục Daily Progress mới.
 * @param {object} progressData - Dữ liệu của mục Daily Progress mới.
 * @param {string} progressData.userId - ID của người dùng.
 * @param {string} progressData.note - Ghi chú tiến độ.
 * @param {number} progressData.no_smoking - Số ngày/giờ/phút không hút thuốc.
 * @param {string} progressData.symptoms - Các triệu chứng gặp phải.
 * @param {string} progressData.date - Ngày của tiến độ (ví dụ: 'YYYY-MM-DD').
 * @returns {Promise<object>} - Một Promise giải quyết với đối tượng Daily Progress đã được tạo.
 * @throws {Error} - Ném lỗi nếu yêu cầu API thất bại.
 */
export async function createDailyProgress(progressData) {
    try {
        // Sử dụng getAuthConfig() vì đây là hành động tạo dữ liệu người dùng
        const response = await axios.post(`${baseApi}/api/DailyProgress`, progressData, getAuthConfig());
        return response.data;
    } catch (error) {
        const msg = error.response?.data?.message || "Create daily progress failed!!!";
        throw new Error(msg);
    }
}

/**
 * Cập nhật một mục Daily Progress hiện có theo ID.
 * @param {string} progressId - ID của mục Daily Progress cần cập nhật.
 * @param {object} updatedData - Dữ liệu cập nhật cho mục Daily Progress.
 * @param {string} updatedData.userId - ID của người dùng (nên khớp với người dùng đang đăng nhập).
 * @param {string} updatedData.note - Ghi chú tiến độ.
 * @param {number} updatedData.no_smoking - Số ngày/giờ/phút không hút thuốc.
 * @param {string} updatedData.symptoms - Các triệu chứng gặp phải.
 * @param {string} updatedData.date - Ngày của tiến độ (ví dụ: 'YYYY-MM-DD').
 * @returns {Promise<object>} - Một Promise giải quyết với đối tượng Daily Progress đã được cập nhật.
 * @throws {Error} - Ném lỗi nếu yêu cầu API thất bại.
 */
export async function updateDailyProgress(progressId, updatedData) {
    try {
        // Sử dụng getAuthConfig() vì đây là hành động cập nhật dữ liệu người dùng
        const response = await axios.put(`${baseApi}/api/DailyProgress/${progressId}`, updatedData, getAuthConfig());
        return response.data;
    } catch (error) {
        const msg = error.response?.data?.message || `Update daily progress ${progressId} failed!!!`;
        throw new Error(msg);
    }
}

/**
 * Xóa một mục Daily Progress theo ID.
 * @param {string} progressId - ID của mục Daily Progress cần xóa.
 * @returns {Promise<void>} - Một Promise giải quyết khi xóa thành công.
 * @throws {Error} - Ném lỗi nếu yêu cầu API thất bại.
 */
export async function deleteDailyProgress(progressId) {
    try {
        // Sử dụng getAuthConfig() vì đây là hành động xóa dữ liệu người dùng
        await axios.delete(`${baseApi}/api/DailyProgress/${progressId}`, getAuthConfig());
        return true; // Trả về true để báo hiệu xóa thành công
    } catch (error) {
        const msg = error.response?.data?.message || `Delete daily progress ${progressId} failed!!!`;
        throw new Error(msg);
    }
}