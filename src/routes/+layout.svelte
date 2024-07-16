<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import './global.css';
</script>

<svelte:head>
	<title>Climate Variable Visualizer</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

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
