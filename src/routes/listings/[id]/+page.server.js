import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
//single listing page

export async function load({ params, fetch }) {
	const res = await fetch(PUBLIC_API_URL + `/api/listings/listing/${params.id}`);
	if (!res.ok) throw error(404, 'Listing not found');
	return { listing: await res.json() };
}
