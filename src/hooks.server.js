export async function handle({ event, resolve }) {
	const token = event.cookies.get('access_token');

	// In production, verify the token or fetch user data
	if (token) {
		event.locals.user = { authenticated: true };
	} else {
		event.locals.user = null;
	}

	return resolve(event);
}
