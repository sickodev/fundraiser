import Navbar from "@/components/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='space-y-1'>
            <Navbar />
            {children}
        </div>
    );
};

export default HomeLayout;
