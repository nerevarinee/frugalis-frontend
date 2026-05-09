<script>
  import { enhance } from '$app/forms'
  export let data

  $: listings = data.listings

  const statusColor = { active: '#22c55e', sold: '#888', hidden: '#f59e0b' }
</script>

<div class="my-listings">
  <div class="page-header">
    <h1>My Listings</h1>
    <a href="/dashboard/listings/new" class="new-btn">+ New Listing</a>
  </div>

  {#if listings.length === 0}
    <div class="empty">
      <p>You haven't listed anything yet.</p>
      <a href="/dashboard/listings/new">Create your first listing</a>
    </div>
  {:else}
    <div class="listings-table">
      {#each listings as listing}
        <div class="listing-row">
          <img src={listing.images[0]} alt={listing.title} />

          <div class="listing-info">
            <p class="listing-title">{listing.title}</p>
            <p class="listing-meta">DZD{listing.price} · {listing.size} · {listing.views} views</p>
          </div>

          <span class="status" style="color: {statusColor[listing.status]}">
            {listing.status}
          </span>

          <div class="listing-actions">
            <a href="/listings/{listing._id}" target="_blank">View</a>
            <a href="/dashboard/listings/{listing._id}/edit">Edit</a>

            <form method="POST" action="?/toggleSold" use:enhance>
              <input type="hidden" name="id" value={listing._id} />
              <button type="submit">
                {listing.status === 'sold' ? 'Relist' : 'Mark Sold'}
              </button>
            </form>

            <form method="POST" action="?/delete" use:enhance
              onsubmit={() => confirm('Delete this listing?')}
            >
              <input type="hidden" name="id" value={listing._id} />
              <button type="submit" class="danger">Delete</button>
            </form>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .my-listings { display: flex; flex-direction: column; gap: 1.5rem; }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 { font-size: 1.5rem; font-weight: 700; margin: 0; }

  .new-btn {
    padding: 0.6rem 1.2rem;
    background: #111;
    color: #fff;
    border: 3px solid #202020;
    border-radius: 2px;
    text-decoration: none;
    font-size: 1rem;
  }
  .new-btn:hover {
    background: beige;
    color: #202020;
    border: 3px solid #202020;
  }

  .empty {
    text-align: center;
    padding: 3rem;
    color: #888;
  }

  .listings-table {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .listing-row {
    display: grid;
    grid-template-columns: 60px 1fr auto auto;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 2px;
  }

  .listing-row img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }

  .listing-title {
    font-weight: 600;
    font-size: 0.9rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .listing-meta {
    font-size: 0.8rem;
    color: #888;
    margin: 0.2rem 0 0;
  }

  .status {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .listing-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .listing-actions a, .listing-actions button {
    padding: 0.35rem 0.7rem;
    border-radius: 0px;
    font-size: 0.8rem;
    border: 1px solid #ddd;
    background: #fff;
    cursor: pointer;
    text-decoration: none;
    color: #333;
  }

  .listing-actions button.danger {
    color: #ef4444;
    border-color: #fca5a5;
  }

  @media (max-width: 600px) {
    .listing-row {
      grid-template-columns: 50px 1fr;
      grid-template-rows: auto auto;
    }
    .status { display: none; }
    .listing-actions { grid-column: 1 / -1; }
  }
</style>