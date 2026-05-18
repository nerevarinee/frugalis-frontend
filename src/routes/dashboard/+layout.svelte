<script lang="ts">
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/navbar.svelte';
	import AuthNavbar from '$lib/components/authNavbar.svelte';
	import { _ } from 'svelte-i18n';

	import { page } from '$app/stores';
	export let data;

	const links = [
		//{ href: '/dashboard',                  label: 'Overview',   icon: '' },
		{ href: '/dashboard/listings', key: 'my_listings', icon: '' },
		{ href: '/dashboard/listings/new', key: 'sell_item', icon: '' },
		{ href: '/dashboard/orders', key: 'orders', icon: '' },
		{ href: '/dashboard/messages', key: 'conversations', icon: '' },
		{ href: '/dashboard/settings', key: 'account_settings', icon: '' }
	];

	$: currentPath = $page.url.pathname;
</script>

{#if data.user}
	<AuthNavbar />
{:else}
	<Navbar />
{/if}

<div class="dashboard">
	<aside class="sidebar">
		<div class="sidebar-user">
			<img src={data?.user?.avatar || '/default-avatar.jpg'} alt="avatar" />
			<div>
				<p class="name">{data?.user?.username}</p>
				<p class="email">{data?.user?.email}</p>
			</div>
		</div>

		<nav>
			{#each links as link (link.href)}
				<a
					href={resolve(
						link.href as
							| '/dashboard/listings'
							| '/dashboard/listings/new'
							| '/dashboard/orders'
							| '/dashboard/messages'
							| '/dashboard/settings'
					)}
					class:active={currentPath === link.href || currentPath.startsWith(link.href + '/')}
				>
					<span>{link.icon}</span>
					{$_(link.key)}
				</a>
			{/each}
		</nav>

		<a href={resolve('/auth/logout')} class="logout">
			<button type="button">{$_('sign_out')}</button>
		</a>
	</aside>

	<main class="content">
		<slot />
	</main>
</div>

<style>
	.dashboard {
		display: grid;
		grid-template-columns: 240px 1fr;
		min-height: calc(100vh - 60px);
	}

	.sidebar {
		border-right: 1px solid #eee;
		padding: 1.5rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		position: sticky;
		top: 60px;
		height: calc(100vh - 60px);
		overflow-y: auto;
	}

	.sidebar-user {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
	}

	.sidebar-user img {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		object-fit: cover;
	}

	.name {
		font-weight: 700;
		font-size: 0.9rem;
		margin: 0;
	}

	.email {
		font-size: 0.75rem;
		color: #888;
		margin: 0;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	nav a {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.65rem 0.75rem;
		border-radius: 0px;
		border: black 3px solid;
		text-decoration: none;
		color: black;
		font-size: 0.9rem;
		transition: background 0.15s;
	}

	nav a:hover {
		background: #eee;
	}
	nav a.active {
		background: #111;
		color: #fff;
	}

	.logout {
		margin-top: auto;
	}

	.logout button {
		width: 100%;
		padding: 0.6rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		background: white;
		cursor: pointer;
		color: #666;
		font-size: 0.85rem;
	}

	.logout button:hover {
		background: #f5f5f5;
	}

	.content {
		padding: 2rem;
		overflow-y: auto;
	}

	/* Mobile — sidebar becomes bottom nav */
	@media (max-width: 768px) {
		.dashboard {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr auto;
		}

		.sidebar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			top: auto;
			height: auto;
			flex-direction: row;
			padding: 0.5rem;
			border-right: none;
			border-top: 1px solid #eee;
			z-index: 100;
		}

		.sidebar-user,
		.logout {
			display: none;
		}

		nav {
			flex-direction: row;
			width: 100%;
			justify-content: space-around;
		}

		nav a span {
			display: block;
			font-size: 1.2rem;
		}
		nav a {
			flex-direction: column;
			font-size: 0.65rem;
			padding: 0.4rem;
		}

		.content {
			padding: 1rem;
			padding-bottom: 80px;
		}
	}
</style>
