<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Box from '$lib/components/Box.svelte';
	export let data: PageData;

	onMount(async () => {
		console.log('Number of lakes: ', data.lakes.length);
		console.log(data.lakes.filter((v) => v.name.toLowerCase().includes('chautauqua')));
	});
</script>

<div class="box-container">
	<Box logo="/urban.png" title="Urban Heat Tool" link="/urban-heat-tool" />
	<Box logo="/algae.png" title="Algal Blooms" link="/algal-blooms" />
	<Box logo="/variable.png" title="TBD Other Variable" link="/variable" />
</div>

<style>
	.box-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
