<script>
	import ListingRow from '$lib/components/listingRow.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { _ } from 'svelte-i18n';
	export let data;
</script>

<section class="homepage">
	<div class="banner">
		<div class="banner-content">
			<ListingRow
				title={$_('sponsored_listings')}
				subtitle={$_('trending_picks')}
				listings={data.sponsored}
			/>
		</div>
	</div>
	<ListingRow
		title={$_('most_popular')}
		subtitle={$_('trending_picks')}
		listings={data.mostViewed}
	/>
	<ListingRow
		title={$_('best_deals')}
		subtitle={$_('lowest_prices_first')}
		listings={data.lowestPrice}
	/>
	<ListingRow
		title={$_('just_dropped')}
		subtitle={$_('freshest_listings')}
		listings={data.newest}
	/>
	<ListingRow
		title={$_('premium_pieces')}
		subtitle={$_('high_end_thrift')}
		listings={data.highestPrice}
	/>
</section>
<Footer />

<style>
	.banner {
		margin-top: 3rem;
		background: #111;
		color: #fff;
		padding: 3.5rem 1rem;
		text-align: center;
		font-family: 'Jaldi', sans-serif;
	}

	.banner-content {
		margin: 0 4rem;
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
	.homepage {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding: 2rem 1rem;
		max-width: 1400px;
		margin: 0 auto;
	}
</style>
