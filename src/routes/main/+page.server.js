import { PUBLIC } from '$env/static/private'
import { PUBLIC_API_URL } from '$env/static/public'

export async function load({ fetch }) {
  const res = await fetch(PUBLIC_API_URL+ '/api/listings/featured')
  const data = await res.json()
  return data
}