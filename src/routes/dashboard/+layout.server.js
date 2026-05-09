import { redirect } from '@sveltejs/kit'

export async function load({ locals, fetch }) {
  if (!locals.user) throw redirect(303, '/auth/login')

  const res = await fetch('http://localhost:8080/api/users/me', {
    credentials: 'include'
  })
  const user = await res.json()

  return { user }
}