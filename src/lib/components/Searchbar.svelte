<script lang="ts">
	import type { LakeExported } from '$lib/types';

	export let lakes: LakeExported[];
	let query: string;
	function handleSubmit(event: Event) {
		const filteredLakes = lakes.filter((v) => v.name.toLowerCase().includes(query));
		console.log('sliced: ', filteredLakes.slice(0, 5));
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="search-bar">
	<input
		type="text"
		name="search_query"
		bind:value={query}
		placeholder="Search lakes..."
		id="search-bar"
	/>
</form>

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
