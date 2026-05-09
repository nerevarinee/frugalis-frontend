<script>
  import { goto } from '$app/navigation'
  let search = ''

  function handleSearch() {
    if (search.trim()) goto(`/listings?search=${encodeURIComponent(search)}`)
  }
</script>

<div class="banner">
  <div class="banner-content">
    <h1>Thrift Finds Worth Keeping</h1>
    <p>Buy and sell pre-loved clothing in your community</p>
    <div class="banner-actions">
      <a href="/listings/">Browse All</a>
      <a href="/dashboard/listings/new">Sell Something</a>
    </div>
  </div>
</div>

<style>
  .banner {
    margin-top: 3rem;
    background: #111;
    color: #fff;
    padding: 5rem 1rem;
    text-align: center;
  }

  .banner-content {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
  }

  p {
    color: #aaa;
    margin: 0;
  }

  .banner-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .banner-actions a {
    padding: 0.6rem 1.5rem;
    border-radius: 0px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .banner-actions a:first-child {
    background: #fff;
    color: #111;
  }

  .banner-actions a:last-child {
    border: 1px solid #555;
    color: #fff;
  }
</style>