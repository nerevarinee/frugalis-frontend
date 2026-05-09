<script>
  export let title
  export let subtitle = ''
  export let listings = []
</script>

<div class="row">
  <div class="row-header">
    <div>
      <h2>{title}</h2>
      {#if subtitle}<p>{subtitle}</p>{/if}
    </div>
    <a href="/listings">See all →</a>
  </div>

  <div class="scroll-container">
    {#each listings as listing}
      <a href="/listings/{listing._id}" class="card">
        <div class="image-wrapper">
          <img src={listing.images[0]} alt={listing.name} />
          {#if listing.condition === 'new'}
            <span class="badge">New</span>
          {/if}
        </div>
        <div class="card-info">
          <p class="card-title">{listing.name}</p>
          <p class="card-price">DZD{listing.price}</p>
          <p class="card-meta">{listing.size} · {listing.seller.username}</p>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
/* Chrome, Edge, Safari */
::-webkit-scrollbar {
  display: 0px;
}

/* Firefox */
* {
  scrollbar-width: none;
  overflow: auto
}

/* IE/old Edge */
* {
  -ms-overflow-style: 0px;
}
  .row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .row-header h2 {
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
  }

  .row-header p {
    font-size: 0.9rem;
    color: #666;
    margin: 0.2rem 0 0;
  }

  .row-header a {
    font-size: 0.9rem;
    color: #333;
    text-decoration: none;
    white-space: nowrap;
  }

  /* The horizontal scroll container */
  .scroll-container {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  /* Hide scrollbar visually but keep it functional */
  .scroll-container::-webkit-scrollbar { height: 4px; }
  .scroll-container::-webkit-scrollbar-track { background: #f1f1f1; }
  .scroll-container::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }

  /* Each card */
  .card {
    flex: 0 0 200px;       /* fixed width, never shrinks */
    scroll-snap-align: start;
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #eee;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }

  .image-wrapper {
    position: relative;
    aspect-ratio: 3/4;     /* portrait ratio, good for clothing */
    overflow: hidden;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .card:hover .image-wrapper img {
    transform: scale(1.05);
  }

  .badge {
    position: absolute;
    top: 8px;
    left: 8px;
    background: #000;
    color: #fff;
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .card-info {
    padding: 0.6rem 0.8rem;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-price {
    font-size: 1rem;
    font-weight: 700;
    margin: 0.2rem 0;
    color: #111;
  }

  .card-meta {
    font-size: 0.75rem;
    color: #888;
    margin: 0;
  }
</style>