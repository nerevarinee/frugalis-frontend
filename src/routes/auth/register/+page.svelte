<script>
  import { goto } from '$app/navigation';
  import { registerUser } from '$lib/api.js';

  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  let error = '';
  let success = '';
  let loading = false;

  async function handleSubmit(event) {
    event.preventDefault();
    error = '';
    success = '';

    // Client-side validation
    if (!username || !email || !password || !confirmPassword) {
      error = 'All fields are required.';
      return;
    }

    if (password !== confirmPassword) {
      error = 'Passwords do not match.';
      return;
    }

    if (password.length < 6) {
      error = 'Password must be at least 6 characters.';
      return;
    }

    loading = true;

    try {
      await registerUser({ username, email, password });
      success = 'Registration successful! Redirecting...';

      setTimeout(() => {
        goto('/dashboard');
      }, 500);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="container">
  <h1>Register</h1>

  <form on:submit={handleSubmit}>
    <input
      type="text"
      placeholder="Full Name"
      bind:value={username}
      required
    />

    <input
      type="email"
      placeholder="Email Address"
      bind:value={email}
      required
    />

    <input
      type="password"
      placeholder="Password"
      bind:value={password}
      required
    />

    <input
      type="password"
      placeholder="Confirm Password"
      bind:value={confirmPassword}
      required
    />

    <button type="submit" disabled={loading}>
      {#if loading}
        Creating account...
      {:else}
        Register
      {/if}
    </button>
  </form>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if success}
    <p class="success">{success}</p>
  {/if}

  <p>If you already have an account <a href="/auth/login">Login here</a></p>
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
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(79, 82, 79, 0.3);
  }

  button {
    padding: 12px;
    background-color: #000000;
    color: white;
    border: 3px solid black;
    border-radius: 2px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover:not(:disabled) {
    background-color: #ffffff;
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
    color: #343634;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>