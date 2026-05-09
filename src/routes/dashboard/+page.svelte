<script>
  export let data
  $: stats = data.stats
  $: user = data.user
</script>

<div class="overview">
  <h1>Welcome back, {user.username} 👋</h1>

  <div class="stats-grid">
    <div class="stat-card">
      <p class="stat-value">{stats.activeListings}</p>
      <p class="stat-label">Active Listings</p>
    </div>
    <div class="stat-card">
      <p class="stat-value">{stats.soldListings}</p>
      <p class="stat-label">Items Sold</p>
    </div>
    <div class="stat-card">
      <p class="stat-value">{stats.totalViews}</p>
      <p class="stat-label">Total Views</p>
    </div>
    <div class="stat-card">
      <p class="stat-value">{stats.savedItems}</p>
      <p class="stat-label">Saved Items</p>
    </div>
  </div>

  <div class="quick-actions">
    <h2>Quick Actions</h2>
    <div class="actions">
      <a href="/dashboard/listings/new" class="action-btn primary">
        + New Listing
      </a>
      <a href="/dashboard/listings" class="action-btn">
        Manage Listings
      </a>
      <a href="/dashboard/settings" class="action-btn">
        Edit Profile
      </a>
    </div>
  </div>
</div>

<style>
  .overview { display: flex; flex-direction: column; gap: 2rem; }

  h1 { font-size: 1.6rem; font-weight: 700; margin: 0; }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .stat-card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
  }

  .stat-value {
    font-size: 2.2rem;
    font-weight: 800;
    margin: 0;
    color: #111;
  }

  .stat-label {
    font-size: 0.85rem;
    color: #888;
    margin: 0.3rem 0 0;
  }

  .quick-actions h2 { font-size: 1.1rem; margin: 0 0 1rem; }

  .actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }

  .action-btn {
    padding: 0.65rem 1.25rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    text-decoration: none;
    font-size: 0.9rem;
    color: #333;
    background: #fff;
  }

  .action-btn.primary {
    background: #111;
    color: #fff;
    border-color: #111;
  }
</style>