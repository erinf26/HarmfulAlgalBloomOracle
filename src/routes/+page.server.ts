import { PATH_TO_LAKES_CSV } from "$env/static/private";
import { LakeSchema, type LakeExported } from "$lib/types";
import type { PageServerLoad } from './$types';
import fs from "fs/promises";

const KEEP_TO_RENAME: Record<string, string> = { 'site': 'name', 'MEAN_lat': 'latitude', 'MEAN_long': 'longitude' }
const COLS_TO_KEEP = Object.keys(KEEP_TO_RENAME);

export const load: PageServerLoad = async ({ params }) => {
    console.log("PATH_TO_LAKES_CSV: ", PATH_TO_LAKES_CSV);
    const lakes_csv = String(await fs.readFile(PATH_TO_LAKES_CSV));
    const lines = lakes_csv.trim().split("\n");

    const keys = lines[0].split(",");
    const lakes_converted = lines.slice(1).map(v => v.split(","));

    const lakes_as_dicts: LakeExported[] = [];
    for (const lake of lakes_converted) {
        const lake_to_push: Record<string, string> = {};
        for (let col = 0; col < keys.length; col++) {
            if (COLS_TO_KEEP.includes(keys[col])) {
                const new_key = KEEP_TO_RENAME[keys[col]];
                lake_to_push[new_key] = lake[col];
            }
        }
        const lake_to_push_verified = LakeSchema.parse(lake_to_push);
        lakes_as_dicts.push(lake_to_push_verified as LakeExported);
    }


    return {
        lakes: lakes_as_dicts as LakeExported[]
    }
};