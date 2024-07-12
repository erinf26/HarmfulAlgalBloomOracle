<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import './global.css';
</script>

<svelte:head>
	<title>HAB Oracle</title>
	<!-- TODO: Add meta description tag <= 160 chars -->
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
