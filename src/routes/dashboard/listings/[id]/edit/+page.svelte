<script>
  import { enhance } from '$app/forms'
  export let data
  $: listing = data.listing
</script>

<h1>Edit Listing</h1>

<form method="POST" use:enhance>
  <div class="field">
    <label>Title</label>
    <input name="title" value={listing.title} required />
  </div>
  <div class="field">
    <label>Description</label>
    <textarea name="description" rows="4">{listing.description}</textarea>
  </div>
  <div class="row">
    <div class="field">
      <label>Price</label>
      <input name="price" type="number" value={listing.price} required />
    </div>
    <div class="field">
      <label>Size</label>
      <select name="size">
        {#each ['XS','S','M','L','XL','XXL','One Size'] as s}
          <option value={s} selected={listing.size === s}>{s}</option>
        {/each}
      </select>
    </div>
  </div>
  <!-- repeat other fields the same way -->
  <button type="submit">Save Changes</button>
</form>