import pb from "./pocketbase.server";
import type { LakeExported } from "./types";

export async function addLakes(lakes: LakeExported[]) {

    for (const lake of lakes) {
        try {
            const record = await pb.collection('lakes').create(lake);
            console.log("Created record: ", record);
        } catch (e) {
            console.log(JSON.stringify(e))
        }

    }
}
export async function getLakes() {
    const lakes = await pb.collection('lakes').getFullList<LakeExported>({ expand: "spatialPredictions" });
    return lakes;
}