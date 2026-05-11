import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export function load({ locals }) {
  if (locals.user) {
    throw redirect(302, '/');
  }
}

export const actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();

    const email = data.get('email');
    const password = data.get('password');

    const res = await fetch(PUBLIC_API_URL + '/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    if (!res.ok) {
      return fail(400, { error: 'Invalid credentials' });
    }

    throw redirect(303, '/');
  }
};