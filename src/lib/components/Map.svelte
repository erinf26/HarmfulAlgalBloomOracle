<script lang="ts">
	import { onMount } from 'svelte';
	import type { CircleMarker, LatLngBounds, LatLngTuple, Map, Marker } from 'leaflet';
	import { browser } from '$app/environment';
	import type { LakeExported } from '$lib/types';
	import 'leaflet/dist/leaflet.css';
	import { mapCoords } from '$lib/store';
	import MapPopup from './MapPopup.svelte';

	export let lakes: LakeExported[];

	let mapElement: HTMLElement;
	let map: Map;

	const defaultViewCoords: LatLngTuple = [42.18778778, -79.42924043]; // LAKE CHAUTAUQUA coords

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

			// Create a popup with a Svelte component inside it and handle removal when the popup is torn down.
			// `createFn` will be called whenever the popup is being created, and should create and return the component.
			// Credit: https://svelte.dev/repl/62271e8fda854e828f26d75625286bc3?version=4.2.18
			function bindPopup(marker: Marker | CircleMarker, createFn: (arg0: HTMLElement) => MapPopup) {
				let popupComponent: MapPopup | null;
				marker.bindPopup(() => {
					let container = leaflet.DomUtil.create('div');
					popupComponent = createFn(container);
					return container;
				});

				marker.on('popupclose', () => {
					if (popupComponent) {
						let old = popupComponent;
						popupComponent = null;
						// Wait to destroy until after the fadeout completes.
						setTimeout(() => {
							old.$destroy();
						}, 500);
					}
				});
			}

			map = leaflet.map(mapElement, { preferCanvas: true }); // use canvas for better performance
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
							radius: 8,
							fillOpacity: 1,
							fillColor: '#fff42c',
							color: 'black'
						}
					)
					.addTo(map)
					.addEventListener('click', (e) => {
						console.log('Marker clicked: ', lake);
					});

				bindPopup(marker, (container) => {
					let c = new MapPopup({
						target: container,
						props: {} // i don't know if these props will update dynamically, warning for the future
					});
					return c;
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

			add_lake_overlay_to_map(
				'/ProspectPark.png',
				leaflet.latLngBounds([
					[40.66159279351088, -73.97173695219149],
					[40.65287811817147, -73.96430067526515]
				]),
				'Prospect Park'
			);
			add_lake_overlay_to_map(
				'/Saratoga.png',
				leaflet.latLngBounds([
					[43.04679028743946, -73.76569912915973],
					[42.98589557550428, -73.7146666011909]
				]),
				'Saratoga'
			);

			mapCoords.subscribe((updatedCoords) => {
				map.setView(updatedCoords || defaultViewCoords, 12);
			});
		}
	});
</script>

<div class="map" bind:this={mapElement} />

<style>
	.map {
		height: 85vh;
	}
</style>
