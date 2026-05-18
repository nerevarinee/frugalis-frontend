<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { guest } from '$lib/stores/auth';
	import { _ } from 'svelte-i18n';

	let phone = '';
	let error = '';
	let loading = false;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		if (!phone.trim()) {
			error = 'Phone number is required';
			return;
		}
		loading = true;
		try {
			await guest.login(phone.trim());
			goto(resolve('/'));
		} catch (err) {
			error = err instanceof Error ? err.message : 'Login failed';
		} finally {
			loading = false;
		}
	}
</script>

<a href={resolve('/')}>
	<img
		alt="logo"
		src="/logo-FRUGALI.png"
		class="logo"
		style="display: flex; margin-top: 8rem; margin-right:auto; margin-left:auto; justify-content: center;"
	/>
</a>
<div class="container">
	<h1>{$_('guest_login_title')}</h1>
	<p class="subtitle">{$_('guest_login_subtitle')}</p>

	<form on:submit|preventDefault={handleSubmit}>
		<input type="tel" placeholder={$_('guest_phone_placeholder')} bind:value={phone} required />

		<button type="submit" disabled={loading}>
			{loading ? $_('guest_logging_in') : $_('guest_continue')}
		</button>
	</form>

	<p class="disclaimer">{$_('guest_disclaimer')}</p>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	<p class="footer-link">
		{$_('guest_seller_prompt')} <a href={resolve('/auth/register')}>{$_('become_a_member')}</a>
	</p>
</div>

<style>
	.container {
		max-width: 400px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: auto;
		margin-top: 3rem;
		padding: 20px;
		background-color: #ffffff;
		border: 1px solid #ddd;
		border-radius: 0px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		font-family: Arial, sans-serif;
		justify-content: center;
	}

	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		text-align: center;
		color: #888;
		font-size: 0.9rem;
		margin-bottom: 1.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	input {
		padding: 12px;
		margin-bottom: 15px;
		border: 1px solid #ddd;
		border-radius: 2px;
		font-size: 16px;
		transition: border-color 0.3s;
	}

	input:focus {
		outline: none;
		border-color: black;
		box-shadow: 0 0 5px rgba(28, 65, 29, 0.3);
	}

	button {
		padding: 12px;
		background-color: black;
		border: 3px solid black;
		color: white;
		border-radius: 2px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	button:hover:not(:disabled) {
		background-color: white;
		color: black;
	}

	button:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}

	.disclaimer {
		text-align: center;
		font-size: 0.78rem;
		color: #aaa;
		margin-top: 1rem;
	}

	.error {
		color: #d32f2f;
		background-color: #ffebee;
		padding: 10px;
		border-radius: 4px;
		margin-top: 15px;
		text-align: center;
	}

	.footer-link {
		text-align: center;
		margin-top: 1.5rem;
		font-size: 0.9rem;
		color: #666;
	}

	.footer-link a {
		color: #262726;
		text-decoration: underline;
	}
</style>
