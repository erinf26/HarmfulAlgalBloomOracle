<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		console.log('Number of lakes: ', data.lakes.length);
	});
</script>

<h1>Welcome to HAB Oracle</h1>
