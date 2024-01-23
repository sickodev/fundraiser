import { z } from "zod";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const postSchema = z.object({
    firstName: z.string().min(3, {
        message: "First name should be minimum of 3 characters",
    }),
    lastName: z.string().min(3, {
        message: "Last name should be minimum of 3 characters",
    }),
    organisation: z.string().min(1, {
        message: "Organisation should be minimum of 1 character",
    }),
    organisationWebsite: z.string().url(),
    description: z.string().min(50, {
        message: "Description should be at least 50 characters",
    }),
    coverImage: z.instanceof(File).refine((file) => {
        return !file || file.size <= 1024 * 1024 * 5;
    }, "File size should be less than 5MB"),
    socialUrl: z.string().url(),
    otherUrl: z.string().url().optional(),
    //PAYMENT OPTIONS
    bankAccountNumber: z.coerce.number(),
    accountHolderName: z.string(),
    //CONFIRMATION
    confirmed: z.boolean(),
});

export type PostSchema = z.infer<typeof postSchema>;
