"use client";
import React from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

const PostCause = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' size='icon'>
                    <PlusIcon className='w-[1.2rem] h-[1.2rem]' />
                </Button>
            </DialogTrigger>
        </Dialog>
    );
};

export default PostCause;
