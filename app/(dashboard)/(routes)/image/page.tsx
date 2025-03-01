"use client";

import * as z from "zod";
import Heading from "@/components/ui/heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/ui/empty";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/usepromodal";
import toast from "react-hot-toast";

const ImagePage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
        const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post("/api/image", data);
            const urls = response.data.map((image: { url: string }) => image.url);
            setImages(urls);
            form.reset();

        } catch (error: any) {
            if(error?.response?.status === 403)
            {
                proModal.onOpen();
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Image"
                description="Visualize your thoughts"
                icon={ImageIcon}
                iconColor="text-red-600"
                bgcolor="bg-red-600/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A deep blue, four winged dragon with a bladed tail"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}/>
                            <FormField
                            control={form.control}
                            name="resolution"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}/>
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className="p-20">
                                <Loader />
                            </div>
                        )
                    }
                    {
                        images.length === 0 && !isLoading && (
                            <Empty label="Tell us something you wanna see!" />
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) =>(
                            <Card
                            key={src}
                            className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image alt="Image"
                                    fill
                                    src={src}/>
                                </div>
                                <CardFooter className="p-2">
                                    <Button 
                                    onClick={() =>window.open(src)}
                                    variant="secondary" className="w-full">
                                        <Download className="h-4 w-4 mr-2">
                                            Download
                                        </Download>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;