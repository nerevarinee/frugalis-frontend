<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { get } from 'svelte/store';
	import { guest } from '$lib/stores/auth';
	import ChatWindow from '$lib/components/ChatWindow.svelte';
	import { _ } from 'svelte-i18n';

	export let data;
	$: conversationId = data?.id;

	const guestInfo = get(guest);

	onMount(() => {
		if (!guestInfo?.token) {
			goto(resolve('/guest/login'));
		}
	});
</script>

<div class="chat-page">
    <a href="/main" class="back"><img src="/logo-FRUGALI.png" alt="Frugalis Logo" class="logo" />
	</a>
	<a href={resolve('/guest/messages')} class="back">← {$_('back')}</a>
	<h1>{$_('conversations')}</h1>

	{#if conversationId && guestInfo?.token}
		<ChatWindow {conversationId} currentUserType="guest" guestToken={guestInfo.token} />
	{/if}
</div>

<style>
	.chat-page {
		max-width: 700px;
		margin: 2rem auto;
		padding: 0 1rem;
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
