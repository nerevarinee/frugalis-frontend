<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { registerUser } from '$lib/api.js';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	let error = '';
	let success = '';
	let loading = false;

	import { _ } from 'svelte-i18n';
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		success = '';

		// Client-side validation
		if (!username || !email || !password || !confirmPassword) {
			error = 'All fields are required.';
			return;
		}

		if (password !== confirmPassword) {
			error = 'Passwords do not match.';
			return;
		}

		if (password.length < 6) {
			error = 'Password must be at least 6 characters.';
			return;
		}

		loading = true;

		try {
			await registerUser({ username, email, password });
			success = 'Registration successful! Redirecting...';

			setTimeout(() => {
				goto(resolve('/dashboard'));
			}, 500);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Registration failed';
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
	<h1>{$_('register')}</h1>

	<form on:submit={handleSubmit}>
		<input type="text" placeholder={$_('username')} bind:value={username} required />

		<input type="email" placeholder={$_('email')} bind:value={email} required />

		<input type="password" placeholder={$_('password')} bind:value={password} required />

		<input
			type="password"
			placeholder={$_('confirm_password')}
			bind:value={confirmPassword}
			required
		/>

		<button type="submit" disabled={loading}>
			{#if loading}
				{$_('creating_account')}
			{:else}
				{$_('register')}
			{/if}
		</button>
	</form>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	{#if success}
		<p class="success">{success}</p>
	{/if}

	<p>{$_('register_footer')} <a href={resolve('/auth/login')}>{$_('login_here')}</a></p>
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
		border-color: #4caf50;
		box-shadow: 0 0 5px rgba(79, 82, 79, 0.3);
	}

	button {
		padding: 12px;
		background-color: #000000;
		color: white;
		border: 3px solid black;
		border-radius: 2px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	button:hover:not(:disabled) {
		background-color: #ffffff;
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
		color: #343634;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
