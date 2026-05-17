import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ locals, fetch }) {
	if (!locals.user) throw redirect(303, '/auth/login');

	const API_URL = PUBLIC_API_URL || 'http://localhost:8080';
	const res = await fetch(API_URL + '/api/users/me', {
		credentials: 'include'
	});
	const user = await res.json();

	return { user };
}
