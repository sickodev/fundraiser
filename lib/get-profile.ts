import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "./db";

export const getProfile = async () => {
    const user = await currentUser();
    if (!user) {
        redirectToSignIn();
    }

    const profile = await prisma?.user.findUnique({
        where: {
            email: user?.emailAddresses[0].emailAddress!,
        },
    });

    if (!profile) {
        redirect("/");
    }

    return profile;
};
