<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import './global.css';
</script>

<svelte:head>
	<title>CCRI Visualizer</title>
</svelte:head>

<div id="navbar_container">
	<Navbar />
</div>

<main id="main">
	<slot />
</main>

<style>
	main,
	#navbar_container {
		width: 98vw;
		margin-inline: auto;
	}
</style>
