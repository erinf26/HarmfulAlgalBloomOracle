<script lang="ts">
	import { onMount } from 'svelte';
	import type { LatLngBounds, Map } from 'leaflet';
	import { browser } from '$app/environment';
	import type { LakeExported } from '$lib/types';
	import 'leaflet/dist/leaflet.css';

	export let lakes: LakeExported[];

	let mapElement: HTMLElement;
	let map: Map;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			const add_lake_overlay_to_map = function (
				imageUrl: string,
				latLngBounds: LatLngBounds,
				altText: string
			) {
				let imageOverlay = leaflet
					.imageOverlay(imageUrl, latLngBounds, {
						opacity: 0.8,
						alt: altText,
						interactive: true
					})
					.addTo(map);
			};

			map = leaflet
				.map(mapElement, { preferCanvas: true }) // use canvas for better performance
				.setView([41.13612064886357, -73.9352407747292], 11); // this sets the view for lake chautauqua
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

			add_lake_overlay_to_map(
				'/Congers_T2_predictions.png',
				leaflet.latLngBounds([
					[41.14790209037696, -73.94413139827235],
					[41.13612064886357, -73.9352407747292]
				]),
				'Lake Congers'
			);

			add_lake_overlay_to_map(
				'/S2_Chautauqua_v2_predictions.png',
				leaflet.latLngBounds([
					[42.26008723694799, -79.49540093993534], // Lake Chautauqua corner bounds
					[42.0983120459646, -79.26995135973668]
				]),
				'Lake Chautauqua'
			);
		}
	});
</script>

<div class="map" bind:this={mapElement} />

<style>
	.map {
		height: 85vh;
	}
</style>
