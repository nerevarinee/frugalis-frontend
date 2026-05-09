export async function load({ fetch, locals }) {
  const res = await fetch('http://localhost:8080/api/users/me/stats', {
    credentials: 'include'
  })
  const stats = await res.json()
  return { stats }
}