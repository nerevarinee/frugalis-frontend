<script>
  import { page } from '$app/stores'
  import OrderModal from '$lib/components/OrderModal.svelte'

  export let data
  $: listing = data.listing
  $: seller = listing.seller

  let selectedImage = 0
  let showOrderModal = false

  const conditionLabel = {
    'new': 'New with tags',
    'like-new': 'Like new',
    'good': 'Good condition',
    'fair': 'Fair condition',
    'poor': 'Poor condition'
  }

  const conditionColor = {
    'new': '#16a34a',
    'like-new': '#22c55e',
    'good': '#3b82f6',
    'fair': '#f59e0b',
    'poor': '#ef4444'
  }
</script>

<svelte:head>
  <title>{listing.name} — Thrift Market</title>
</svelte:head>

<div class="listing-page">

  <!-- Images -->
  <div class="images-section">
    <div class="main-image">
      <img src={listing.images[selectedImage]} alt={listing.name} />
      {#if listing.status === 'sold'}
        <div class="sold-overlay">SOLD</div>
      {/if}
    </div>
    {#if listing.images.length > 1}
      <div class="thumbnails">
        {#each listing.images as img, i}
          <button
            class:active={selectedImage === i}
            on:click={() => selectedImage = i}
          >
            <img src={img} alt="view {i + 1}" />
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Info -->
  <div class="info-section">

    <div class="info-top">
      <div class="title-row">
        <h1>{listing.name}</h1>
        <p class="price">DZD{listing.price}</p>
      </div>

      <div class="tags">
        <span class="tag">{listing.size}</span>
        <span class="tag">{listing.category}</span>
        <span class="tag condition">
          {listing.condition}
        </span>
        {#if listing.brand}
          <span class="tag">{listing.brand}</span>
        {/if}
      </div>

      <p class="views">👁 {listing.views} views</p>
    </div>

    <!-- Description -->
    <div class="description">
      <h2>Description</h2>
      <p>{listing.description}</p>
    </div>

    <!-- Location -->
    {#if listing.location}
      <div class="listing-location">
        <span>📍</span>
        <span>{listing.location}</span>
      </div>
    {/if}

    <!-- Order Button -->
    {#if listing.status === 'active'}
      <button class="order-btn" on:click={() => showOrderModal = true}>
        ORDER
      </button>
    {:else}
      <button class="order-btn sold" disabled>
        This item has been sold
      </button>
    {/if}

    <!-- Seller Card -->
    <a href="/profile/{seller.username}" class="seller-card">
      <img
        src={seller.avatar || '/default-avatar.jpg'}
        alt={seller.username}
        class="seller-avatar"
      />
      <div class="seller-info">
        <p class="seller-name">{seller.username}</p>
        {#if seller.location}
          <p class="seller-location">📍 {seller.location}</p>
        {/if}
        {#if seller.bio}
          <p class="seller-bio">{seller.bio}</p>
        {/if}
      </div>
      <span class="seller-arrow">View profile →</span>
    </a>

  </div>
</div>

<!-- Order Modal -->
{#if showOrderModal}
  <OrderModal
    listingId={listing._id}
    listingTitle={listing.title}
    on:close={() => showOrderModal = false}
  />
{/if}

<style>
  .listing-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    max-width: 1100px;
    margin: 2rem auto;
    padding: 0 1.5rem;
  }

  /* ── Images ── */
  .images-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: sticky;
    top: 80px;
    align-self: start;
  }

  .main-image {
    position: relative;
    aspect-ratio: 3/4;
    border-radius: 12px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sold-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: 4px;
  }

  .thumbnails {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
  }

  .thumbnails button {
    flex: 0 0 70px;
    height: 70px;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid transparent;
    padding: 0;
    cursor: pointer;
    background: none;
    transition: border-color 0.15s;
  }

  .thumbnails button.active {
    border-color: #111;
  }

  .thumbnails button img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ── Info ── */
  .info-section {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .info-top {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
  }

  .price {
    font-size: 1.8rem;
    font-weight: 800;
    color: #111;
    margin: 0;
    white-space: nowrap;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    padding: 0.3rem 0.75rem;
    background: #f4f4f4;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #333;
  }

  .tag.condition {
    background: transparent;
    font-weight: 700;
    padding-left: 0;
  }

  .views {
    font-size: 0.82rem;
    color: #aaa;
    margin: 0;
  }

  /* ── Description ── */
  .description h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .description p {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #444;
    margin: 0;
    white-space: pre-wrap;
  }

  /* ── Location ── */
  .listing-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #555;
  }

  /* ── Order Button ── */
  .order-btn {
    width: 100%;
    font-family: 'Jaldi', sans-serif;
    padding: 1rem;
    background: green;
    color: #fff;
    border: none;
    border-radius: 0px;
    font-size: 1.05rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
    box-shadow: inset -3px -4px 0 rgba(0,0,0,0.2);
  }

  .order-btn:hover:not(:disabled) {
    background: #333;
  }

  .order-btn.sold {
    background: #e5e5e5;
    color: #999;
    cursor: not-allowed;
  }

  /* ── Seller Card ── */
  .seller-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border: 1px solid #eee;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .seller-card:hover {
    border-color: #111;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  }

  .seller-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .seller-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .seller-name {
    font-weight: 700;
    font-size: 0.95rem;
    margin: 0;
  }

  .seller-location, .seller-bio {
    font-size: 0.8rem;
    color: #888;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .seller-arrow {
    font-size: 0.8rem;
    color: #aaa;
    white-space: nowrap;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .listing-page {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 1rem auto;
    }

    .images-section {
      position: static;
    }

    h1 { font-size: 1.3rem; }
    .price { font-size: 1.4rem; }
  }
</style>