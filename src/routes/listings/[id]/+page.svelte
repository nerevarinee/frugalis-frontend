<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import OrderModal from '$lib/components/OrderModal.svelte';
	import OfferModal from '$lib/components/OfferModal.svelte';
	import { get } from 'svelte/store';
	import { guest } from '$lib/stores/auth';
	import { _ } from 'svelte-i18n';

	export let data;
	$: listing = data.listing;
	$: seller = listing.seller;

	let selectedImage = 0;
	let showOrderModal = false;
	let showOfferModal = false;
	let saved = false;
	let saving = false;
	const guestInfo = get(guest);

	const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';

	onMount(async () => {
		if (!guestInfo?.token) return;
		try {
			const res = await fetch(`${API_URL}/api/guests/saved-listings`, {
				headers: { Authorization: `Bearer ${guestInfo.token}` }
			});
			if (!res.ok) return;
			const savedListings = await res.json();
			saved = savedListings.some((l: Record<string, unknown>) => l._id === listing._id);
		} catch {
			// silently fail
		}
	});

	async function toggleSave() {
		if (!guestInfo?.token) {
			goto(resolve('/guest/login'));
			return;
		}
		saving = true;
		try {
			if (saved) {
				const res = await fetch(`${API_URL}/api/guests/saved-listings/${listing._id}`, {
					method: 'DELETE',
					headers: { Authorization: `Bearer ${guestInfo.token}` }
				});
				if (res.ok) saved = false;
			} else {
				const res = await fetch(`${API_URL}/api/guests/saved-listings`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${guestInfo.token}`
					},
					body: JSON.stringify({ listingId: listing._id })
				});
				if (res.ok) saved = true;
			}
		} catch {
			// silently fail
		} finally {
			saving = false;
		}
	}

	async function messageSeller() {
		if (!guestInfo?.token) {
			goto(resolve('/guest/login'));
			return;
		}
		try {
			const res = await fetch(`${API_URL}/api/messages/conversations`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${guestInfo.token}` },
				body: JSON.stringify({ listingId: listing._id })
			});
			if (!res.ok) throw new Error('Failed to create conversation');
			const conv = await res.json();
			goto(resolve(`/guest/messages/${conv._id}`));
		} catch {
			// silently fail
		}
	}
</script>

<svelte:head>
	<title>{listing.name} — {$_('thrift_market')}</title>
</svelte:head>

<div class="listing-page">
	<!-- Images -->
	<div class="images-section">
		<div class="main-image">
			<img src={listing.images[selectedImage]} alt={listing.name} />
			{#if listing.status === 'sold'}
				<div class="sold-overlay">{$_('sold')}</div>
			{/if}
		</div>
		{#if listing.images.length > 1}
			<div class="thumbnails">
				{#each listing.images as img, i (i)}
					<button class:active={selectedImage === i} on:click={() => (selectedImage = i)}>
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

			<p class="views">👁 {listing.views} {$_('views')}</p>
		</div>

		<!-- Description -->
		<div class="description">
			<h2>{$_('description')}</h2>
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
			<div class="buttons-container">
				<button class="order-btn" on:click={() => (showOrderModal = true)}> {$_('order')} </button>
				<button class="offer-btn" on:click={() => (showOfferModal = true)}>
					{$_('make_an_offer')}
				</button>
				<button class="save-btn" on:click={toggleSave} disabled={saving}>
					{saved ? $_('guest_unsave_listing') : $_('guest_save_listing')}
				</button>
				<button class="msg-btn" on:click={messageSeller}>
					{$_('message_seller')}
				</button>
			</div>
		{:else}
			<button class="order-btn sold" disabled> {$_('item_sold')} </button>
		{/if}

		<!-- Seller Card -->
		<a href={resolve(`/profile/${seller.username}`)} class="seller-card">
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
			<span class="seller-arrow">{$_('view_profile')} →</span>
		</a>
	</div>
</div>

<!-- Order Modal -->
{#if showOrderModal}
	<OrderModal
		listingId={listing._id}
		listingTitle={listing.title}
		on:close={() => (showOrderModal = false)}
	/>
{/if}
{#if showOfferModal}
	<OfferModal
		listingId={listing._id}
		listingTitle={listing.title}
		listingPrice={listing.price}
		on:close={() => (showOfferModal = false)}
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
		font-family: 'Jaldi', sans-serif;
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
		padding: 2rem;
		position: relative;
		aspect-ratio: 3/4;
		border-radius: 12px;
		overflow: hidden;
		background: #f5f5f5;
		border: 3px solid black;
	}

	.main-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10px;
	}

	.sold-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
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
		display: grid;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: 800;
		margin: 0;
		line-height: 1.2;
	}

	.price {
		font-size: 1.4rem;
		font-weight: 800;
		color: #111;
		margin: 0;
		white-space: nowrap;
		font-family: 'Roboto', sans-serif;
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
		border-top: 3px solid black;
		padding: 1rem;
	}

	.description p {
		font-size: 0.95rem;
		line-height: 1.7;
		color: #444;
		margin: 0;
		white-space: pre-wrap;
		border: 3px solid black;
		padding: 1rem;
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
	.buttons-container {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.order-btn {
		width: 70%;
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
		box-shadow: inset -3px -4px 0 rgba(0, 0, 0, 0.2);
	}
	.offer-btn {
		width: 70%;
		font-family: 'Jaldi', sans-serif;
		padding: 1rem;
		background: #555;
		color: #fff;
		border: none;
		border-radius: 0px;
		font-size: 1.05rem;
		font-weight: 700;
		cursor: pointer;
		transition: background 0.2s;
		box-shadow: inset -3px -4px 0 rgba(0, 0, 0, 0.2);
	}

	.order-btn:hover:not(:disabled) {
		background: #333;
	}
	.offer-btn:hover:not(:disabled) {
		background: black;
	}

	.order-btn.sold {
		background: #e5e5e5;
		color: #999;
		cursor: not-allowed;
	}

	.save-btn {
		width: 70%;
		font-family: 'Jaldi', sans-serif;
		padding: 1rem;
		background: #fff;
		color: #000;
		border: 3px solid #000;
		border-radius: 0px;
		font-size: 1.05rem;
		font-weight: 700;
		cursor: pointer;
		transition: background 0.2s;
	}

	.save-btn:hover:not(:disabled) {
		background: #000;
		color: #fff;
	}

	.save-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.msg-btn {
		width: 70%;
		font-family: 'Jaldi', sans-serif;
		padding: 1rem;
		background: #000;
		color: #fff;
		border: 3px solid #000;
		border-radius: 0px;
		font-size: 1.05rem;
		font-weight: 700;
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s;
	}

	.msg-btn:hover {
		background: #fff;
		color: #000;
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
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.seller-card:hover {
		border-color: #111;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
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

	.seller-location,
	.seller-bio {
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

		h1 {
			font-size: 1.3rem;
		}
		.price {
			font-size: 1.4rem;
		}
	}
</style>
