import { z } from "zod";
const MAX_FILE_SIZE = 5000000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const registerSchema = z.object({
    firstName: z.string().min(3, {
        message: "First Name must be atleast 3 characters",
    }),
    lastName: z.string().min(3, {
        message: "Last Name must be atleast 3 characters",
    }),
    about: z.string().max(150, {
        message: "About must be maximum 150 characters",
    }),
    email: z.string().email({
        message: "Not a valid email address",
    }),
    registered: z.boolean().default(false),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
