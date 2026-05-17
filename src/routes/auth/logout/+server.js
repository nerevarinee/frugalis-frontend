import { redirect } from '@sveltejs/kit';

export async function GET({ cookies }) {
	console.log('Logging out user...');
	cookies.delete('access_token', {
		path: '/'
	});

	return redirect(303, '/auth/login');
}
