import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import prisma from "@/lib/db";

const initialProfile = async () => {
    const user = await currentUser();
    if (!user) {
        redirectToSignIn();
    }

    const profile = await prisma?.user.findUnique({
        where: {
            email: user?.emailAddresses[0].emailAddress,
        },
    });

    if (profile) {
        return profile;
    }

    const newProfile = await prisma.user.create({
        data: {
            firstName: user?.firstName!,
            lastName: user?.lastName!,
            about: "",
            profileImageUrl: "",
            email: user?.emailAddresses[0].emailAddress!,
        },
    });
    return newProfile;
};

export default initialProfile;
