<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let conversationId: string;
	export let currentUserType: 'guest' | 'seller';
	export let guestToken: string | null = null;
	export let sellerToken: string | null = null;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let messages: any[] = [];
	let loading = true;
	let error = '';
	let pollTimer: ReturnType<typeof setInterval> | null = null;
	let lastTimestamp: string | null = null;
	let text = '';

	const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';

	function authHeader(): Record<string, string> {
		const token = currentUserType === 'guest' ? guestToken : sellerToken;
		return token ? { Authorization: `Bearer ${token}` } : {};
	}

	async function fetchMessages() {
		try {
			const res = await fetch(`${API_URL}/api/messages/conversations/${conversationId}`, {
				headers: authHeader()
			});
			if (!res.ok) throw new Error('Failed to load messages');
			const data = await res.json();
			messages = data.messages || [];
			if (messages.length > 0) {
				lastTimestamp = messages[messages.length - 1].createdAt;
			}
			loading = false;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong';
			loading = false;
		}
	}

	async function pollMessages() {
		if (!lastTimestamp) return;
		try {
			const res = await fetch(
				`${API_URL}/api/messages/conversations/${conversationId}/poll?after=${encodeURIComponent(lastTimestamp)}`,
				{ headers: authHeader() }
			);
			if (!res.ok) return;
			const newMessages = await res.json();
			if (newMessages.length > 0) {
				messages = [...messages, ...newMessages];
				lastTimestamp = newMessages[newMessages.length - 1].createdAt;
			}
		} catch {
			// silently fail poll
		}
	}

	async function send() {
		if (!text.trim()) return;
		const msg = text.trim();
		text = '';
		try {
			const headers: Record<string, string> = { 'Content-Type': 'application/json' };
			const token = currentUserType === 'guest' ? guestToken : sellerToken;
			if (token) headers.Authorization = `Bearer ${token}`;
			const res = await fetch(`${API_URL}/api/messages/conversations/${conversationId}`, {
				method: 'POST',
				headers,
				body: JSON.stringify({ text: msg })
			});
			if (!res.ok) {
				const data = await res.json();
				error = data.message || 'Failed to send';
				return;
			}
			const message = await res.json();
			messages = [...messages, message];
			lastTimestamp = message.createdAt;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to send';
		}
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}

	onMount(() => {
		fetchMessages();
		pollTimer = setInterval(pollMessages, 7000);
	});

	onDestroy(() => {
		if (pollTimer) clearInterval(pollTimer);
	});
</script>

<div class="chat-window">
	<div class="messages">
		{#if loading}
			<p class="status">{$_('loading')}</p>
		{:else if error}
			<p class="status error">{error}</p>
		{:else if messages.length === 0}
			<p class="status">{$_('message_empty')}</p>
		{:else}
			{#each messages as msg (msg._id)}
				<div
					class="bubble"
					class:mine={msg.senderType === currentUserType}
					class:theirs={msg.senderType !== currentUserType}
				>
					<p class="text">{msg.text}</p>
					<span class="time"
						>{new Date(msg.createdAt).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}</span
					>
				</div>
			{/each}
		{/if}
	</div>

	<div class="input-area">
		<input
			type="text"
			bind:value={text}
			on:keydown={handleKey}
			placeholder={$_('message_placeholder')}
		/>
		<button on:click={send} disabled={!text.trim()}>{$_('send_message')}</button>
	</div>
</div>

<style>
	.chat-window {
		display: flex;
		flex-direction: column;
		height: 100%;
		border: 3px solid #000;
		font-family: 'Jaldi', sans-serif;
	}

	.messages {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		min-height: 300px;
		max-height: 500px;
	}

	.status {
		text-align: center;
		color: #888;
		margin: auto;
		padding: 2rem;
	}

	.status.error {
		color: #d32f2f;
	}

	.bubble {
		max-width: 75%;
		padding: 0.6rem 0.9rem;
		word-wrap: break-word;
	}

	.bubble.mine {
		align-self: flex-end;
		background: #000;
		color: #fff;
	}

	.bubble.theirs {
		align-self: flex-start;
		background: #f5f5f5;
		color: #111;
		border: 2px solid #000;
	}

	.text {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.4;
	}

	.time {
		font-size: 0.7rem;
		opacity: 0.7;
		margin-top: 0.3rem;
		display: block;
	}

	.input-area {
		display: flex;
		border-top: 3px solid #000;
	}

	.input-area input {
		flex: 1;
		padding: 0.8rem;
		border: none;
		font-size: 0.95rem;
		font-family: inherit;
		outline: none;
	}

	.input-area button {
		padding: 0.8rem 1.5rem;
		background: #000;
		color: #fff;
		border: none;
		font-weight: 700;
		cursor: pointer;
		font-family: inherit;
		font-size: 0.9rem;
		min-width: 80px;
	}

	.input-area button:disabled {
		background: #ccc;
		cursor: not-allowed;
	}

	.input-area button:hover:not(:disabled) {
		background: #333;
	}
</style>
