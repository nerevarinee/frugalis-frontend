import { fail, redirect } from '@sveltejs/kit';

export function load({ locals }) {
  if (locals.user) {
    throw redirect(302, '/');
  }
}

export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const data = await request.formData();

    const username = data.get('username');
    const password = data.get('password');

    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      return fail(400, { error: 'Invalid credentials' });
    }

    const { token } = await res.json();

    // store session token
    cookies.set('access_token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: false // true in production (HTTPS)
    });

    throw redirect(303, '/');
  }
};