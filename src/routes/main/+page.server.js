export async function load({ fetch }) {
  const res = await fetch('http://localhost:8080/api/listings/featured')
  const data = await res.json()
  return data
}