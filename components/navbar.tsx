import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import SearchBar from "./search-bar";
import PostCause from "./post-cause";

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between px-2 py-1 shadow-md'>
            <Link href={"/home"} className='text-xl font-bold text-purple-600'>
                Causes<span className='text-primary'>.org</span>{" "}
            </Link>
            <div className='md:w-2/3'>
                <SearchBar />
            </div>
            <div className='flex items-center justify-between space-x-1'>
                <ModeToggle />
                {/* User Button */}
                <PostCause />
            </div>
        </nav>
    );
};

export default Navbar;
