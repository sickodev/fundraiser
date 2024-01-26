import { getProfile } from "@/lib/get-profile";

export default async function HomePage() {
    const profile = await getProfile();
    return <main>Hello</main>;
}
