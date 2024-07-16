<!-- src/lib/components/Box.svelte -->
<script lang="ts">
	export let logo: string;
	export let title: string;
	export let link: string;
</script>

<a href={link}>
	<div class="box">
		<img src={logo} alt={title} />
		<div class="box-title">{title}</div>

		<img class="plus-sign" src="/pink-plus.png" alt="plus sign" />
	</div>
</a>

<style>
	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		width: 200px;
		margin: 1rem;
		position: relative;
		text-decoration: none;
	}

	.box img {
		width: 100px;
		height: 100px;
	}

	.box-title {
		margin-top: 1rem;
		font-size: 1.2rem;
		text-align: center;
		color: black;
	}

	.plus-sign {
		top: 0px;
		right: 0px;
		position: absolute;
		cursor: pointer;
	}
</style>
