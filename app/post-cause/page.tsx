import PostCauseForm from "@/components/post-cause-form";
import React from "react";

const PostCausePage = () => {
    return (
        <main className='p-1 space-y-1'>
            <h2 className='text-3xl font-bold'>
                Post a <span className='text-purple-600 underline'>Cause</span>
            </h2>
            <p className='opacity-60'>
                Post a cause to gain help from individual contributors and
                organisations.
            </p>
            <hr />
            <div className='my-2 px-2 border py-1'>
                <PostCauseForm />
            </div>
        </main>
    );
};

export default PostCausePage;
