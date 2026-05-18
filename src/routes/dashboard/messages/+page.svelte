<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import ConversationCard from '$lib/components/ConversationCard.svelte';

	export let data;
	$: conversations = data?.conversations ?? [];
</script>

<div class="page">
	<h1>{$_('conversations')}</h1>

	{#if conversations.length === 0}
		<p class="status">{$_('seller_message_empty')}</p>
	{:else}
		<div class="list">
			{#each conversations as conv (conv._id)}
				<a href={resolve(`/dashboard/messages/${conv._id}`)}>
					<ConversationCard conversation={conv} userType="seller" />
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.page {
		font-family: 'Jaldi', sans-serif;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
	}

	.status {
		text-align: center;
		color: #888;
		padding: 3rem;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.list a {
		text-decoration: none;
		color: inherit;
	}
</style>
