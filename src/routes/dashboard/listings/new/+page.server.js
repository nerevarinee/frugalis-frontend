import { redirect, fail } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const form = await event.request.formData()

    const res = await event.fetch('http://localhost:8080/api/listings/create', {
      method: 'POST',
      body: form,          // send as multipart for image upload
      credentials: 'include'
    })

    if (!res.ok) {
      const err = await res.json()
      return fail(400, { error: err.message })
    }
    if(res.ok && res.status === 201){
      alert("Listing created successfully!")
      return { success: true }
    }
    
    // const listing = await res.json()
    // throw redirect(303, `/dashboard/listings`)
  }
}