"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createPlacement } from "@/actions/placement";

const formSchema = z.object({
    company_name: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    package: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Package must be a positive number.",
        }),
    student_count: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Student count must be a positive number.",
        }),
});

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company_name: "",
            package: "",
            student_count: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const response = await createPlacement(values);
            if (!response) {
                throw new Error("Failed to add record");
            }
            toast.success("Record added successfully");
            form.reset();
        } catch (error) {
            console.error("Error adding record:", error);
            toast.error("Failed to add record");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Add New Placement Record</CardTitle>
                    <CardDescription>
                        Enter the details of the new placement record.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="student_count"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Student Count</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="100"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the number of students placed.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="company_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Infosys"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the name of the company
                                            offering placement.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="package"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Package (LPA)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="3.5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the package offered in Lakhs
                                            Per Annum (LPA).
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Adding..." : "Add Record"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
