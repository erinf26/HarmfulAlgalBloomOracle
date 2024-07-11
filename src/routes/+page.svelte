<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';

	export let data: PageData;

	onMount(async () => {
		console.log('Number of lakes: ', data.lakes.length);
	});
</script>

<h1>Welcome to HAB Oracle</h1>
<Map lakes={data.lakes}/>