import { z } from "zod";

type StrictRecordModel = {
    id: string;
    created: string;
    updated: string;
    collectionId: string;
    collectionName: string;
}; // Same as pocketbase's record model, without the [key: string] : any

export const LakeSchema = z.object({
    name: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    lagoslakeid: z.coerce.number(),
    date: z.string() // pocketbase returns dates as strings
});

export type LakeExported = z.infer<typeof LakeSchema> & StrictRecordModel;
