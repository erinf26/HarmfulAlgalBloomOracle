<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Box from '$lib/components/Box.svelte';

	export let data: PageData;

	onMount(async () => {
		console.log('Number of lakes: ', data.lakes.length);
		console.log(data.lakes.filter((v) => v.name.toLowerCase().includes('chautauqua')));
	});

	function setMapView(latitude: number, longitude: number, arg2: number) {
		throw new Error('Function not implemented.');
	}
</script>

<h1>Algal Blooms Map</h1>
<Searchbar lakes={data.lakes} />
<Map lakes={data.lakes} />
<!-- 
<style>
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.search-container {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 200px; /* Adjust the width as needed */
	}

	.search-results {
		position: absolute;
		top: 70px;
		right: 10px;
		background: white;
		border: 1px solid #ccc;
		max-height: 300px;
		overflow-y: auto;
	}

	.search-result-item {
		padding: 0.5rem;
		cursor: pointer;
	}

	.search-result-item:hover {
		background: #f0f0f0;
	}
</style> -->
