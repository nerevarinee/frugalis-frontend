<script>
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	export let data;
	$: stats = data?.stats ?? {};
	$: user = data?.user ?? {};
</script>

<div class="overview">
	<h1>{$_('welcome_back', { values: { username: user.username } })} 👋</h1>

	<div class="stats-grid">
		<div class="stat-card">
			<p class="stat-value">{stats.activeListings}</p>
			<p class="stat-label">{$_('active_listings')}</p>
		</div>
		<div class="stat-card">
			<p class="stat-value">{stats.soldListings}</p>
			<p class="stat-label">{$_('items_sold')}</p>
		</div>
		<div class="stat-card">
			<p class="stat-value">{stats.totalViews}</p>
			<p class="stat-label">{$_('total_views')}</p>
		</div>
		<div class="stat-card">
			<p class="stat-value">{stats.savedItems}</p>
			<p class="stat-label">{$_('saved_items')}</p>
		</div>
	</div>

	<div class="quick-actions">
		<h2>{$_('quick_actions')}</h2>
		<div class="actions">
			<a href={resolve('/dashboard/listings/new')} class="action-btn primary">
				{$_('new_listing_link')}
			</a>
			<a href={resolve('/dashboard/listings')} class="action-btn"> {$_('manage_listings')} </a>
			<a href={resolve('/dashboard/settings')} class="action-btn"> {$_('edit_profile')} </a>
		</div>
	</div>
</div>

<style>
	.overview {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	h1 {
		font-size: 1.6rem;
		font-weight: 700;
		margin: 0;
	}

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

	.quick-actions h2 {
		font-size: 1.1rem;
		margin: 0 0 1rem;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

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
