export async function load({ url, fetch }) {
  const params = url.searchParams.toString()
  const res = await fetch(`http://localhost:8080/api/listings/listings?${params}`)
  const data = await res.json()
  return data
}