<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { get } from 'svelte/store';
	import { guest } from '$lib/stores/auth';
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import { _ } from 'svelte-i18n';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let conversations: any[] = [];
	let loading = true;
	let error = '';

	const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';
	const guestInfo = get(guest);

	onMount(async () => {
		if (!guestInfo?.token) {
			goto(resolve('/guest/login'));
			return;
		}
		try {
			const res = await fetch(`${API_URL}/api/messages/conversations`, {
				headers: { Authorization: `Bearer ${guestInfo.token}` }
			});
			if (!res.ok) throw new Error('Failed to load conversations');
			conversations = await res.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong';
		} finally {
			loading = false;
		}
	});
</script>

<div class="page">
	<h1>{$_('conversations')}</h1>

	{#if loading}
		<p class="status">{$_('loading')}</p>
	{:else if error}
		<p class="status error">{error}</p>
	{:else if conversations.length === 0}
		<p class="status">{$_('guest_message_empty')}</p>
	{:else}
		<div class="list">
			{#each conversations as conv (conv._id)}
				<a href={resolve(`/guest/messages/${conv._id}`)}>
					<ConversationCard conversation={conv} userType="guest" />
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.page {
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

	.status {
		text-align: center;
		color: #888;
		padding: 3rem;
	}

	.status.error {
		color: #d32f2f;
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
