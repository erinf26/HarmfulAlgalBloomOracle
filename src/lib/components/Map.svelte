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
				.setView([42.18778778, -79.42924043], 11); // this sets the view for lake chautauqua
			// .setView([lakes[7].latitude, lakes[7].longitude], 7); // this sets the view for new york state

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			for (const lake of lakes) {
				let marker = leaflet
					.circleMarker(
						// circle marker for better performance (cred: https://stackoverflow.com/a/43019740)
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

			let imageUrl = '/S2_Chautauqua_v2_predictions.png';
			let altText = 'Lake Chautauqua';
			let latLngBounds = leaflet.latLngBounds([
				[42.26008723694799, -79.49540093993534], // Lake Chautauqua corner bounds
				[42.0983120459646, -79.26995135973668]
			]);

			let imageOverlay = leaflet
				.imageOverlay(imageUrl, latLngBounds, {
					opacity: 0.8,
					alt: altText,
					interactive: true
				})
				.addTo(map);
		}
	});
</script>

<div class="map" bind:this={mapElement} />

<style>
	.map {
		height: 85vh;
	}
</style>
