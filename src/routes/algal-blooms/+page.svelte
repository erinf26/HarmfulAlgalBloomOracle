<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';

	export let data: PageData;

	onMount(async () => {
		console.log('Number of lakes: ', data.lakes.length);
		console.log(data.lakes.filter((v) => v.name.toLowerCase().includes('chautauqua')));
	});
</script>

<h1>Algal Blooms Map</h1>

<Searchbar lakes={data.lakes} />

<Map lakes={data.lakes} />
