import axios from "axios";
import { getAuthConfig } from "./Auth";

const baseApi = "http://localhost:5196";

export async function getMembershipPlans() {
	try {
		const response = await axios.get(`${baseApi}/Membership/ViewMembershipPlan`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Get memberships failed!";
		throw new Error(msg);
	}
}

export async function createMembershipPlan({ membershipName, price, duration }) {
	try {
		const payload = {
			membershipName: membershipName,
			price: price,
			duration: duration
		};
		const response = await axios.post(`${baseApi}/Membership/CreateMembershipPlan`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Create membership failed!";
		throw new Error(msg);
	}
}

export async function updateMembershipPlan({ membershipId, membershipName, price, duration }) {
	try {
		const payload = {
			membershipName: membershipName,
			price: price,
			duration: duration
		};
		const response = await axios.patch(`${baseApi}/Membership/UpdateMembershipPlan/${membershipId}`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Update membership failed!";
		throw new Error(msg);
	}
}

export async function deleteMembershipPlan(membershipId) {
	try {
		const response = await axios.delete(`${baseApi}/Membership/DeleteMembershipPlan/${membershipId}`, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Remove membership failed!";
		throw new Error(msg);
	}
}

export async function buyMembershipPlan({ UserId, MembershipId }) {
	try {
		const payload = {
			UserId: UserId,
			MembershipId: MembershipId
		};
		const response = await axios.post(`${baseApi}/Membership/Buy`, payload, getAuthConfig());
		return response.data;
	} catch (error) {
		const msg = error.response?.data?.message || "Buy membership failed!";
		throw new Error(msg);
	}
}
