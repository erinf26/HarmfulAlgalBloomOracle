<script lang="ts">
	import './global.css';
</script>

<svelte:head>
	<title>HAB Oracle</title>
	<!-- TODO: Add meta description tag <= 160 chars -->
</svelte:head>

<main id="main">
	<slot />
</main>

<style>
	main {
		width: 98vw;
		margin-inline: auto;
	}
</style>
