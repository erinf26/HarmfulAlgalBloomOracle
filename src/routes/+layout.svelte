<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import './global.css';
</script>

<svelte:head>
	<title>Algal Blooms - CCRI Visualizer</title>
	<meta name="description" content="View algal bloom predictions across New York State's lakes." />
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
		width: 95vw;
		margin-inline: auto;
	}

	#navbar_container {
		height: 60px;
	}

	main {
		min-height: calc(100vh - 60px); /* fallback */
		min-height: calc(100dvh - 60px); /* preferred, dvh accounts for other mobile elements */
	}
</style>
