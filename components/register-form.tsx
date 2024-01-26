"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, registerSchema } from "@/form-schemas";
import Mandatory from "./mandatory";
import { Input } from "./ui/input";
import { User } from "@prisma/client";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterForm = ({ user }: { user: User }) => {
    // TOAST
    const { toast } = useToast();

    // ROUTER
    const router = useRouter();

    // IMAGE UPLOADS
    const [selectedFile, setSelectedFile] = useState<string | null>();
    const [uploadedFile, setUploadedFile] = useState<File>();

    // FORMS
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            about: user.about,
        },
    });

    const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (file.size > 2_097_152) {
                toast({
                    title: "Image size limit exceeded",
                    description: "Upload an image that is less than 2MB.",
                    variant: "destructive",
                });
                return;
            }
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: RegisterSchema) => {
        if (!uploadedFile) {
            toast({
                title: "Upload your Profile Picture",
                variant: "destructive",
            });
            return;
        }
        if (!values.registered) {
            toast({
                title: "Accept Conditions to Continue",
                variant: "destructive",
            });
            return;
        }

        const fileName = `${user.id}-${user.email}`;
        const { data, error } = await supabase.storage
            .from("profile-pictures")
            .upload(fileName, uploadedFile, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            toast({
                title: `Image Upload Failed ${error.name}`,
                description: error.message + error.cause,
                variant: "destructive",
            });
            return;
        }

        const filepath = data?.path;
        const body = { ...values, filepath };

        try {
            await axios.post("/api/profile", body);
            toast({
                title: "Created Profile Successfully",
                description: "Redirecting you to home page...",
            });
            router.push("/home");
        } catch (error: any) {
            toast({
                title: error.code,
                description: error.message,
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2 p-2'
                autoComplete='off'
            >
                <div className='sm:flex sm:space-x-3 xs:space-y-2'>
                    <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                            <FormItem className='sm:w-1/2'>
                                <FormLabel>
                                    First Name(s)
                                    <Mandatory />
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='lastName'
                        render={({ field }) => (
                            <FormItem className='sm:w-1/2'>
                                <FormLabel>
                                    Last Name
                                    <Mandatory />
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='items-center justify-between space-y-2'>
                    <div className='space-y-2'>
                        <FormLabel>Email</FormLabel>
                        <Input value={user.email} disabled />
                    </div>
                    <div className='space-y-2'>
                        <FormLabel htmlFor='picture'>
                            Profile Photo
                            <Mandatory />
                        </FormLabel>
                        <Input
                            id='picture'
                            type='file'
                            accept='.jpg, .png, .jpeg'
                            onChange={handleImageInput}
                        />
                        {selectedFile && (
                            <div className='mt-2 border w-1/5 p-2 flex items-center justify-center border-dashed rounded-lg'>
                                <Image
                                    src={selectedFile}
                                    alt='Preview'
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name='about'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>About</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Volunteered for Red Cross Society, Help In India...Write something about yourself.'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className='flex items-center justify-between'>
                                The about should be maximum of 150 characters.
                                <span
                                    className={`${
                                        field.value.length > 150 &&
                                        "text-red-500"
                                    }`}
                                >
                                    {field.value.length}/150
                                </span>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='registered'
                    render={({ field }) => (
                        <FormItem className='flex items-center space-x-3 p-2 border border-purple-700 rounded-lg'>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div>
                                <FormLabel>
                                    Please accept all the terms and conditions
                                    and sign the declaration
                                </FormLabel>
                                <FormDescription>
                                    The terms and conditons are an essential
                                    element of the application.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                <div className='flex justify-end space-x-2'>
                    <Button variant='brandDefault'>Next</Button>
                    <Button type='reset'>Reset</Button>
                </div>
            </form>
        </Form>
    );
};

export default RegisterForm;
