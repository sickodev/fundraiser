import { z } from "zod";

export const searchSchema = z.object({
    searchTerm: z.string(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
