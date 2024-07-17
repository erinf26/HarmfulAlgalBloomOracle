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
	<Box logo="/variable.png" title="TBD Variable" link="/variable" />
</div>

<style>
	.box-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: calc(calc(100dvh - 60px - 60px)); /* to center the box on the entire page */
		max-width: 900px;
		margin-bottom: 60px;
		margin-inline: auto;
		flex-wrap: wrap;
	}
</style>
