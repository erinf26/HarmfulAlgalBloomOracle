<script lang="ts">
	export let lakeid: number;
	export let lakename: string;
	export let insitudate: string;

	// Date.toLocaleDateString('en-CA') outputs date in YYYY-MM-DD without swithcing timezone, exactly what is needed here
</script>

<div class="lakepopup" id={'lake' + String(lakeid)}>
	<p class="lakename">{lakename}</p>
	<p>In situ data recorded on {new Date(insitudate).toLocaleDateString('en-CA')}</p>
	<button>Download Time Series</button>
	<button>Download Prediction GeoTiff</button>
	<button>Change Date</button>
</div>

<style scoped>
	p {
		margin: 0 !important;
		font-size: 1rem;
	}
	.lakename {
		font-size: 1.2rem;
		font-weight: bold;
		margin-top: 0.75rem !important;
		text-wrap: nowrap;
	}

	button {
		border: 1px solid black;
		border-radius: 5px;
		background-color: white;
		padding: 0.5rem;
		display: block;
		margin-block: 0.5rem;
	}
</style>
