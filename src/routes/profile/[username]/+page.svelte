<script lang="ts">
	import ListingCard from '$lib/components/ListingCard.svelte';
	import { _ } from 'svelte-i18n';

	export let data;

	$: profile = data.profile;
	$: listings = data.listings;

	function formatDate(dateStr: string) {
		if (!dateStr) return '';
		const d = new Date(dateStr);
		return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
	}
</script>

<svelte:head>
	<title>{profile.username} — {$_('thrift_market')}</title>
</svelte:head>

<div class="profile-page">
	<!-- Profile Header -->
	<div class="profile-header">
		<img src={profile.avatar || '/default-avatar.jpg'} alt={profile.username} class="avatar" />
		<div class="header-info">
			<h1>{profile.username}</h1>
			{#if profile.bio}
				<p class="bio">{profile.bio}</p>
			{/if}
			<div class="meta">
				{#if profile.location}
					<span class="meta-item">{profile.location}</span>
				{/if}
				<span class="meta-item"
					>{$_('member_since', { values: { date: formatDate(profile.createdAt) } })}</span
				>
			</div>
			{#if profile.whatsapp}
				<a
					href="https://wa.me/{profile.whatsapp.replace(/[^0-9]/g, '')}"
					target="_blank"
					rel="noopener noreferrer"
					class="whatsapp-btn"
				>
					{$_('contact_via_whatsapp')}
				</a>
			{/if}
		</div>
	</div>

	<!-- Stats -->
	<div class="stats">
		<div class="stat-card">
			<span class="stat-value">{profile.activeListings}</span>
			<span class="stat-label">{$_('active_listings')}</span>
		</div>
		<div class="stat-card">
			<span class="stat-value">{profile.soldListings}</span>
			<span class="stat-label">{$_('items_sold')}</span>
		</div>
		<div class="stat-card">
			<span class="stat-value">{profile.totalViews}</span>
			<span class="stat-label">{$_('total_views')}</span>
		</div>
	</div>

	<!-- Listings -->
	<section class="listings-section">
		<h2>{$_('active_listings')}</h2>
		{#if listings.length > 0}
			<div class="grid">
				{#each listings as listing (listing._id)}
					<ListingCard {listing} />
				{/each}
			</div>
		{:else}
			<p class="empty">{$_('no_listings_yet_profile')}</p>
		{/if}
	</section>
</div>

<style>
	.profile-page {
		max-width: 1100px;
		margin: 2rem auto;
		padding: 0 1.5rem;
		font-family: 'Jaldi', sans-serif;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* ── Header ── */
	.profile-header {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		padding: 2rem;
		border: 0px solid #000;
	}

	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
		border: 0px solid #000;
		flex-shrink: 0;
	}

	.header-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.header-info h1 {
		font-size: 1.8rem;
		font-weight: 800;
		margin: 0;
	}

	.bio {
		font-size: 1rem;
		color: #444;
		margin: 0;
		line-height: 1.5;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		font-size: 0.85rem;
		color: #777;
	}

	.meta-item {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}

	.whatsapp-btn {
		align-self: flex-start;
		display: inline-block;
		padding: 0.6rem 1.2rem;
		background: #25d366;
		color: #fff;
		font-weight: 700;
		font-size: 0.9rem;
		text-decoration: none;
		border: none;
		cursor: pointer;
		transition: opacity 0.15s;
	}

	.whatsapp-btn:hover {
		opacity: 0.85;
	}

	/* ── Stats ── */
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		padding: 1.5rem 1rem;
		border: 3px solid #000;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 800;
		line-height: 1;
	}

	.stat-label {
		font-size: 0.85rem;
		color: #555;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* ── Listings ── */
	.listings-section h2 {
		font-size: 1.3rem;
		font-weight: 700;
		margin: 0 0 1rem;
		border-bottom: 3px solid #000;
		padding-bottom: 0.5rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 0.5rem;
		}
	}

	.empty {
		grid-column: 1 / -1;
		text-align: center;
		padding: 3rem 1rem;
		font-size: 0.95rem;
		color: #888;
		border: 3px solid #000;
		margin: 0;
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		.profile-header {
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding: 1.5rem;
		}

		.header-info h1 {
			font-size: 1.4rem;
		}

		.whatsapp-btn {
			align-self: center;
		}

		.stats {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.75rem;
		}

		.stat-value {
			font-size: 1.5rem;
		}

		.stat-card {
			padding: 1rem 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.avatar {
			width: 90px;
			height: 90px;
		}

		.stats {
			grid-template-columns: 1fr;
		}
	}
</style>
