<script lang="ts">
	import { enhance } from '$app/forms';
	import { _ } from 'svelte-i18n';
	export let data;
	export let form;

	$: user = data?.user ?? {};
	let avatarPreview = user?.avatar;

	function previewAvatar(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) avatarPreview = URL.createObjectURL(file);
	}
</script>

<div class="settings">
	<h1>{$_('account_settings')}</h1>

	{#if form?.success}
		<p class="success">{$_('profile_updated')}</p>
	{/if}

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form method="POST" enctype="multipart/form-data" use:enhance>
		<div class="avatar-section">
			<img src={avatarPreview || '/default-avatar.png'} alt="avatar" class="avatar-preview" />
			<div>
				<label for="avatar" class="avatar-label">{$_('change_photo')}</label>
				<input id="avatar" name="avatar" type="file" accept="image/*" on:change={previewAvatar} />
			</div>
		</div>

		<div class="field">
			<label for="settings-username">{$_('username')}</label>
			<input id="settings-username" name="username" value={user.username} required />
		</div>

		<div class="field">
			<label for="settings-bio">{$_('bio')}</label>
			<textarea id="settings-bio" name="bio" rows="3">{user.bio}</textarea>
		</div>

		<div class="field">
			<label for="settings-location">{$_('location')}</label>
			<input
				id="settings-location"
				name="location"
				value={user.location}
				placeholder={$_('city_country_placeholder')}
			/>
		</div>

		<div class="field">
			<label for="settings-whatsapp">{$_('whatsapp_number')}</label>
			<input
				id="settings-whatsapp"
				name="whatsapp"
				value={user.whatsapp}
				placeholder={$_('whatsapp_placeholder')}
			/>
			<small>{$_('whatsapp_hint')}</small>
		</div>

		<button type="submit" class="save-btn">{$_('save_changes')}</button>
	</form>

	<!-- Sponsored Status -->
	<div class="sponsored-section">
		<h2>{$_('sponsored_status')}</h2>
		<p class="sponsored-desc">{$_('sponsored_desc')}</p>
		<button class="coming-soon-btn" disabled>{$_('coming_soon')}</button>
	</div>
</div>

<style>
	.settings {
		max-width: 520px;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.avatar-section {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.avatar-preview {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid #000;
	}

	.avatar-label {
		display: inline-block;
		font-size: 0.9rem;
		font-weight: 700;
		cursor: pointer;
		border: 3px solid #000;
		padding: 0.5rem 1rem;
		transition: 0.15s;
	}

	.avatar-label:hover {
		background: #000;
		color: #fff;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	label {
		font-size: 0.9rem;
		font-weight: 700;
	}

	small {
		font-size: 0.78rem;
		color: #555;
	}

	input,
	textarea {
		padding: 0.7rem 0.9rem;
		border: 3px solid #000;
		border-radius: 0;
		font-size: 0.95rem;
		font-family: inherit;
		background: #fff;
		transition: 0.15s;
	}

	input:focus,
	textarea:focus {
		outline: none;
		background: #f5f5f5;
	}

	.save-btn {
		padding: 0.85rem;
		background: #000;
		color: #fff;
		border: 3px solid #000;
		border-radius: 0;
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
		transition: 0.15s;
	}

	.save-btn:hover {
		background: #fff;
		color: #000;
	}

	.success {
		background: #fff;
		color: #000;
		border: 3px solid #000;
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
		font-weight: 700;
	}

	.error {
		background: #fff;
		color: #000;
		border: 3px solid #000;
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
		font-weight: 700;
	}

	/* ── Sponsored Section ── */
	.sponsored-section {
		margin-top: 2.5rem;
		border: 3px solid #000;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.sponsored-section h2 {
		font-size: 1.2rem;
		font-weight: 800;
		margin: 0;
		text-transform: uppercase;
	}

	.sponsored-desc {
		font-size: 0.9rem;
		color: #555;
		margin: 0;
		line-height: 1.5;
	}

	.coming-soon-btn {
		align-self: flex-start;
		padding: 0.75rem 2rem;
		background: #000;
		color: #fff;
		border: 3px solid #000;
		border-radius: 0;
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		cursor: not-allowed;
		opacity: 0.7;
	}
</style>
