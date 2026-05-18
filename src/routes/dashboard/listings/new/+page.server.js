import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const form = await event.request.formData();

		const res = await event.fetch(PUBLIC_API_URL + '/api/listings/create', {
			method: 'POST',
			body: form, // send as multipart for image upload
			credentials: 'include'
		});

		if (!res.ok) {
			const err = await res.json();
			return fail(400, { error: err.message });
		}

		throw redirect(303, '/dashboard/listings');
	}
};
