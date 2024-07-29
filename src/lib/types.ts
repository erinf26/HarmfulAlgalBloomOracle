import { z } from "zod";

export const LakeSchema = z.object({
    name: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    id: z.coerce.number(),
    date: z.coerce.date()
});

export type LakeExported = z.infer<typeof LakeSchema>
