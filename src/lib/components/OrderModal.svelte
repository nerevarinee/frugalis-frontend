<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { get } from 'svelte/store';
	import { guest } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	const dispatch = createEventDispatcher();

	export let listingId: string;
	export let listingTitle: string;

	const guestInfo = get(guest);

	let tel = guestInfo?.phone || '';
	let location = '';
	let deliveryType = 'delivery';
	let loading = false;
	let success = false;
	let error = '';

	// close on Escape key
	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') dispatch('close');
	}

	async function submit() {
		error = '';

		// basic validation
		if (!tel.trim()) return (error = $_('phone_required'));
		if (!location.trim()) return (error = $_('location_required'));

		loading = true;
		try {
			const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';
			const body: Record<string, unknown> = {
				listing: listingId,
				tel: tel.trim(),
				location: location.trim(),
				deliveryType
			};
			if (guestInfo?.token) {
				body.guestToken = guestInfo.token;
			}
			const res = await fetch(`${API_URL}/api/orders/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});

			if (!res.ok) {
				const data = await res.json();
				error = data.message || $_('something_went_wrong');
				return;
			}

			success = true;
		} catch {
			error = $_('server_connection_error');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:window on:keydown={handleKey} />

<!-- Backdrop -->
<div class="backdrop" role="presentation">
	<div
		class="backdrop-click-area"
		role="button"
		tabindex="0"
		on:click={() => dispatch('close')}
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') dispatch('close');
		}}
	></div>
	<div class="modal">
		{#if success}
			<!-- Success state -->
			<div class="success-state">
				<div class="success-icon">✓</div>
				<h2>{$_('order_placed')}</h2>
				<p>
					{$_('order_placed_message', { values: { phone: tel } })}
				</p>
				<button class="close-btn" on:click={() => dispatch('close')}> {$_('done')} </button>
			</div>
		{:else}
			<!-- Form state -->
			<div class="modal-header">
				<div>
					<h2>{$_('place_an_order')}</h2>
					<p class="modal-subtitle">{listingTitle}</p>
				</div>
				<button class="x-btn" on:click={() => dispatch('close')}>✕</button>
			</div>

			{#if error}
				<p class="error">{error}</p>
			{/if}

			<div class="form">
				<div class="field">
					<label for="tel">{$_('your_phone_number')}</label>
					<input id="tel" type="tel" bind:value={tel} placeholder={$_('phone_placeholder')} />
					<small>{$_('phone_hint')}</small>
				</div>

				<div class="field">
					<label for="location">{$_('your_location')}</label>
					<input
						id="location"
						type="text"
						bind:value={location}
						placeholder={$_('location_placeholder')}
					/>
				</div>

				<div class="field">
					<label id="delivery-label">{$_('delivery_method_label')}</label>
					<div class="delivery-options" role="radiogroup" aria-labelledby="delivery-label">
						<label class="option" class:selected={deliveryType === 'delivery'}>
							<input type="radio" bind:group={deliveryType} value="delivery" />
							<div class="option-content">
								<span class="option-icon"></span>
								<span class="option-label">{$_('delivery')}</span>
								<span class="option-desc">{$_('shipped_to_location')}</span>
							</div>
						</label>

						<label class="option" class:selected={deliveryType === 'pickup'}>
							<input type="radio" bind:group={deliveryType} value="pickup" />
							<div class="option-content">
								<span class="option-icon"></span>
								<span class="option-label">{$_('pickup')}</span>
								<span class="option-desc">{$_('collect_from_seller')}</span>
							</div>
						</label>
					</div>
				</div>

				<button class="submit-btn" on:click={submit} disabled={loading}>
					{loading ? $_('placing_order') : $_('confirm_order')}
				</button>

				<p class="disclaimer">
					{#if guestInfo?.token}
						{$_('guest_ordering_as', { values: { phone: guestInfo.phone } })}
					{:else}
						{$_('no_account_needed')}
						<br />
						<button class="track-link" on:click={() => goto(resolve('/guest/login'))}>
							{$_('guest_track_orders_link')}
						</button>
					{/if}
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
		backdrop-filter: blur(2px);
	}

	.backdrop-click-area {
		position: fixed;
		inset: 0;
		z-index: 0; /* sits behind the modal */
	}

	.modal {
		position: relative;
		z-index: 1;
		background: #fff;
		border: 3px solid #000;
		width: 100%;
		max-width: 440px;
		padding: 1.75rem;
		animation: slide-up 0.2s ease;
	}

	@keyframes slide-up {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	/* ── Header ── */
	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.25rem;
	}

	.modal-header h2 {
		font-size: 1.2rem;
		font-weight: 800;
		margin: 0;
	}

	.modal-subtitle {
		font-size: 0.85rem;
		color: #888;
		margin: 0.2rem 0 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 260px;
	}

	.x-btn {
		background: none;
		border: none;
		font-size: 1.1rem;
		cursor: pointer;
		color: #aaa;
		padding: 0.2rem;
		line-height: 1;
	}

	.x-btn:hover {
		color: #111;
	}

	/* ── Form ── */
	.form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	label {
		font-size: 0.85rem;
		font-weight: 600;
		color: #333;
	}

	input[type='tel'],
	input[type='text'] {
		padding: 0.7rem 0.9rem;
		border: 3px solid #000;
		font-size: 0.95rem;
		font-family: inherit;
		background: #fff;
	}

	input[type='tel']:focus,
	input[type='text']:focus {
		outline: none;
		background: #f5f5f5;
	}

	small {
		font-size: 0.78rem;
		color: #aaa;
	}

	/* ── Delivery options ── */
	.delivery-options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.option {
		border: 3px solid #ddd;
		padding: 0.85rem;
		cursor: pointer;
	}

	.option.selected {
		border-color: #000;
		background: #f5f5f5;
	}

	.option input[type='radio'] {
		display: none;
	}

	.option-content {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.option-icon {
		font-size: 1.3rem;
	}

	.option-label {
		font-weight: 700;
		font-size: 0.9rem;
		color: #111;
	}

	.option-desc {
		font-size: 0.75rem;
		color: #888;
	}

	/* ── Submit ── */
	.submit-btn {
		width: 100%;
		padding: 0.9rem;
		background: #000;
		color: #fff;
		border: 3px solid #000;
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
	}

	.submit-btn:hover:not(:disabled) {
		background: #fff;
		color: #000;
	}

	.submit-btn:disabled {
		background: #ccc;
		border-color: #ccc;
		color: #999;
		cursor: not-allowed;
	}

	.disclaimer {
		text-align: center;
		font-size: 0.78rem;
		color: #aaa;
		margin: 0;
	}

	.track-link {
		background: none;
		border: none;
		color: #000;
		font-size: 0.78rem;
		font-weight: 600;
		text-decoration: underline;
		cursor: pointer;
		padding: 0;
		margin-top: 0.3rem;
		font-family: inherit;
	}

	.track-link:hover {
		color: #555;
	}

	/* ── Error ── */
	.error {
		background: #fff;
		color: #ef4444;
		border: 2px solid #ef4444;
		padding: 0.65rem 0.9rem;
		font-size: 0.85rem;
		margin: 0;
	}

	/* ── Success ── */
	.success-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		text-align: center;
		padding: 1rem 0;
	}

	.success-icon {
		width: 56px;
		height: 56px;
		background: #000;
		color: #fff;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.success-state h2 {
		font-size: 1.3rem;
		font-weight: 800;
		margin: 0;
	}

	.success-state p {
		color: #555;
		font-size: 0.9rem;
		margin: 0;
		line-height: 1.6;
	}

	.close-btn {
		padding: 0.75rem 2.5rem;
		background: #000;
		color: #fff;
		border: 3px solid #000;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
	}

	.close-btn:hover {
		background: #fff;
		color: #000;
	}

	/* ── Responsive ── */
	@media (max-width: 480px) {
		.modal {
			padding: 1.25rem;
		}
		.delivery-options {
			grid-template-columns: 1fr;
		}
	}
</style>
