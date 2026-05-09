<script>
  import Banner from '$lib/components/banner.svelte'
  import ListingRow from '$lib/components/listingRow.svelte'
  export let data
  import Footer from '$lib/components/footer.svelte'
</script>

<Banner />

<section class="homepage">
  <ListingRow
    title="Most Popular"
    subtitle="Trending picks this week"
    listings={data.mostViewed}
  />
  <ListingRow
    title="Best Deals"
    subtitle="Lowest prices first"
    listings={data.lowestPrice}
  />
  <ListingRow
    title="Just Dropped"
    subtitle="Freshest listings"
    listings={data.newest}
  />
  <ListingRow
    title="Premium Pieces"
    subtitle="High-end thrift finds"
    listings={data.highestPrice}
  />
</section>
<Footer />

<style>
  .homepage {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 2rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
  }
</style>