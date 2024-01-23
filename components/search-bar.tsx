"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema, searchSchema } from "@/form-schemas";
import { Input } from "./ui/input";

const SearchBar = () => {
    const form = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema),
    });

    const onSubmit = (values: SearchSchema) => {
        console.log(values.searchTerm);
    };

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
