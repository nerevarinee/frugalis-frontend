<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	export let data;

	$: orders = data.orders;

	// split orders into tabs
	$: pending = orders.filter((o: { status: string }) => o.status === 'pending');
	$: accepted = orders.filter((o: { status: string }) => o.status === 'accepted');
	$: rejected = orders.filter((o: { status: string }) => o.status === 'rejected');

	let activeTab = 'pending';

	$: displayed = activeTab === 'pending' ? pending : activeTab === 'accepted' ? accepted : rejected;

	const deliveryIcon: Record<string, string> = { delivery: '', pickup: '' };

	function listingStatusClass(status: string) {
		return status === 'active'
			? 'status-active'
			: status === 'hidden'
				? 'status-hidden'
				: 'status-sold';
	}
</script>

<div class="orders-page">
	<div class="page-header">
		<h1>{$_('orders')}</h1>
		<div class="counts">
			{#if pending.length > 0}
				<span class="badge pending">{pending.length} {$_('pending')}</span>
			{/if}
		</div>
	</div>

	<!-- Tabs -->
	<div class="tabs">
		<button class:active={activeTab === 'pending'} on:click={() => (activeTab = 'pending')}>
			{$_('pending')}
			{#if pending.length > 0}
				<span class="tab-count">{pending.length}</span>
			{/if}
		</button>
		<button class:active={activeTab === 'accepted'} on:click={() => (activeTab = 'accepted')}>
			{$_('accepted')}
			{#if accepted.length > 0}
				<span class="tab-count">{accepted.length}</span>
			{/if}
		</button>
		<button class:active={activeTab === 'rejected'} on:click={() => (activeTab = 'rejected')}>
			{$_('rejected')}
		</button>
	</div>

	<!-- Order list -->
	{#if displayed.length === 0}
		<div class="empty">
			<p>{$_('no_orders', { values: { status: activeTab } })}</p>
		</div>
	{:else}
		<div class="order-list">
			{#each displayed as order (order._id)}
				<div class="order-card status-{order.status}">
					<!-- Listing info -->
					<a href={resolve(`/listings/${order.listing?._id}`)} class="listing-preview">
						<img src={order.listing?.images?.[0] ?? '/placeholder.png'} alt={order.listing?.name} />
						<div>
							<p class="listing-title">{order.listing?.name ?? $_('deleted_listing')}</p>
							<p class="listing-price">
								{#if order.type === 'offer'}
									<del>${order.listing?.price ?? '—'}</del>
									<span class="offer-price"> ${order.proposedPrice} {$_('type_offer')}</span>
								{:else}
									${order.listing?.price ?? '—'}
								{/if}
							</p>
						</div>
					</a>

					<!-- Type + listing status badges -->
					<div class="order-meta">
						<span class="type-badge" class:is-offer={order.type === 'offer'}>
							{order.type === 'offer' ? $_('type_offer') : $_('type_order')}
						</span>
						{#if order.listing}
							<span class="listing-status-badge {listingStatusClass(order.listing.status)}">
								{order.listing.status === 'active'
									? $_('status_active')
									: order.listing.status === 'hidden'
										? $_('status_hidden')
										: $_('status_sold')}
							</span>
						{/if}
					</div>

					<div class="divider"></div>

					<!-- Buyer info -->
					<div class="buyer-info">
						<div class="info-row">
							<span class="info-label">{$_('phone')}</span>
							<a href="tel:{order.tel}" class="info-value phone">{order.tel}</a>
						</div>
						<div class="info-row">
							<span class="info-label">{$_('location')}</span>
							<span class="info-value">{order.location}</span>
						</div>
						{#if order.type === 'order'}
							<div class="info-row">
								<span class="info-label">
									{deliveryIcon[order.deliveryType]}
									{$_('method')}
								</span>
								<span class="info-value capitalize">{order.deliveryType}</span>
							</div>
						{/if}
						<div class="info-row">
							<span class="info-label">{$_('received')}</span>
							<span class="info-value">{order.createdAt}</span>
						</div>
					</div>

					<div class="divider"></div>

					<!-- Actions -->
					<div class="actions">
						{#if order.status === 'pending'}
							<!-- Accept -->
							<form method="POST" action="?/updateStatus" use:enhance>
								<input type="hidden" name="id" value={order._id} />
								<input type="hidden" name="status" value="accepted" />
								<button type="submit" class="btn accept"> ✓ {$_('accept')} </button>
							</form>

							<!-- Reject -->
							<form method="POST" action="?/updateStatus" use:enhance>
								<input type="hidden" name="id" value={order._id} />
								<input type="hidden" name="status" value="rejected" />
								<button type="submit" class="btn reject"> ✕ {$_('reject')} </button>
							</form>
						{:else if order.status === 'accepted'}
							<!-- Call buyer shortcut -->
							<a href="tel:{order.tel}" class="btn call"> 📞 {$_('call_buyer')} </a>

							<!-- Revert to pending -->
							<form method="POST" action="?/updateStatus" use:enhance>
								<input type="hidden" name="id" value={order._id} />
								<input type="hidden" name="status" value="pending" />
								<button type="submit" class="btn secondary"> {$_('undo')} </button>
							</form>
						{:else if order.status === 'rejected'}
							<!-- Revert to pending -->
							<form method="POST" action="?/updateStatus" use:enhance>
								<input type="hidden" name="id" value={order._id} />
								<input type="hidden" name="status" value="pending" />
								<button type="submit" class="btn secondary"> {$_('reconsider')} </button>
							</form>
						{/if}

						<!-- Delete — always available -->
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={order._id} />
							<button
								type="submit"
								class="btn delete"
								on:click|preventDefault={(e: MouseEvent) => {
									if (confirm($_('delete_order')))
										(e.target as HTMLElement).closest('form')?.submit();
								}}
							>
								🗑
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.orders-page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* ── Header ── */
	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0;
	}

	.badge.pending {
		background: #fef3c7;
		color: #d97706;
		padding: 0.3rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 700;
	}

	/* ── Tabs ── */
	.tabs {
		display: flex;
		gap: 0.25rem;
		border-bottom: 2px solid #eee;
		padding-bottom: 0;
	}

	.tabs button {
		padding: 0.6rem 1.1rem;
		border: none;
		background: none;
		font-size: 0.9rem;
		color: #888;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		margin-bottom: -2px;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-family: inherit;
	}

	.tabs button.active {
		color: #111;
		font-weight: 700;
		border-bottom-color: #111;
	}

	.tab-count {
		background: #111;
		color: #fff;
		font-size: 0.7rem;
		padding: 0.1rem 0.45rem;
		border-radius: 10px;
		font-weight: 700;
	}

	/* ── Empty ── */
	.empty {
		text-align: center;
		padding: 3rem;
		color: #aaa;
		font-size: 0.9rem;
	}

	/* ── Order list ── */
	.order-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.order-card {
		background: #fff;
		border: 1px solid #eee;
		border-radius: 12px;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-left: 4px solid #eee;
	}

	/* ── Listing preview ── */
	.listing-preview {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		text-decoration: none;
		color: inherit;
	}

	.listing-preview img {
		width: 54px;
		height: 54px;
		object-fit: cover;
		border-radius: 8px;
		flex-shrink: 0;
		border: 1px solid #eee;
	}

	.listing-title {
		font-weight: 700;
		font-size: 0.9rem;
		margin: 0;
	}

	.listing-price {
		font-size: 0.85rem;
		color: #888;
		margin: 0.2rem 0 0;
	}

	.divider {
		height: 1px;
		background: #f0f0f0;
	}

	/* ── Buyer info ── */
	.buyer-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.88rem;
	}

	.info-label {
		color: #888;
		width: 110px;
		flex-shrink: 0;
	}

	.info-value {
		color: #111;
		font-weight: 500;
	}

	.info-value.phone {
		text-decoration: none;
		color: #2563eb;
		font-weight: 700;
	}

	.info-value.phone:hover {
		text-decoration: underline;
	}

	.capitalize {
		text-transform: capitalize;
	}

	/* ── Order meta badges ── */
	.order-meta {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.type-badge {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		background: #f0f0f0;
		color: #555;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.type-badge.is-offer {
		background: #fef3c7;
		color: #d97706;
	}

	.listing-status-badge {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.listing-status-badge.status-active {
		background: #f0fdf4;
		color: #16a34a;
	}

	.listing-status-badge.status-hidden {
		background: #f0f0f0;
		color: #888;
	}

	.listing-status-badge.status-sold {
		background: #111;
		color: #fff;
	}

	.offer-price {
		color: #d97706;
		font-weight: 700;
		margin-left: 0.3rem;
	}

	del {
		color: #aaa;
	}

	/* ── Actions ── */
	.actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.actions form {
		display: contents;
	}

	.btn {
		padding: 0.55rem 1.1rem;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 600;
		border: 1px solid #ddd;
		cursor: pointer;
		text-decoration: none;
		background: #fff;
		color: #333;
		font-family: inherit;
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		transition: background 0.15s;
	}

	.btn.accept {
		background: #111;
		color: #fff;
		border-color: #111;
	}

	.btn.accept:hover {
		background: #333;
	}

	.btn.reject {
		background: #fef2f2;
		color: #ef4444;
		border-color: #fca5a5;
	}

	.btn.reject:hover {
		background: #fee2e2;
	}

	.btn.call {
		background: #f0fdf4;
		color: #16a34a;
		border-color: #86efac;
	}

	.btn.call:hover {
		background: #dcfce7;
	}

	.btn.secondary {
		color: #666;
	}
	.btn.secondary:hover {
		background: #f5f5f5;
	}

	.btn.delete {
		color: #aaa;
		padding: 0.55rem 0.75rem;
		margin-left: auto;
	}

	.btn.delete:hover {
		color: #ef4444;
		background: #fef2f2;
		border-color: #fca5a5;
	}

	/* ── Responsive ── */
	@media (max-width: 480px) {
		.info-label {
			width: 90px;
		}
		.btn {
			font-size: 0.8rem;
			padding: 0.5rem 0.8rem;
		}
	}
</style>
