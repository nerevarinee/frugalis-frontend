import { redirect, fail, error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ params, fetch, locals }) {
	const res = await fetch(PUBLIC_API_URL + `/api/listings/${params.id}`);
	if (!res.ok) throw error(404, 'Listing not found');
	const listing = await res.json();

	// make sure only the owner can access this edit page
	if (!locals.user || listing.seller._id !== locals.user.id) throw error(403, 'Forbidden');

	return { listing };
}

export const actions = {
	default: async ({ params, request, fetch }) => {
		const form = await request.formData();

		const res = await fetch(PUBLIC_API_URL + `/api/listings/${params.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(Object.fromEntries(form)),
			credentials: 'include'
		});

		if (!res.ok) return fail(400, { error: 'Update failed' });
		throw redirect(303, '/dashboard/listings');
	}
};
