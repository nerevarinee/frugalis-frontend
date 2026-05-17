import { redirect } from '@sveltejs/kit';

export async function load() {
	const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';
	const res = await fetch(`${API_URL}/api/users/logout`, {
		method: 'POST',
		credentials: 'include'
	});

	if (!res.ok) {
		throw new Error('Logout failed');
	}

	// Redirect to login after successful logout
	throw redirect(303, '/auth/login');
}
