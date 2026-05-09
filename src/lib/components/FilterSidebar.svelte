<script>
  import { createEventDispatcher } from 'svelte'
  import { goto } from '$app/navigation'

  const dispatch = createEventDispatcher()

  let search = ''
  let category = ''
  let size = ''
  let condition = ''
  let minPrice = ''
  let maxPrice = ''

  // Get current URL params to populate form
  function getCurrentFilters() {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      search = urlParams.get('search') || ''
      category = urlParams.get('category') || ''
      size = urlParams.get('size') || ''
      condition = urlParams.get('condition') || ''
      minPrice = urlParams.get('minPrice') || ''
      maxPrice = urlParams.get('maxPrice') || ''
    }
  }

  // Initialize filters from URL
  getCurrentFilters()

  function applyFilters() {
    const params = new URLSearchParams()

    if (search.trim()) params.set('search', search.trim())
    if (category) params.set('category', category)
    if (size.trim()) params.set('size', size.trim())
    if (condition) params.set('condition', condition)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)

    goto(`?${params.toString()}`, { replaceState: true })
  }

  function clearFilters() {
    search = ''
    category = ''
    size = ''
    condition = ''
    minPrice = ''
    maxPrice = ''
    goto('?', { replaceState: true })
  }

  // Auto-apply filters on input change (debounced)
  let timeout
  function handleInputChange() {
    clearTimeout(timeout)
    timeout = setTimeout(applyFilters, 500)
  }
</script>

<svelte:window on:popstate={getCurrentFilters} />

<aside class="filters">
  <div class="filter-header">
    <h3>Filters</h3>
    <button class="clear-btn" on:click={clearFilters}>Clear All</button>
  </div>

  <div class="filter-group">
    <label for="search">Search</label>
    <input
      id="search"
      type="text"
      placeholder="Search listings..."
      bind:value={search}
      on:input={handleInputChange}
    />
  </div>

  <div class="filter-group">
    <label for="category">Category</label>
    <select id="category" bind:value={category} on:change={applyFilters}>
      <option value="">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
      <option value="books">Books</option>
      <option value="furniture">Furniture</option>
      <option value="sports">Sports</option>
      <option value="automotive">Automotive</option>
      <option value="home">Home & Garden</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div class="filter-group">
    <label for="size">Size</label>
    <input
      id="size"
      type="text"
      placeholder="e.g. M, 42, Large"
      bind:value={size}
      on:input={handleInputChange}
    />
  </div>

  <div class="filter-group">
    <label for="condition">Condition</label>
    <select id="condition" bind:value={condition} on:change={applyFilters}>
      <option value="">Any Condition</option>
      <option value="new">New</option>
      <option value="like-new">Like New</option>
      <option value="good">Good</option>
      <option value="well-worn">Well Worn</option>
      <option value="poor">Poor</option>
    </select>
  </div>

  <div class="filter-group">
    <label>Price Range</label>
    <div class="price-inputs">
      <input
        type="number"
        placeholder="Min"
        bind:value={minPrice}
        on:input={handleInputChange}
        min="0"
      />
      <span>to</span>
      <input
        type="number"
        placeholder="Max"
        bind:value={maxPrice}
        on:input={handleInputChange}
        min="0"
      />
    </div>
  </div>
</aside>

<style>
  .filters {
    background: #fff;
    border: 0px solid #e0e0e0;
    border-radius: 0px;
    padding: 1.5rem;
    padding-right: 4rem
    min-width: 80px;
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .filter-header h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
    color: #111;
  }

  .clear-btn {
    background: none;
    border: none;
    color: #666;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .clear-btn:hover {
    background: #f5f5f5;
    color: #111;
  }

  .filter-group {
    margin-bottom: 1.25rem;
  }

  .filter-group:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  input[type="number"],
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.95rem;
    font-family: inherit;
    transition: border-color 0.2s;
  }

  input[type="text"]:focus,
  input[type="number"]:focus,
  select:focus {
    outline: none;
    border-color: #111;
  }

  select {
    background: #fff;
    cursor: pointer;
  }

  .price-inputs {
    display: grid;
    align-items: center;
    gap: 0.5rem;
  }

  .price-inputs input {
    flex: 1;
  }

  .price-inputs span {
    color: #666;
    font-size: 0.9rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .filters {
      min-width: auto;
      width: 100%;
    }

    .filter-header {
      flex-direction: column;
      gap: 0.75rem;
      align-items: flex-start;
    }
  }
</style>