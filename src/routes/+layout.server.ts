import { getLakes } from "$lib/db_utils.server";
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
    const lakes = await getLakes();

    let simpleRasterDates: string[] = []
    for (const lake of lakes) {
        if (lake.expand?.spatialPredictions && lake.expand.spatialPredictions.length > 0) {
            simpleRasterDates = simpleRasterDates.concat(lake.expand.spatialPredictions.map(v => new Date(v.date).toLocaleDateString("en-CA")))
        }
    }

    // make dates unique
    simpleRasterDates = Array.from(new Set(simpleRasterDates));
    simpleRasterDates.sort();
    return {
        lakes,
        simpleRasterDates
    }
};
