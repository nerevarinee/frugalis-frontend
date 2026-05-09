import { PUBLIC } from "$env/static/private"
import { PUBLIC_API_URL } from "$env/static/public"

export async function load({ url, fetch }) {
  const params = url.searchParams.toString()
  const res = await fetch(PUBLIC_API_URL + `/api/listings/listings?${params}`)
  const data = await res.json()
  return data
}