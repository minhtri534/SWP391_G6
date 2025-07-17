export function getAuthConfig() {
	const token = localStorage.getItem("userToken");
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}
