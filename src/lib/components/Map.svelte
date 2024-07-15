<script lang="ts">
	import { onMount } from 'svelte';
	import type { Map } from 'leaflet';
	import { browser } from '$app/environment';
	import type { LakeExported } from '$lib/types';
	import 'leaflet/dist/leaflet.css';

	export let lakes: LakeExported[];

	let mapElement: HTMLElement;
	let map: Map;

	export function setMapView(latitude: number, longitude: number, zoom: number = 13) {
		if (map) {
			map.setView([latitude, longitude], zoom);
		}
	}

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet
				.map(mapElement, { preferCanvas: true }) // use canvas for better performance
				.setView([42.18778778, -79.42924043], 11); //// this sets the view for lake chautauqua
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
			let errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
			let altText =
				'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
			let latLngBounds = leaflet.latLngBounds([
				[42.10153949052764, -79.49915589630453],
				[42.25684191460839, -79.26562361083948]
			]);

			let imageOverlay = leaflet
				.imageOverlay(imageUrl, latLngBounds, {
					opacity: 0.8,
					errorOverlayUrl: errorOverlayUrl,
					alt: altText,
					interactive: true
				})
				.addTo(map);
		}
	});
</script>

<div class="map" bind:this={mapElement} />
<div id="search-results" class="search-results"></div>

<style>
	.map {
		height: 85vh;
	}
	.search-results {
		position: absolute;
		top: 70px;
		right: 10px;
		background: white;
		border: 1px solid #ccc;
		max-height: 300px;
		overflow-y: auto;
	}

	.search-result-item {
		padding: 0.5rem;
		cursor: pointer;
	}

	.search-result-item:hover {
		background: #f0f0f0;
	}
</style>
