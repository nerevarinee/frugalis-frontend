import { fail, redirect } from '@sveltejs/kit';

export function load({ locals }) {
  if (locals.user) {
    throw redirect(302, '/');
  }
}

export const actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();

    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');

    // call your backend (Node/Express)
    const res = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    if (!res.ok) {
      return fail(400, { error: 'Registration failed' });
    }

    // redirect after success
    throw redirect(303, '/auth/login');
  }
};