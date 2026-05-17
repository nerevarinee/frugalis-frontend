<script lang="ts">
	import '$lib/i18n';
	import { locale } from 'svelte-i18n';
	import { onMount } from 'svelte';

	let ready = false;
	const timer = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	timer(100).then(() => {
		ready = true;
	});

	$: if ($locale) {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = $locale;
			document.documentElement.dir = $locale === 'ar' ? 'rtl' : 'ltr';
		}
	}

	onMount(() => {
		const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null;
		if (stored && ['en', 'fr', 'ar'].includes(stored)) {
			$locale = stored;
		}
	});

	$: if ($locale && typeof localStorage !== 'undefined') {
		localStorage.setItem('locale', $locale);
	}
</script>

{#if ready}
	<slot />
{/if}
