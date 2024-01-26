import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import { GearIcon } from "@radix-ui/react-icons";

const SettingsButton = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={"/settings"}
                        className='border p-2 rounded-lg border-purple-600'
                    >
                        <GearIcon className='h-[1.2rem] w-[1.2rem]' />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Settings</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SettingsButton;
