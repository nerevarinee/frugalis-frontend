<script>
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';
  let success = '';
  let loading = false;

  async function handleSubmit(event) {
    event.preventDefault();
    error = '';
    loading = true;

    try {
      const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080'
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Redirect on success
      success = 'Login successful! Redirecting...';
      goto('/dashboard/listings');
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="container">
  <h1>Login</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="email"
      placeholder="Email"
      bind:value={email}
      required
    />

    <input
      type="password"
      placeholder="Password"
      bind:value={password}
      required
    />

    <button type="submit" disabled={loading}>
      {#if loading}
        Logging in...
      {:else}
        Login
      {/if}
    </button>
  </form>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if success}
    <p class="success">{success}</p>
  {/if}

  <p>If you Do not have an account <a href="/auth/register">Register here</a></p>
</div>

<style>
  .container {
    max-width: 400px;
    margin: 200px auto;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 0px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    justify-content: center;
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
    border-color: black;
    box-shadow: 0 0 5px rgba(28, 65, 29, 0.3);
  }

  button {
    padding: 12px;
    background-color: black;
    border: 3px solid black;
    color: white;
    border-radius: 2px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover:not(:disabled) {
    background-color: white;
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
    color: #262726;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>

