"use client";
import React from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const PostCause = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='brandOutline' size='icon'>
                        <PlusIcon className='h-[1.2rem] w-[1.2rem]' />
                    </Button>
                </TooltipTrigger>
            </Tooltip>
        </TooltipProvider>
    );
};

export default PostCause;
