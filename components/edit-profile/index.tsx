"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, registerSchema } from "@/form-schemas";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Mandatory from "../mandatory";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import { supabase } from "@/lib/supabase";

const EditProfile = ({ profile }: { profile: User }) => {
    const [selectedFile, setSelectedFile] = useState<string | null>();
    const [uploadedFile, setUploadedFile] = useState<File>();

    const { toast } = useToast();

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            about: profile.about,
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

    async function onSubmit(values: RegisterSchema) {
        if (uploadedFile) {
            const fileName = `pfp-${profile.id}-${profile.email}`;
            const res = await supabase.storage
                .from("profile-pictures")
                .update(fileName, uploadedFile, {
                    cacheControl: "3600",
                    upsert: true,
                });
            if (res.error) {
                console.log(res.error);
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className='space-x-2' variant={"brandDefault"}>
                    <Pencil2Icon />
                    <p>Edit Account</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>
                        <span className='text-purple-600'>Edit</span> Profile
                    </DialogTitle>
                    <DialogDescription>
                        Edit your profile information.
                    </DialogDescription>
                </DialogHeader>
                <hr />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-2'
                    >
                        <div className='flex justify-between space-x-3'>
                            <FormField
                                control={form.control}
                                name='firstName'
                                render={({ field }) => (
                                    <FormItem className='sm:w-1/2'>
                                        <FormLabel>
                                            First Name
                                            <Mandatory />
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
                                    <FormItem className='sm:w-1/2'>
                                        <FormLabel>
                                            Last Name
                                            <Mandatory />
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
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                        <Mandatory />
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='items-center justify-between space-y-2'>
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
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription className='flex items-center justify-between'>
                                        The about should be maximum of 150
                                        characters.
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
                        <hr />
                        <div className='space-x-2'>
                            <Button variant='brandDefault'>Save</Button>
                            <Button variant='default' type='reset'>
                                Reset
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;
