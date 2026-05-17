<script>
	import ListingCard from '$lib/components/ListingCard.svelte';
	import FilterSidebar from '$lib/components/FilterSidebar.svelte';
	import { _ } from 'svelte-i18n';
	export let data;
</script>

<div class="layout">
	<FilterSidebar />
	<main>
		<p>{$_('items_found', { values: { count: data.total } })}</p>
		<div class="grid">
			{#each data.listings as listing (listing._id)}
				<ListingCard {listing} />
			{/each}
		</div>
	</main>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	/* Sidebar */
	.layout :global(aside) {
		position: sticky;
		top: 1rem;
		height: fit-content;
	}

	/* Main content */
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	main > p {
		font-size: 0.9rem;
		opacity: 0.7;
		margin: 0;
	}

	/* Grid */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.layout {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.layout :global(aside) {
			position: static;
		}
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 0.5rem;
		}
	}
</style>
