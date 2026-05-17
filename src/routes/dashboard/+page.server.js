import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ fetch }) {
	const res = await fetch(PUBLIC_API_URL + '/api/users/me/stats', {
		credentials: 'include'
	});
	const stats = await res.json();
	return { stats };
}
