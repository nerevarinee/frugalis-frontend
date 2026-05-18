import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ fetch, locals }) {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const res = await fetch(`${PUBLIC_API_URL}/api/messages/conversations`, {
		credentials: 'include'
	});

	return { conversations: res.ok ? await res.json() : [] };
}
