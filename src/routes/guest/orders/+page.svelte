<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { get } from 'svelte/store';
	import { guest } from '$lib/stores/auth';
	import { _ } from 'svelte-i18n';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let orders: any[] = [];
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
			const res = await fetch(`${API_URL}/api/guests/orders`, {
				headers: { Authorization: `Bearer ${guestInfo.token}` }
			});
			if (!res.ok) throw new Error('Failed to fetch orders');
			orders = await res.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong';
		} finally {
			loading = false;
		}
	});
</script>

<div class="orders-page">
	<h1>{$_('guest_my_orders')}</h1>

	{#if loading}
		<p class="loading">{$_('loading')}</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if orders.length === 0}
		<p class="empty">{$_('guest_order_history_empty')}</p>
	{:else}
		<div class="orders-list">
			{#each orders as order (order._id)}
				<div class="order-card">
					<div class="order-header">
						<h3>{order.listing?.name || $_('deleted_listing')}</h3>
						<span
							class="status"
							class:pending={order.status === 'pending'}
							class:accepted={order.status === 'accepted'}
							class:rejected={order.status === 'rejected'}
							class:countered={order.status === 'countered'}
						>
							{$_(order.status)}
						</span>
					</div>
					<div class="order-details">
						<span class="label">{$_('price')}: DZD{order.listing?.price ?? '-'}</span>
						<span class="label">{$_('delivery_method')}: {order.deliveryType}</span>
						<span class="label">{$_('location')}: {order.location}</span>
						<span class="label">{new Date(order.createdAt).toLocaleDateString()}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.orders-page {
		max-width: 700px;
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

	.orders-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.order-card {
		border: 3px solid #000;
		padding: 1rem;
	}

	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.order-header h3 {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 700;
	}

	.status {
		font-size: 0.8rem;
		font-weight: 700;
		padding: 0.25rem 0.6rem;
		text-transform: uppercase;
	}

	.status.pending {
		background: #fff3cd;
		color: #856404;
	}

	.status.accepted {
		background: #d4edda;
		color: #155724;
	}

	.status.rejected {
		background: #f8d7da;
		color: #721c24;
	}

	.status.countered {
		background: #cce5ff;
		color: #004085;
	}

	.order-details {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		font-size: 0.9rem;
		color: #555;
	}
</style>
