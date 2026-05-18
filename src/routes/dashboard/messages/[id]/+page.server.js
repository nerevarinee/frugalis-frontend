import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ fetch, locals, params }) {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const res = await fetch(`${PUBLIC_API_URL}/api/messages/conversations/${params.id}`, {
		credentials: 'include'
	});

	const data = res.ok ? await res.json() : null;
	return { id: params.id, conversation: data?.conversation ?? null };
}
