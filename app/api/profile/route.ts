import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const user = await currentUser();
    if (!user) {
        redirectToSignIn();
    }
    const body = await request.json();
    try {
        const res = await prisma?.user.update({
            where: {
                email: user?.emailAddresses[0].emailAddress!,
            },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: user?.emailAddresses[0].emailAddress!,
                profileImageUrl: body.filepath,
                about: body.about,
                registered: body.registered,
            },
        });
        return NextResponse.json(res, {
            status: 200,
        });
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 500,
        });
    }
}
