import type { LatLngTuple } from 'leaflet';
import { writable } from 'svelte/store';

export const mapCoords = writable<LatLngTuple | undefined>();