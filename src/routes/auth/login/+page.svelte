<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import {PUBLIC_API_URL} from '$env/static/public';

	let email = '';
	let password = '';
	let error = '';
	let success = '';
	let loading = false;
	import { _ } from 'svelte-i18n';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		loading = true;

		try {
			const res = await fetch(`${PUBLIC_API_URL}/api/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include', // Important for cookies
				body: JSON.stringify({ email, password })
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Login failed');
			}

			// Redirect on success
			success = 'Login successful! Redirecting...';
			goto(resolve('/dashboard/listings'));
		} catch (err) {
			error = err instanceof Error ? err.message : 'Login failed';
		} finally {
			loading = false;
		}
	}
</script>

<a href={resolve('/main')}>
	<img
		alt="logo"
		src="/logo-FRUGALI.png"
		class="logo"
		style="display: flex; margin-top: 8rem; margin-right:auto; margin-left:auto; justify-content: center;"
	/>
</a>
<div class="container">
	<h1>{$_('login')}</h1>

	<form on:submit|preventDefault={handleSubmit}>
		<input type="email" placeholder={$_('email')} bind:value={email} required />

		<input type="password" placeholder={$_('password')} bind:value={password} required />

		<button type="submit" disabled={loading}>
			{#if loading}
				{$_('logging_in')}
			{:else}
				{$_('login')}
			{/if}
		</button>
	</form>

	{#if error}
		<p class="error">{$_('login_error')}</p>
	{/if}

	{#if success}
		<p class="success">{$_('login_success')}</p>
	{/if}

	<p>{$_('login_footer')} <a href={resolve('/auth/register')}>{$_('register_here')}</a></p>
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
		margin-bottom: 20px;
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

	.error {
		color: #d32f2f;
		background-color: #ffebee;
		padding: 10px;
		border-radius: 4px;
		margin-top: 15px;
		text-align: center;
	}

	.success {
		color: #2e7d32;
		background-color: #e8f5e8;
		padding: 10px;
		border-radius: 4px;
		margin-top: 15px;
		text-align: center;
	}

	p {
		text-align: center;
		margin-top: 20px;
		color: #666;
	}

	a {
		color: #262726;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
