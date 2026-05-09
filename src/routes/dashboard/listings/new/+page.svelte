<script>
  import { enhance } from '$app/forms'
  export let form

  let previews = []

  function handleFiles(e) {
    previews = []
    for (const file of e.target.files) {
      const url = URL.createObjectURL(file)
      previews = [...previews, url]
    }
  }
</script>

<div class="create-listing">
  <h1>New Listing</h1>

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <form method="POST" enctype="multipart/form-data" use:enhance>

    <div class="image-upload">
      <label for="images">Photos (up to 5)</label>
      <input
        id="images"
        type="file"
        name="images"
        multiple
        accept="image/*"
        on:change={handleFiles}
        required
      />
      {#if previews.length > 0}
        <div class="previews">
          {#each previews as src}
            <img {src} alt="preview" />
          {/each}
        </div>
      {/if}
    </div>

    <div class="field">
      <label for="name">Title</label>
      <input id="name" name="name" type="text"
        placeholder="e.g. Vintage Levi's Denim Jacket" required />
    </div>

    <div class="field">
      <label for="description">Description</label>
      <textarea id="description" name="description" rows="4"
        placeholder="Describe the item, any flaws, measurements..." required />
    </div>

    <div class="row">
      <div class="field">
        <label for="price">Price ()</label>
        <input id="price" name="price" type="number" min="0" step="0.01" required />
      </div>

      <div class="field">
        <label for="size">Size</label>
        <select id="size" name="size" required>
          <option value="">Select size</option>
          {#each ['XS','S','M','L','XL','XXL','One Size'] as s}
            <option value={s}>{s}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="row">
      <div class="field">
        <label for="category">Category</label>
        <select id="category" name="category" required>
          <option value="">Select category</option>
          {#each ['tops','bottoms','dresses','outerwear','shoes','accessories','other'] as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </div>

      <div class="field">
        <label for="condition">Condition</label>
        <select id="condition" name="condition" required>
          <option value="">Select condition</option>
          {#each ["new", "like-new", "good", "well-worn", "poor"] as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="field">
      <label for="brand">Brand (optional)</label>
      <input id="brand" name="brand" type="text" placeholder="e.g. Zara, H&M, Nike" />
    </div>

    <button type="submit" class="submit-btn">Publish Listing</button>
  </form>
</div>

<style>
  .create-listing { max-width: 640px; }
  h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1.5rem; }

  form { display: flex; flex-direction: column; gap: 1.25rem; }

  .field { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }

  label { font-size: 0.85rem; font-weight: 600; color: #333; }

  input, select, textarea {
    padding: 0.65rem 0.85rem;
    border: 1px solid #ddd;
    border-radius: 2px;
    font-size: 0.95rem;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #111;
  }

  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .image-upload { display: flex; flex-direction: column; gap: 0.75rem; }

  .previews {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .previews img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 2px;
    border: 1px solid #eee;
  }

  .submit-btn {
    padding: 0.85rem;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 2px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border: 3px solid #202020;
  }
  .submit-btn:hover {
    background: beige;
    color: #202020;
  }

  .error {
    background: #fef2f2;
    color: #ef4444;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
  }
</style>