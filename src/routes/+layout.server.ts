import { getLakes } from "$lib/db_utils.server";
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
    const lakes = await getLakes();

    return {
        lakes
    }
};
