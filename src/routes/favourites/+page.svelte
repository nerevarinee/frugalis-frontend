<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { get } from 'svelte/store';
	import { guest } from '$lib/stores/auth';
	import { _ } from 'svelte-i18n';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let listings: any[] = [];
	let loading = true;
	let error = '';
	const guestInfo = get(guest);

	const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';

	onMount(async () => {
		if (!guestInfo?.token) {
			goto(resolve('/guest/login'));
			return;
		}

		try {
			const res = await fetch(`${API_URL}/api/guests/saved-listings`, {
				headers: { Authorization: `Bearer ${guestInfo.token}` }
			});
			if (!res.ok) throw new Error('Failed to fetch saved listings');
			listings = await res.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong';
		} finally {
			loading = false;
		}
	});

	async function unsave(listingId: string) {
		try {
			const res = await fetch(`${API_URL}/api/guests/saved-listings/${listingId}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${guestInfo.token}` }
			});
			if (!res.ok) throw new Error('Failed to unsave');
			listings = listings.filter((l) => l._id !== listingId);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to unsave';
		}
	}
</script>

<div class="favourites-page">
	<h1>{$_('favourites_page')}</h1>

	{#if loading}
		<p class="loading">{$_('loading')}</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if listings.length === 0}
		<p class="empty">{$_('guest_saved_empty')}</p>
	{:else}
		<div class="grid">
			{#each listings as listing (listing._id)}
				<div class="card">
					<a href={resolve(`/listings/${listing._id}`)}>
						<img src={listing.images?.[0] || '/placeholder.jpg'} alt={listing.name} />
						<div class="card-info">
							<h3>{listing.name}</h3>
							<p class="price">DZD{listing.price}</p>
						</div>
					</a>
					<button class="unsave-btn" on:click={() => unsave(listing._id)}>
						{$_('guest_unsave')}
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.favourites-page {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1rem;
		font-family: 'Jaldi', sans-serif;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
	}

	.loading,
	.empty,
	.error {
		text-align: center;
		color: #888;
		padding: 2rem;
	}

	.error {
		color: #d32f2f;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.25rem;
	}

	.card {
		border: 3px solid #000;
		display: flex;
		flex-direction: column;
	}

	.card a {
		text-decoration: none;
		color: inherit;
		flex: 1;
	}

	.card img {
		width: 100%;
		aspect-ratio: 3/4;
		object-fit: cover;
		border-bottom: 2px solid #000;
	}

	.card-info {
		padding: 0.75rem;
	}

	.card-info h3 {
		margin: 0 0 0.3rem;
		font-size: 1rem;
		font-weight: 700;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.price {
		margin: 0;
		font-weight: 600;
		color: #333;
	}

	.unsave-btn {
		width: 100%;
		padding: 0.6rem;
		border: none;
		border-top: 2px solid #000;
		background: #fff;
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85rem;
		font-family: 'Jaldi', sans-serif;
		transition: 0.15s;
	}

	.unsave-btn:hover {
		background: #000;
		color: #fff;
	}
</style>
