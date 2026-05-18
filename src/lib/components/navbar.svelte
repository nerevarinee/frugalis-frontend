<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { guest } from '$lib/stores/auth';
	import { _ } from 'svelte-i18n';

	let query = '';
	let mobileOpen = false;
	let unreadCount = 0;
	let unreadTimer: ReturnType<typeof setInterval> | null = null;

	const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';

	async function fetchUnreadCount() {
		if (!$guest?.token) {
			unreadCount = 0;
			return;
		}
		try {
			const res = await fetch(`${API_URL}/api/messages/unread-count`, {
				headers: { Authorization: `Bearer ${$guest.token}` }
			});
			if (res.ok) {
				const data = await res.json();
				unreadCount = data.count;
			}
		} catch {
			// silent
		}
	}

	function toggleMobileMenu() {
		mobileOpen = !mobileOpen;
	}

	function handleSearchSubmit(e: Event) {
		e.preventDefault();
		if (!query.trim()) return;
		goto(resolve(`/listings?search=${encodeURIComponent(query.trim())}`));
	}

	function guestLogout() {
		guest.logout();
		unreadCount = 0;
		goto(resolve('/'));
	}

	onMount(() => {
		fetchUnreadCount();
		unreadTimer = setInterval(fetchUnreadCount, 30000);
	});

	onDestroy(() => {
		if (unreadTimer) clearInterval(unreadTimer);
	});
</script>

<nav class="nav">
	<div class="mobile-header">
		<a class="logo-area" href={resolve('/')}>
			<img src="/logo-FRUGALI.png" alt="FRUGALIS" class="logo" />
		</a>
		<button
			class="burger-button"
			type="button"
			on:click={toggleMobileMenu}
			aria-label="Toggle mobile menu"
		>
			<span class="burger-line"></span>
			<span class="burger-line"></span>
			<span class="burger-line"></span>
		</button>
	</div>

	<div class="desktop-nav">
		<div class="items-wrapper">
			<div id="search-bar">
				<form id="search-bar-form" on:submit|preventDefault={handleSearchSubmit}>
					<div class="input-wrapper">
						<svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
							<path
								d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
							/></svg
						>
						<input bind:value={query} type="text" placeholder={$_('search_placeholder')} />
					</div>
					<button class="search-button" type="submit">{$_('search')}</button>
				</form>
			</div>
			<div class="logo-area">
				<a href={resolve('/')}>
					<img src="/logo-FRUGALI.png" alt="FRUGALIS" class="logo" />
				</a>
			</div>
			<div class="user-area">
				<a href={resolve('/legal')} class="terms-link">{$_('terms_of_service')}</a>
			</div>
			<div>
				{#if $guest?.token}
					<span class="guest-phone"
						>{$_('guest_logged_in_as', { values: { phone: $guest.phone } })}</span
					>
					<button class="logout-button" type="button" on:click={guestLogout}
						>{$_('guest_logout')}</button
					>
				{:else}
					<a href={resolve('/auth/register')}
						><button class="bam-button" type="button">{$_('become_a_member')}</button></a
					>
					<a href={resolve('/guest/login')} class="terms-link">{$_('guest_track_orders_link')}</a>
				{/if}
			</div>
		</div>
		<div class="nav-links">
			{#if $guest?.token}
				<a href={resolve('/guest/orders')} class="terms-link">{$_('guest_my_orders')}</a>
				<a href={resolve('/guest/messages')} class="terms-link"
					>{$_('conversations')}{#if unreadCount > 0}
						<span class="unread-badge">{unreadCount}</span>{/if}</a
				>
				<a href={resolve('/favourites')} class="terms-link">{$_('favourites_page')}</a>
			{/if}
			<a href={resolve('/listings')}>{$_('browse_listings')}</a>
			<a href={resolve('/auth/login')}>{$_('login')}</a>
		</div>
	</div>

	<div class="mobile-menu{mobileOpen ? ' open' : ''}">
		<div class="mobile-search">
			<form id="search-bar-form" on:submit|preventDefault={handleSearchSubmit}>
				<div class="input-wrapper">
					<svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path
							d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
						/></svg
					>
					<input bind:value={query} type="text" placeholder={$_('search_placeholder')} />
				</div>
				<button class="search-button" type="submit">{$_('search')}</button>
			</form>
		</div>
		<a href={resolve('/listings')} class="mobile-link">{$_('browse_listings')}</a>
		<a href={resolve('/auth/login')} class="mobile-link">{$_('login')}</a>
		{#if $guest?.token}
			<a href={resolve('/guest/orders')} class="mobile-link">{$_('guest_my_orders')}</a>
			<a href={resolve('/guest/messages')} class="mobile-link"
				>{$_('conversations')}{#if unreadCount > 0}
					({unreadCount}){/if}</a
			>
			<a href={resolve('/favourites')} class="mobile-link">{$_('favourites_page')}</a>
			<button class="mobile-link mobile-logout" on:click={guestLogout}>{$_('guest_logout')}</button>
		{:else}
			<a href={resolve('/guest/login')} class="mobile-link">{$_('guest_track_orders_link')}</a>
			<a href={resolve('/auth/register')} class="mobile-link">{$_('become_a_member')}</a>
		{/if}
		<a href={resolve('/legal')} class="mobile-link">{$_('terms_of_service')}</a>
	</div>
</nav>

<style>
	nav {
		margin-top: 20px;
		justify-content: center;
		display: flex;
		align-items: center;
		font-family: 'Jaldi', sans-serif;
	}
	.items-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4.5rem;
		flex-wrap: wrap;
		margin-left: auto;
		margin-right: auto;
	}
	#search-bar {
		width: fit-content;
		display: flex;
		align-items: center;
		border: 3px solid black;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
	}

	#search-bar-form {
		display: flex;
		align-items: center;
		background: white;
		overflow: hidden;
		font-family: 'Jaldi', sans-serif;
	}

	.input-wrapper {
		position: relative;
		flex: 1;
		width: 100%;
	}

	.input-wrapper input {
		width: 100%;
		padding: 6px 8px 6px 30px;
		border: none;
		outline: none;
		background: transparent;
		font-size: 14px;
		font-family: 'Jaldi', sans-serif;
	}

	.nav-links {
		border-top: 2px solid black;
		border-bottom: 2px solid black;
		padding: 0.55rem 0;
		justify-content: center;
		display: flex;
		gap: 20px;
		font-size: 14px;
		font-weight: 600;
	}

	.search-icon {
		position: absolute;
		width: 18px;
		height: 18px;
		left: 8px;
		top: 50%;
		transform: translateY(-50%);
		fill: #333;
	}

	.search-button {
		border: none;
		padding: auto;
		margin: 3px;
		margin-left: 2px;
		background: white;
		border: 3px solid black;
		cursor: pointer;
		font-size: 16px;
		font-weight: 600;
		font-family: 'Jaldi', sans-serif;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
	}

	.search-button:hover {
		background: black;
		color: White;
	}

	.logo {
		margin-left: 35px;
		margin-right: 45px;
		width: 100px;
	}

	/* .user-area {
  margin-left: 80px;
  margin-right: 40px;
} */

	.bam-button {
		border: none;
		padding: 6px 12px;
		background: white;
		border: 1px solid black;
		cursor: pointer;
		font-size: 13px;
		font-weight: 600;
		font-family: 'Jaldi', sans-serif;
		margin-right: 4rem;
	}
	.bam-button:hover {
		background: black;
		color: White;
	}

	.logout-button {
		border: none;
		padding: 6px 12px;
		background: white;
		border: 1px solid black;
		cursor: pointer;
		font-size: 13px;
		font-weight: 600;
		font-family: 'Jaldi', sans-serif;
	}
	.logout-button:hover {
		background: black;
		color: White;
	}

	a {
		text-decoration: none;
		color: black;
	}
	a:hover {
		text-decoration: none;
		color: grey;
	}

	.terms-link {
		font-size: 12px;
		font-weight: 500;
		border: none;
		background: white;
		border: none;
		cursor: pointer;
		font-size: 16px;
		font-weight: 750;
		font-family: 'Jaldi', sans-serif;
	}

	.unread-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #000;
		color: #fff;
		font-size: 0.7rem;
		font-weight: 700;
		min-width: 18px;
		height: 18px;
		padding: 0 4px;
		border-radius: 9px;
		margin-left: 4px;
		vertical-align: middle;
		line-height: 1;
	}

	.guest-phone {
		font-size: 0.85rem;
		color: #555;
		margin-right: 1rem;
		white-space: nowrap;
	}

	.mobile-logout {
		background: none;
		border: none;
		font-family: inherit;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		width: 100%;
		text-align: center;
	}

	.mobile-header {
		display: none;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
	}

	.mobile-header .logo-area {
		margin: 0;
	}

	.burger-button {
		display: inline-flex;
		flex-direction: column;
		justify-content: space-between;
		width: 28px;
		height: 20px;
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
	}

	.burger-line {
		display: block;
		width: 100%;
		height: 3px;
		background: black;
		border-radius: 2px;
	}

	.mobile-menu {
		display: none;
		width: 100%;
	}

	.mobile-menu.open {
		display: flex;
		flex-direction: column;
	}

	.mobile-search {
		border-bottom: 2px solid #000;
	}

	.mobile-search #search-bar-form {
		margin: 0;
		border: none;
		box-shadow: none;
		padding: 0.6rem 1rem;
		background: transparent;
		width: 100%;
	}

	.mobile-search .search-button {
		margin: 0;
		border-width: 2px;
	}

	.mobile-link {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		text-align: center;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		color: #000;
		border-bottom: 2px solid #000;
	}

	.mobile-link:hover {
		background: #000;
		color: #fff;
	}

	.desktop-nav {
		width: 100%;
		display: grid;
		align-items: center;
		justify-content: center;
		gap: 20px;
		flex-wrap: wrap;
	}

	/* Mobile Responsive Styles */
	@media (max-width: 1024px) {
		.items-wrapper {
			gap: 2rem;
		}

		nav {
			margin-top: 15px;
			gap: 10px;
		}

		#search-bar {
			width: 250px;
			margin-left: 10px;
			margin-right: 20px;
		}

		.logo {
			margin-left: 15px;
			margin-right: 15px;
			width: 80px;
		}

		.bam-button {
			padding: 5px 10px;
			font-size: 12px;
			margin-left: 3px;
			margin-right: 3px;
		}
	}

	@media (max-width: 768px) {
		.mobile-header {
			display: flex;
		}

		.desktop-nav {
			display: none;
		}

		nav {
			flex-direction: column;
			margin-top: 0;
			gap: 0;
		}

		.mobile-search #search-bar-form {
			flex-direction: row;
		}

		.mobile-search .input-wrapper input {
			font-size: 13px;
		}

		.mobile-search .search-icon {
			width: 16px;
			height: 16px;
		}

		.mobile-search .search-button {
			font-size: 12px;
		}

		.mobile-header .logo {
			width: 70px;
		}
	}

	@media (max-width: 480px) {
		.mobile-search #search-bar-form {
			flex-direction: column;
		}

		.mobile-search .search-button {
			width: 100%;
			margin-top: 5px;
			padding: 5px 8px;
			font-size: 11px;
		}

		.mobile-search .input-wrapper input {
			font-size: 12px;
		}

		.mobile-search .search-icon {
			width: 14px;
			height: 14px;
			left: 6px;
		}

		.mobile-header .logo {
			width: 60px;
		}
	}
</style>
