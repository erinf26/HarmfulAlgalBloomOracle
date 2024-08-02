<script lang="ts">
	import { onMount } from 'svelte';
	import type { CircleMarker, ImageOverlay, LatLngBounds, LatLngTuple, Map, Marker } from 'leaflet';
	import { browser } from '$app/environment';
	import type { Lake, LakeExported } from '$lib/types';
	import 'leaflet/dist/leaflet.css';
	import { mapCoords, selectedDateIndex } from '$lib/store';
	import MapPopup from './MapPopup.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	export let lakes: LakeExported[];
	export let simpleRasterDates: string[];

	let mapElement: HTMLElement;
	let map: Map;

	const defaultViewCoords: LatLngTuple = [42.18778778, -79.42924043]; // LAKE CHAUTAUQUA coords

	let default_index = 0;
	let current_focused_lake_id: number | null = null; // unknown
	let current_date: Date | null = null; // unknown
	let visible_image_overlays: ImageOverlay[] = [];

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
				imageOverlay.on('click', () => {
					console.log('Map layer clicked!');
				});
				visible_image_overlays.push(imageOverlay);
			};

			const clearImageOverlays = () => {
				for (let imageOverlay of visible_image_overlays) {
					map.removeLayer(imageOverlay);
				}
				visible_image_overlays = [];
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

			map = leaflet.map(mapElement, { attributionControl: false }); // use canvas for better performance
			let myAttrControl = leaflet.control.attribution().addTo(map);
			myAttrControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
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
						props: {
							lakename: lake.name,
							lakeid: lake.lagoslakeid,
							insitudate: 'no date'
						} // i don't know if these props will update dynamically, warning for the future
					});
					return c;
				});
			}

			mapCoords.subscribe((updatedCoords) => {
				map.setView(updatedCoords || defaultViewCoords, 12);
			});

			selectedDateIndex.subscribe((changedDateIndex) => {
				clearImageOverlays();
				for (const lake of lakes) {
					if (!lake.expand || lake.expand.spatialPredictions.length == 0) {
						continue;
					}
					for (let spatialPrediction of lake.expand.spatialPredictions) {
						let spatialPredictionYYYYMMDD = spatialPrediction.date.slice(0, 10);
						if (spatialPredictionYYYYMMDD == simpleRasterDates[changedDateIndex]) {
							// if date passes the filter
							const image_url = `${PUBLIC_POCKETBASE_URL}/api/files/${spatialPrediction.collectionId}/${spatialPrediction.id}/${spatialPrediction.display_image}`;
							add_lake_overlay_to_map(
								image_url,
								leaflet.latLngBounds([
									[spatialPrediction.corner1latitude, spatialPrediction.corner1longitude],
									[spatialPrediction.corner2latitude, spatialPrediction.corner2longitude]
								]),
								lake.name
							);
						}
					}
				}
			});
		}
	});
</script>

<div class="map" bind:this={mapElement} />

<style>
	.map {
		height: 73vh;
		margin-bottom: 1rem;
	}
</style>
