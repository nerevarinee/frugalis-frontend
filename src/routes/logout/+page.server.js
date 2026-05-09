import { redirect } from '@sveltejs/kit';

export async function load() {
  const res = await fetch('http://localhost:8080/api/users/logout', {
    method: 'POST',
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error('Logout failed');
  }

  // Redirect to login after successful logout
  throw redirect(303, '/auth/login');
}
