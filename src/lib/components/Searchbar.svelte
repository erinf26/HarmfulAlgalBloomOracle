<script lang="ts">
	import { mapCoords } from '$lib/store';
	import type { LakeExported } from '$lib/types';

	export let lakes: LakeExported[];
	let query: string;
	let lakesResults: LakeExported[] = [];

	function handleChange() {
		if (!query) {
			lakesResults = [];
			return;
		}
		lakesResults = lakes.filter((v) => v.name.toLowerCase().includes(query));
	}

	function setView(lat: number, long: number) {
		$mapCoords = [lat, long];
	}
</script>

<form on:submit|preventDefault={handleChange} class="search-bar">
	<input
		type="text"
		name="search_query"
		bind:value={query}
		placeholder="Search lakes..."
		id="search-bar"
	/>
</form>

{#if lakesResults.length > 0}
	<div id="results">
		{#each lakesResults as lakeResult}
			<button class="result" on:click={() => setView(lakeResult.latitude, lakeResult.longitude)}>
				{lakeResult.name}
			</button>
		{/each}
	</div>
{/if}

<style>
	.search-bar {
		margin: 1rem;
	}

	input {
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
	}

	.result {
		display: block;
		width: 50%;
		margin-inline: auto;
		padding-block: 1rem;
		background-color: white;
		border: 1px solid black;
		margin-block: 0.5rem;
		border-radius: 15px;
		cursor: pointer;
	}

	#results {
		margin-bottom: 1rem;
	}
</style>
