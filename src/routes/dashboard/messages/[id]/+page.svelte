<script lang="ts">
	import { resolve } from '$app/paths';
	import { _ } from 'svelte-i18n';
	import ChatWindow from '$lib/components/ChatWindow.svelte';

	export let data;
	$: conversationId = data?.id;
	$: conv = data?.conversation;
</script>

<div class="chat-page">
	<a href={resolve('/dashboard/messages')} class="back">← {$_('back')}</a>
	<h1>
		{#if conv?.listing?.name}
			{conv.listing.name}
		{:else}
			{$_('conversations')}
		{/if}
	</h1>

	{#if conversationId}
		<ChatWindow {conversationId} currentUserType="seller" />
	{/if}
</div>

<style>
	.chat-page {
		font-family: 'Jaldi', sans-serif;
	}

	.back {
		display: inline-block;
		margin-bottom: 1rem;
		color: #000;
		font-weight: 600;
		text-decoration: none;
		font-size: 0.95rem;
	}

	.back:hover {
		text-decoration: underline;
	}

	h1 {
		font-size: 1.3rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
	}
</style>
