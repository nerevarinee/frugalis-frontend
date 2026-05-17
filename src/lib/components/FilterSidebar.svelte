<script lang="ts">
	import { goto } from '$app/navigation';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { _ } from 'svelte-i18n';

	let search = '';
	let category = '';
	let size = '';
	let condition = '';
	let minPrice = '';
	let maxPrice = '';

	// Get current URL params to populate form
	function getCurrentFilters() {
		if (typeof window !== 'undefined') {
			const urlParams = new SvelteURLSearchParams(window.location.search);
			search = urlParams.get('search') || '';
			category = urlParams.get('category') || '';
			size = urlParams.get('size') || '';
			condition = urlParams.get('condition') || '';
			minPrice = urlParams.get('minPrice') || '';
			maxPrice = urlParams.get('maxPrice') || '';
		}
	}

	// Initialize filters from URL
	getCurrentFilters();

	function applyFilters() {
		const params = new SvelteURLSearchParams();

		if (search.trim()) params.set('search', search.trim());
		if (category) params.set('category', category);
		if (size.trim()) params.set('size', size.trim());
		if (condition) params.set('condition', condition);
		if (minPrice) params.set('minPrice', minPrice);
		if (maxPrice) params.set('maxPrice', maxPrice);

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(`?${params.toString()}`, { replaceState: true });
	}

	function clearFilters() {
		search = '';
		category = '';
		size = '';
		condition = '';
		minPrice = '';
		maxPrice = '';
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto('?', { replaceState: true });
	}

	// Auto-apply filters on input change (debounced)
	let timeout: ReturnType<typeof setTimeout> | undefined;
	function handleInputChange() {
		clearTimeout(timeout);
		timeout = setTimeout(applyFilters, 500);
	}
</script>

<svelte:window on:popstate={getCurrentFilters} />

<aside class="filters">
	<div class="filter-header">
		<h3>{$_('filters')}</h3>
		<button class="clear-btn" on:click={clearFilters}>{$_('clear_all')}</button>
	</div>

	<div class="filter-group">
		<label for="search">{$_('search')}</label>
		<input
			id="search"
			type="text"
			placeholder={$_('search_placeholder')}
			bind:value={search}
			on:input={handleInputChange}
		/>
	</div>

	<div class="filter-group">
		<label for="category">{$_('category')}</label>
		<select id="category" bind:value={category} on:change={applyFilters}>
			<option value="">{$_('all_categories')}</option>
			<option value="electronics">{$_('category_electronics')}</option>
			<option value="clothing">{$_('category_clothing')}</option>
			<option value="books">{$_('category_books')}</option>
			<option value="furniture">{$_('category_furniture')}</option>
			<option value="sports">{$_('category_sports')}</option>
			<option value="automotive">{$_('category_automotive')}</option>
			<option value="home">{$_('category_home')}</option>
			<option value="other">{$_('category_other')}</option>
		</select>
	</div>

	<div class="filter-group">
		<label for="size">{$_('size')}</label>
		<input
			id="size"
			type="text"
			placeholder={$_('size_placeholder')}
			bind:value={size}
			on:input={handleInputChange}
		/>
	</div>

	<div class="filter-group">
		<label for="condition">{$_('condition')}</label>
		<select id="condition" bind:value={condition} on:change={applyFilters}>
			<option value="">{$_('any_condition')}</option>
			<option value="new">{$_('condition_new')}</option>
			<option value="like-new">{$_('condition_like_new')}</option>
			<option value="good">{$_('condition_good')}</option>
			<option value="well-worn">{$_('condition_well_worn')}</option>
			<option value="poor">{$_('condition_poor')}</option>
		</select>
	</div>

	<div class="filter-group">
		<label for="minPrice">{$_('price_range')}</label>
		<div class="price-inputs">
			<input
				id="minPrice"
				type="number"
				placeholder={$_('min')}
				bind:value={minPrice}
				on:input={handleInputChange}
				min="0"
			/>
			<span>{$_('to')}</span>
			<input
				id="maxPrice"
				type="number"
				placeholder={$_('max')}
				bind:value={maxPrice}
				on:input={handleInputChange}
				min="0"
			/>
		</div>
	</div>
</aside>

<style>
	.filters {
		background: #fff;
		border: 0px solid #e0e0e0;
		border-radius: 0px;
		padding: 1.5rem;
		padding-right: 4rem;
		min-width: 80px;
	}

	.filter-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #f0f0f0;
	}

	.filter-header h3 {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0;
		color: #111;
	}

	.clear-btn {
		background: none;
		border: none;
		color: #666;
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		transition: background 0.2s;
	}

	.clear-btn:hover {
		background: #f5f5f5;
		color: #111;
	}

	.filter-group {
		margin-bottom: 1.25rem;
	}

	.filter-group:last-child {
		margin-bottom: 0;
	}

	label {
		display: block;
		font-size: 0.9rem;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.5rem;
	}

	input[type='text'],
	input[type='number'],
	select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 0.95rem;
		font-family: inherit;
		transition: border-color 0.2s;
	}

	input[type='text']:focus,
	input[type='number']:focus,
	select:focus {
		outline: none;
		border-color: #111;
	}

	select {
		background: #fff;
		cursor: pointer;
	}

	.price-inputs {
		display: grid;
		align-items: center;
		gap: 0.5rem;
	}

	.price-inputs input {
		flex: 1;
	}

	.price-inputs span {
		color: #666;
		font-size: 0.9rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.filters {
			min-width: auto;
			width: 100%;
			padding: 1rem;
			position: static;
		}

		.filter-header {
			flex-direction: column;
			gap: 0.75rem;
			align-items: flex-start;
		}

		.price-inputs {
			grid-template-columns: 1fr auto 1fr;
		}
	}
</style>
