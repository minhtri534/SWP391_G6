export function getAuthConfig() {
	const token = localStorage.getItem("userToken");
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

export function getTokenData(token) {
	if (!token) return null;
	try {
		const payloadBase64 = token.split(".")[1];
		const decodedPayload = JSON.parse(atob(payloadBase64));
		return decodedPayload; // Return the whole decoded token
	} catch (error) {
		console.error("Invalid token:", error);
		return null;
	}
}
