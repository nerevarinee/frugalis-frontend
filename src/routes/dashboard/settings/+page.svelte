<script>
  import { enhance } from '$app/forms'
  export let data
  export let form

  $: user = data.user
  let avatarPreview = user.avatar

  function previewAvatar(e) {
    const file = e.target.files[0]
    if (file) avatarPreview = URL.createObjectURL(file)
  }
</script>

<div class="settings">
  <h1>Account Settings</h1>

  {#if form?.success}
    <p class="success">Profile updated successfully</p>
  {/if}

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <form method="POST" enctype="multipart/form-data" use:enhance>

    <div class="avatar-section">
      <img src={avatarPreview || '/default-avatar.png'} alt="avatar" class="avatar-preview" />
      <div>
        <label for="avatar">Change photo</label>
        <input id="avatar" name="avatar" type="file"
          accept="image/*" on:change={previewAvatar} />
      </div>
    </div>

    <div class="field">
      <label>Username</label>
      <input name="username" value={user.username} required />
    </div>

    <div class="field">
      <label>Bio</label>
      <textarea name="bio" rows="3">{user.bio}</textarea>
    </div>

    <div class="field">
      <label>Location</label>
      <input name="location" value={user.location} placeholder="City, Country" />
    </div>

    <div class="field">
      <label>WhatsApp Number</label>
      <input name="whatsapp" value={user.whatsapp}
        placeholder="e.g. 213XXXXXXXXX (with country code)" />
      <small>Buyers will use this to contact you about listings</small>
    </div>

    <button type="submit">Save Changes</button>
  </form>
</div>

<style>
  .settings { max-width: 520px; }
  h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 1.5rem; }

  form { display: flex; flex-direction: column; gap: 1.25rem; }

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
    border: 2px solid #eee;
  }

  .field { display: flex; flex-direction: column; gap: 0.4rem; }
  label { font-size: 0.85rem; font-weight: 600; }
  small { font-size: 0.78rem; color: #888; }

  input, textarea {
    padding: 0.65rem 0.85rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.95rem;
    font-family: inherit;
  }

  button {
    padding: 0.85rem;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }

  .success {
    background: #f0fdf4;
    color: #16a34a;
    padding: 0.75rem 1rem;
    border-radius: 8px;
  }

  .error {
    background: #fef2f2;
    color: #ef4444;
    padding: 0.75rem 1rem;
    border-radius: 8px;
  }
</style>