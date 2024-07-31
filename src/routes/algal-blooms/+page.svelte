<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';

	export let data: PageData;
</script>

<h1>Algal Blooms Map</h1>

<Searchbar lakes={data.lakes} />

<Map lakes={data.lakes} />
