import { fail } from '@sveltejs/kit'

export async function load({ fetch }) {
  const res = await fetch('http://localhost:8080/api/listings/my', {
    credentials: 'include'
  })
  return { listings: await res.json() }
}

export const actions = {
  delete: async ({ request, fetch }) => {
    const form = await request.formData()
    const id = form.get('id')
    const res = await fetch(`http://localhost:8080/api/listings/${id}`, {
      method: 'DELETE', credentials: 'include'
    })
    if (!res.ok) return fail(400, { error: 'Could not delete' })
    return { success: true }
  },

  toggleSold: async ({ request, fetch }) => {
    const form = await request.formData()
    const id = form.get('id')
    await fetch(`http://localhost:8080/api/listings/${id}/sold`, {
      method: 'PATCH', credentials: 'include'
    })
    return { success: true }
  }
}