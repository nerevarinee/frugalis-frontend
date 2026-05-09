import { redirect } from '@sveltejs/kit'

export async function load({ locals, fetch }) {
  if (!locals.user) throw redirect(303, '/auth/login')

  const res = await fetch(PUBLIC_API_URL + '/api/users/me', {
    credentials: 'include'
  })
  const user = await res.json()

  return { user }
}