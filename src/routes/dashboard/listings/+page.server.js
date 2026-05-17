import { fail } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

//dashboard listings page

export async function load({ fetch }) {
	const API_URL = PUBLIC_API_URL || 'http://localhost:8080';
	const res = await fetch(`${API_URL}/api/listings/my`, {
		credentials: 'include'
	});

	console.log(`${API_URL}/api/listings/my`);

	return { listings: await res.json() };
}

export const actions = {
	delete: async ({ request, fetch }) => {
		const API_URL = PUBLIC_API_URL || 'http://localhost:8080';
		const form = await request.formData();
		const id = form.get('id');
		const res = await fetch(`${API_URL}/api/listings/delete/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		});
		if (!res.ok) return fail(400, { error: 'Could not delete' });
		return { success: true };
	},

	toggleSold: async ({ request, fetch }) => {
		const API_URL = PUBLIC_API_URL || 'http://localhost:8080';
		const form = await request.formData();
		const id = form.get('id');
		await fetch(`${API_URL}/api/listings/${id}/sold`, {
			method: 'PATCH',
			credentials: 'include'
		});
		return { success: true };
	}
};
