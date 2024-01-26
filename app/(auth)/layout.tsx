import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex items-center justify-evenly h-screen space-x-3'>
            <div className='relative w-1/2 h-full hidden md:block group transition-all duration-200 ease-in'>
                <div className='absolute w-full h-8 bg-black -bottom-8 hidden z-20 p-2 text-center group-hover:-translate-y-8 group-hover:block'>
                    <p>Picture by Austin Kehmeier from Unsplash.com</p>
                </div>
                <div className='absolute w-full h-full z-10 bg-primary-foreground filter blur-[100px] drop-shadow-md hidden group-hover:block opacity-35  transition-all duration-200 ease-in'></div>
                <Image
                    src={
                        "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt=''
                    fill
                />
            </div>
            {children}
        </div>
    );
};

export default AuthLayout;
