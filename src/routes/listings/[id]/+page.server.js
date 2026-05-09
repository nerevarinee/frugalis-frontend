import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
  const res = await fetch(`http://localhost:8080/api/listings/listing/${params.id}`)
  if (!res.ok) throw error(404, 'Listing not found')
  return { listing: await res.json() }
}