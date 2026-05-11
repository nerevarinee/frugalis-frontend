import { fail } from '@sveltejs/kit'
import { PUBLIC_API_URL } from '$env/static/public'

export const actions = {
  default: async ({ request, fetch }) => {
    const API_URL = PUBLIC_API_URL || 'http://localhost:8080'
    const form = await request.formData()

    const res = await fetch(`${API_URL}/api/users/me`, {
      method: 'PUT',
      body: form,
      credentials: 'include'
    })

    if (!res.ok) return fail(400, { error: 'Update failed' })
    return { success: true }
  }
}