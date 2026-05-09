import { redirect } from '@sveltejs/kit'
import { PUBLIC_API_URL } from '$env/static/public'

export async function load({ fetch }) {
  const res = await fetch(PUBLIC_API_URL + '/api/orders/my', {
    credentials: 'include'
  })
  return { orders: await res.json() }
}

export const actions = {
  updateStatus: async ({ request, fetch }) => {
    const form = await request.formData()
    const id = form.get('id')
    const status = form.get('status')
    await fetch(PUBLIC_API_URL + `/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
      credentials: 'include'
    })

    return { success: true }
  },

  delete: async ({ request, fetch }) => {
    const form = await request.formData()
    const id = form.get('id')

    await fetch(PUBLIC_API_URL + `/api/orders/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    return { success: true }
  }
}