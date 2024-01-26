import RegisterForm from "@/components/register-form";
import initialProfile from "@/lib/initial-profile";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const Register = async () => {
    const profile: User = await initialProfile();
    if (profile.registered) {
        redirect("/home");
    }
    return (
        <main className='p-1 md:w-2/3'>
            <div className=''>
                <h3 className='text-2xl font-bold text-purple-600'>
                    Register.
                </h3>
                <p className='opacity-60 '>
                    Complete your profile to start contributing to Causes.
                </p>
            </div>
            <hr />
            <RegisterForm user={profile} />
        </main>
    );
};

export default Register;
