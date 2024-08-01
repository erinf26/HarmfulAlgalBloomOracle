<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	export let data: PageData;
</script>

<h1>Algal Blooms Map</h1>

<Searchbar lakes={data.lakes} />

<Timeline simpleRasterDates={data.simpleRasterDates} />

<Map lakes={data.lakes} simpleRasterDates={data.simpleRasterDates} />
