import EditProfile from "@/components/edit-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getProfile } from "@/lib/get-profile";
import { supabase } from "@/lib/supabase";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { GearIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const ProfilePage = async () => {
    const profile = await getProfile();
    const { data } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(profile.profileImageUrl);
    return (
        <main className='p-1 space-y-1'>
            <div className='flex items-center space-x-1'>
                <GearIcon className='h-[2rem] w-[2rem]' />
                <h2 className='text-4xl font-bold text-purple-600 opacity-90'>
                    Settings<span className='text-primary'>.</span>
                </h2>
            </div>
            <hr />
            <div className='mx-2 py-2'>
                <h4 className='my-2 uppercase opacity-50 text-primary font-semibold text-sm'>
                    Profile Information
                </h4>
                <div className='flex space-x-2'>
                    <div className='sm:w-1/2 basis-1/2'>
                        <div>
                            <Label>First Name</Label>
                            <Input value={profile.firstName} disabled />
                        </div>
                        <div>
                            <Label>Last Name</Label>
                            <Input value={profile.lastName} disabled />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input value={profile.email} disabled />
                        </div>
                    </div>
                    <div className='basis-1/2 flex items-center justify-center'>
                        <Image
                            src={data.publicUrl}
                            alt={profile.firstName + " " + profile.lastName}
                            width={180}
                            height={180}
                            className='object-contain border rounded-full hover:opacity-70 transition-all duration-200 ease-out ring-1 hover:ring-purple-600'
                        />
                    </div>
                </div>
                <div>
                    <Label>About</Label>
                    <Textarea value={profile.about} disabled />
                </div>
                <div className='my-2 flex items-center justify-end space-x-3'>
                    <EditProfile profile={profile} />
                </div>
            </div>
            <hr />
            <div className='py-2 mx-2'>
                <h4 className='my-2 uppercase opacity-50 text-primary font-semibold text-sm'>
                    Account Settings
                </h4>
                <UserProfile />
            </div>
        </main>
    );
};

export default ProfilePage;
