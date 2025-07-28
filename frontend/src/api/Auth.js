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

export function checkTokenExpiry() {
	const token = localStorage.getItem("token");
	if (!token) return;

	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		const now = Math.floor(Date.now() / 1000); // current time in seconds

		if (payload.exp && payload.exp < now) {
			alert("Your session has expired. Please log in again.");
			localStorage.clear(); // or remove only token if needed
			window.location.href = "/Login";
		}
	} catch (err) {
		console.error("Invalid token:", err);
		localStorage.clear();
		window.location.href = "/Login";
	}
}
