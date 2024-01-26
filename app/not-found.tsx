"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
    const [time, setTime] = useState(5);
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1);
        }, 1000);

        if (time < 0) {
            setTime(0);
            router.push("/home");
        }
    }, [time, router]);
    return (
        <main className='h-screen flex flex-col items-center justify-center space-y-3'>
            <div className='flex items-center space-x-3'>
                <h1 className='text-6xl'>404</h1>
                <div className='border h-16'></div>
                <div>
                    <p>Seems like you are lost!!</p>
                    <p className='opacity-60 font-semibold'>
                        Let&apos;s take you back home.
                    </p>
                </div>
            </div>
            <div className='text-xl font-semibold opacity-45'>
                <h4>Taking you back home in: {time}.</h4>
            </div>
        </main>
    );
};

export default NotFoundPage;
