"use client";
import React, { useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { PostSchema, postSchema } from "@/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

const PostCauseForm = () => {
    const [mounted, setMounted] = useState(false);

    const form = useForm<PostSchema>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            firstName: "Alan", // first name to come from auth or profile,
            lastName: "Hicke", // last name to come from auth or profile,
            organisation: "Org", // organisation to come from profile
            organisationWebsite: "www.example.com", // website to come from profile
            description: " ",
            accountHolderName: " ", // fills in with account number
            confirmed: false,
        },
    });

    async function onSubmit(values: PostSchema) {
        if (!values.confirmed) {
            alert("Please agree to the conditions");
        }
    }

    useState(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                <div className='flex space-x-2 w-full'>
                    <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>
                                    First Name{" "}
                                    <span className='text-red-500'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='lastName'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>
                                    Last Name{" "}
                                    <span className='text-red-500'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='organisation'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>
                                Organisation{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='organisationWebsite'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>
                                Organisation Website{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>
                                Description{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription className='flex items-center justify-between'>
                                Write a compelling description for your cause.
                                {field.value?.length < 50 ? (
                                    <div className='text-red-500'>
                                        <CrossCircledIcon className='w-[1.2rem] h-[1.2rem]' />
                                    </div>
                                ) : (
                                    <div className='text-green-500'>
                                        <CheckCircledIcon className='w-[1.2rem] h-[1.2rem]' />
                                    </div>
                                )}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='coverImage'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Cover Image{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='file'
                                    accept='image/jpeg, image/jpg, image/png, image/webp'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Upload an image to showcase your cause.{" "}
                                <span className='text-orange-500'>
                                    MAX FILE SIZE 5MB.
                                </span>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='socialUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Social Media URL{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='https://instagram.com/xxxxx'
                                />
                            </FormControl>
                            <FormDescription>
                                A place for contributors to contact with you.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='otherUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Other URL</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <hr />
                <h4 className='text-xl font-semibold'>
                    <span className='text-purple-600 underline'>Payment</span>{" "}
                    Information
                </h4>
                <hr />
                <FormField
                    control={form.control}
                    name='bankAccountNumber'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Bank Account Number{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <div className='flex space-x-1'>
                                <FormControl>
                                    <Input type='number' {...field} />
                                </FormControl>
                                <Button type='button' variant='outline'>
                                    Check
                                </Button>
                            </div>
                            <FormDescription>
                                The account for the contributions to go to.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='space-y-2'>
                    <Label>Branch</Label>
                    {/* Fills in with the values gotten after checking branch */}
                    <Input disabled value={"Branch"} />
                </div>

                <div className='space-y-2'>
                    <Label>IFSC Code</Label>
                    {/* Fills in with the values gotten after checking branch */}
                    <Input disabled value={"IFSC Code"} />
                </div>

                <FormField
                    control={form.control}
                    name='accountHolderName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Account Holder Name{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                The name of the account holder.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='confirmed'
                    render={({ field }) => (
                        <FormItem className='flex items-center px-2 py-4 rounded-lg border border-orange-500 mx-4 my-2 space-x-3 bg-secondary/30'>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div>
                                <FormLabel>
                                    I confirm all the data and details provided
                                    are true.
                                </FormLabel>
                                <FormDescription className=''>
                                    Any fraudulent information will result in
                                    cause getting cancelled and possible banning
                                    from the service.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <hr />
                <div className='flex space-x-2 justify-end'>
                    <Button type='submit' variant='outline'>
                        Next
                    </Button>
                    <Button type='reset' variant='shadOutline'>
                        Reset
                    </Button>
                    <Button type='button' variant='danger'>
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostCauseForm;
