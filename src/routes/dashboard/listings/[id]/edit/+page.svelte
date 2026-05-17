<script>
	import { enhance } from '$app/forms';
	import { _ } from 'svelte-i18n';
	export let data;
	$: listing = data.listing;
</script>

<h1>{$_('edit_listing')}</h1>

<form method="POST" use:enhance>
	<div class="field">
		<label for="edit-title">{$_('title')}</label>
		<input id="edit-title" name="title" value={listing.title} required />
	</div>
	<div class="field">
		<label for="edit-description">{$_('description')}</label>
		<textarea id="edit-description" name="description" rows="4">{listing.description}</textarea>
	</div>
	<div class="row">
		<div class="field">
			<label for="edit-price">{$_('price')}</label>
			<input id="edit-price" name="price" type="number" value={listing.price} required />
		</div>
		<div class="field">
			<label for="edit-size">{$_('size')}</label>
			<select id="edit-size" name="size">
				{#each ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'] as s (s)}
					<option value={s} selected={listing.size === s}>{s}</option>
				{/each}
			</select>
		</div>
	</div>
	<!-- repeat other fields the same way -->
	<button type="submit">{$_('save_changes')}</button>
</form>
