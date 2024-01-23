"use client";
import React, { useEffect, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { redirect, useRouter } from "next/navigation";

const PostCause = () => {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    function onClick() {
        router.push("/post-cause");
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button onClick={onClick} variant='outline' size='icon'>
                        <PlusIcon className='w-[1.2rem] h-[1.2rem]' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-secondary text-primary'>
                    <p>Post a Cause</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default PostCause;
