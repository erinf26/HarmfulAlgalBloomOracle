<script lang="ts">
	import { onMount } from 'svelte';
	import type { Map } from 'leaflet';
	import { browser } from '$app/environment';
	import type { LakeExported } from '$lib/types';
	import 'leaflet/dist/leaflet.css';

	export let lakes: LakeExported[];

	let mapElement: HTMLElement;
	let map: Map;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet
				.map(mapElement, { preferCanvas: true }) // use canvas for better performance
				.setView([lakes[7].latitude, lakes[7].longitude], 7); // this sets the view

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			for (const lake of lakes) {
				let marker = leaflet
					.circleMarker(
						// circle marker for better performance
						{ lat: lake.latitude, lng: lake.longitude },
						{
							radius: 5,
							fillColor: '#006eff'
						}
					)
					.addTo(map)
					.addEventListener('click', (e) => {
						console.log('Marker clicked: ', lake);
					});
			}
		}
	});
</script>

<div class="map" bind:this={mapElement} />

<style>
	.map {
		height: 600px;
	}
</style>
