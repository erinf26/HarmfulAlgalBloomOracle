<script lang="ts">
	import { selectedDateIndex } from '$lib/store';

	export let simpleRasterDates: string[];

	function nextDate() {
		if ($selectedDateIndex < simpleRasterDates.length - 1) {
			$selectedDateIndex = $selectedDateIndex + 1;
		}
	}

	function prevDate() {
		if ($selectedDateIndex > 0) {
			$selectedDateIndex = $selectedDateIndex - 1;
		}
	}

	// Date.toLocaleDateString('en-CA') returns in YYYY-MM-DD
</script>

<div class="timeline_container">
	<button class="left" on:click={prevDate}>&lt;</button>
	<div class="center">
		<p>{simpleRasterDates[$selectedDateIndex]}</p>
	</div>
	<button class="right" on:click={nextDate}>&gt;</button>
</div>

<style scoped>
	.timeline_container {
		/* border: 1px solid red; */
		width: 100%;
		height: 100px;
		margin-block: 1rem;
		display: flex;
		position: relative;
	}

	.right,
	.left {
		flex: 1;
		background-color: green;
		display: grid;
		place-items: center;
		font-size: 3rem;
		cursor: pointer;
		border: none;
	}

	.center {
		flex: 3;
		display: grid;
		place-items: center;
	}

	.center p {
		font-size: 2rem;
	}
</style>
