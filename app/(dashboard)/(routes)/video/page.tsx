"use client";

import * as z from "zod";
import Heading from "@/components/ui/heading";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/ui/empty";
import Loader from "@/components/ui/loader";
import { useProModal } from "@/hooks/usepromodal";
import toast from "react-hot-toast";

const VideoPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [video, setVideo] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);
            const response = await axios.post("/api/video", data);
            setVideo(response.data[0]);
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
                title="Video"
                description="The next step of AI generation is here."
                icon={Video}
                iconColor="text-emerald-500"
                bgcolor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A dog shepherding sheep in the countryside"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                <Loader />
                            </div>
                        )
                    }
                    {
                        !video && !isLoading && (
                            <Empty label="Try seeing new sceneries for yourself!" />
                        )
                    }
                    {video && (
                        <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>

                        </video>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;