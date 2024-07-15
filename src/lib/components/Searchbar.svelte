<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let query = '';

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    query = target.value;
    dispatch('search', { query });
  }
</script>

<div class="search-bar">
  <input type="text" bind:value={query} on:input={handleInput} placeholder="Search lakes..." id="search-bar" />
</div>

<style>
  .search-bar {
    margin: 1rem;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
  }
</style>
