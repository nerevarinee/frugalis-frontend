<script lang="ts">
	import { _ } from 'svelte-i18n';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let conversation: any;
	export let userType: 'guest' | 'seller';
</script>

<div class="card">
	<div class="card-content">
		<div class="listing-info">
			<img
				src={conversation.listing?.images?.[0] || '/placeholder.jpg'}
				alt={conversation.listing?.name}
				class="thumb"
			/>
			<div class="info">
				<h4>{conversation.listing?.name || 'Listing'}</h4>
				<p class="preview">
					{#if conversation.lastMessage?.text}
						<span class="sender">
							{conversation.lastMessage.senderType === 'guest' ? 'Buyer' : 'You'}:
						</span>
						{conversation.lastMessage.text}
					{:else}
						<span class="no-msg">{$_('no_messages_yet')}</span>
					{/if}
				</p>
			</div>
		</div>
		<div class="meta">
			{#if userType === 'guest' && conversation.unreadGuest > 0}
				<span class="badge">{conversation.unreadGuest}</span>
			{/if}
			{#if userType === 'seller' && conversation.unreadSeller > 0}
				<span class="badge">{conversation.unreadSeller}</span>
			{/if}
			{#if conversation.lastMessage?.createdAt}
				<span class="time">
					{new Date(conversation.lastMessage.createdAt).toLocaleDateString()}
				</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.card {
		border: 3px solid #000;
		cursor: pointer;
		transition: background 0.15s;
		font-family: 'Jaldi', sans-serif;
	}

	.card:hover {
		background: #f5f5f5;
	}

	.card-content {
		display: flex;
		padding: 0.85rem;
		gap: 0.75rem;
		align-items: center;
	}

	.listing-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex: 1;
		min-width: 0;
	}

	.thumb {
		width: 48px;
		height: 48px;
		object-fit: cover;
		border: 2px solid #000;
		flex-shrink: 0;
	}

	.info {
		min-width: 0;
	}

	.info h4 {
		margin: 0 0 0.2rem;
		font-size: 1rem;
		font-weight: 700;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.preview {
		margin: 0;
		font-size: 0.82rem;
		color: #555;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sender {
		font-weight: 600;
		color: #333;
	}

	.no-msg {
		font-style: italic;
		color: #aaa;
	}

	.meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.3rem;
		flex-shrink: 0;
	}

	.badge {
		background: #000;
		color: #fff;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.15rem 0.45rem;
		min-width: 20px;
		text-align: center;
	}

	.time {
		font-size: 0.72rem;
		color: #999;
		white-space: nowrap;
	}
</style>
