<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = '';
	export let subtitle = '';

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			dispatch('close');
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKey);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKey);
	});
</script>

<div class="backdrop">
	<div
		class="backdrop-click-area"
		role="button"
		tabindex="0"
		on:click={() => dispatch('close')}
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') dispatch('close');
		}}
	></div>

	<div class="modal">
		<div class="modal-header">
			<div>
				<h2>{title}</h2>
				<p class="modal-subtitle">{subtitle}</p>
			</div>

			<button class="x-btn" on:click={() => dispatch('close')}> ✕ </button>
		</div>

		<slot />
	</div>
</div>
