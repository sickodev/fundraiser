"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema, searchSchema } from "@/form-schemas";
import { Input } from "./ui/input";

const SearchBar = () => {
    const [mounted, setMounted] = useState(false);
    const form = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema),
    });

    const onSubmit = (values: SearchSchema) => {
        console.log(values.searchTerm);
    };

    useState(() => {
        setMounted(true);
    });

    if (!mounted) {
        return null;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
                <FormField
                    control={form.control}
                    name='searchTerm'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder='Search for a Cause...'
                                    className='border-purple-500 active:ring-1 active:ring-purple-400 outline-none hover:ring-1 hover:ring-purple-700'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default SearchBar;
