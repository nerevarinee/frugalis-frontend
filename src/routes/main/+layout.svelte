<script>
  import Navbar from '$lib/components/navbar.svelte';
  import AuthNavbar from '$lib/components/authNavbar.svelte';

  export let data;
</script>


{#if data.user}
  <AuthNavbar/>
{:else}
  <Navbar />
{/if}

<main>
  <slot />
</main>