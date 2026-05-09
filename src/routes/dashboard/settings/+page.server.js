import { fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ request, fetch }) => {
    const form = await request.formData()

    const res = await fetch('http://localhost:8080/api/users/me', {
      method: 'PUT',
      body: form,
      credentials: 'include'
    })

    if (!res.ok) return fail(400, { error: 'Update failed' })
    return { success: true }
  }
}