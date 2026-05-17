import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ params, fetch }) {
	const API_URL = PUBLIC_API_URL || 'http://localhost:8080';
	const { username } = params;

	const profileRes = await fetch(`${API_URL}/api/users/profile/username/${username}`);
	if (!profileRes.ok) {
		throw error(404, 'User not found');
	}
	const profile = await profileRes.json();

	const listingsRes = await fetch(`${API_URL}/api/listings/user/${username}`);
	const listings = listingsRes.ok ? await listingsRes.json() : [];

	return { profile, listings };
}
