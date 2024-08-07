import type { LatLngTuple } from 'leaflet';
import { writable } from 'svelte/store';

export const mapCoords = writable<LatLngTuple | undefined>();
export const selectedDateIndex = writable<number>(37); // YYYY-MM-DD formay
export const simpleRasterDates_filtered = writable<string[]>([]);