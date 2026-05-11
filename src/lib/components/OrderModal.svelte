<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let listingId
  export let listingTitle

  let tel = ''
  let location = ''
  let deliveryType = 'delivery'
  let loading = false
  let success = false
  let error = ''

  // close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) dispatch('close')
  }

  // close on Escape key
  function handleKey(e) {
    if (e.key === 'Escape') dispatch('close')
  }

  async function submit() {
    error = ''

    // basic validation
    if (!tel.trim()) return error = 'Phone number is required'
    if (!location.trim()) return error = 'Location is required'

    loading = true
    try {
      const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080'
      const res = await fetch(`${API_URL}/api/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing: listingId,
          tel: tel.trim(),
          location: location.trim(),
          deliveryType
        })
      })

      if (!res.ok) {
        const data = await res.json()
        error = data.message || 'Something went wrong'
        return
      }

      success = true
    } catch (err) {
      error = 'Could not connect to server'
    } finally {
      loading = false
    }
  }
</script>

<svelte:window on:keydown={handleKey} />

<!-- Backdrop -->
<div class="backdrop" role="presentation">
  <div class="backdrop-click-area" on:click={() => dispatch('close')} />
  <div class="modal">

    {#if success}
      <!-- Success state -->
      <div class="success-state">
        <div class="success-icon">✓</div>
        <h2>Order Placed!</h2>
        <p>
          The seller will contact you at <strong>{tel}</strong> to confirm your order.
        </p>
        <button class="close-btn" on:click={() => dispatch('close')}>
          Done
        </button>
      </div>

    {:else}
      <!-- Form state -->
      <div class="modal-header">
        <div>
          <h2>Place an Order</h2>
          <p class="modal-subtitle">{listingTitle}</p>
        </div>
        <button class="x-btn" on:click={() => dispatch('close')}>✕</button>
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <div class="form">

        <div class="field">
          <label for="tel">Your Phone Number</label>
          <input
            id="tel"
            type="tel"
            bind:value={tel}
            placeholder="e.g. 0555123456"
          />
          <small>The seller will use this to reach you</small>
        </div>

        <div class="field">
          <label for="location">Your Location</label>
          <input
            id="location"
            type="text"
            bind:value={location}
            placeholder="e.g. Sétif, Ain Arnat"
          />
        </div>

        <div class="field">
          <label>Delivery Method</label>
          <div class="delivery-options">
            <label class="option" class:selected={deliveryType === 'delivery'}>
              <input
                type="radio"
                bind:group={deliveryType}
                value="delivery"
              />
              <div class="option-content">
                <span class="option-icon"></span>
                <span class="option-label">Delivery</span>
                <span class="option-desc">Shipped to your location</span>
              </div>
            </label>

            <label class="option" class:selected={deliveryType === 'pickup'}>
              <input
                type="radio"
                bind:group={deliveryType}
                value="pickup"
              />
              <div class="option-content">
                <span class="option-icon"></span>
                <span class="option-label">Pickup</span>
                <span class="option-desc">Collect from seller</span>
              </div>
            </label>
          </div>
        </div>

        <button
          class="submit-btn"
          on:click={submit}
          disabled={loading}
        >
          {loading ? 'Placing order...' : 'Confirm Order'}
        </button>

        <p class="disclaimer">
          No account needed. The seller will contact you to confirm.
        </p>
      </div>
    {/if}
  </div>
</div>

<style>
  .backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(2px);
}

.backdrop-click-area {
  position: fixed;
  inset: 0;
  z-index: 0;         /* sits behind the modal */
}

.modal {
  position: relative;
  z-index: 1;         /* sits above the click area */
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 440px;
  padding: 1.75rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  animation: slide-up 0.2s ease;
}

  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  /* ── Header ── */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
  }

  .modal-header h2 {
    font-size: 1.2rem;
    font-weight: 800;
    margin: 0;
  }

  .modal-subtitle {
    font-size: 0.85rem;
    color: #888;
    margin: 0.2rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 260px;
  }

  .x-btn {
    background: none;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    color: #aaa;
    padding: 0.2rem;
    line-height: 1;
  }

  .x-btn:hover { color: #111; }

  /* ── Form ── */
  .form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #333;
  }

  input[type="tel"],
  input[type="text"] {
    padding: 0.7rem 0.9rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.95rem;
    font-family: inherit;
    transition: border-color 0.15s;
  }

  input[type="tel"]:focus,
  input[type="text"]:focus {
    outline: none;
    border-color: #111;
  }

  small {
    font-size: 0.78rem;
    color: #aaa;
  }

  /* ── Delivery options ── */
  .delivery-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .option {
    border: 2px solid #eee;
    border-radius: 10px;
    padding: 0.85rem;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .option.selected {
    border-color: #111;
    background: #fafafa;
  }

  .option input[type="radio"] {
    display: none;
  }

  .option-content {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .option-icon { font-size: 1.3rem; }

  .option-label {
    font-weight: 700;
    font-size: 0.9rem;
    color: #111;
  }

  .option-desc {
    font-size: 0.75rem;
    color: #888;
  }

  /* ── Submit ── */
  .submit-btn {
    width: 100%;
    padding: 0.9rem;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }

  .submit-btn:hover:not(:disabled) { background: #333; }

  .submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .disclaimer {
    text-align: center;
    font-size: 0.78rem;
    color: #aaa;
    margin: 0;
  }

  /* ── Error ── */
  .error {
    background: #fef2f2;
    color: #ef4444;
    padding: 0.65rem 0.9rem;
    border-radius: 8px;
    font-size: 0.85rem;
    margin: 0;
  }

  /* ── Success ── */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    padding: 1rem 0;
  }

  .success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #111;
    color: #fff;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .success-state h2 {
    font-size: 1.3rem;
    font-weight: 800;
    margin: 0;
  }

  .success-state p {
    color: #555;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.6;
  }

  .close-btn {
    padding: 0.75rem 2.5rem;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
  }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .modal { padding: 1.25rem; }
    .delivery-options { grid-template-columns: 1fr; }
  }
</style>