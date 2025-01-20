"use client";

import * as z from "zod";
import Heading from "@/components/ui/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam, CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";
import Empty from "@/components/ui/empty";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import User_Avatar from "@/components/ui/user_avatar";
import Bot_Avatar from "@/components/ui/bot_avatar";
import { useProModal } from "@/hooks/usepromodal";
import toast from "react-hot-toast";

const ChatPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: data.prompt
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/chat", {
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();

        } catch (error: any) {
            if(error?.response?.status === 403)
            {
                proModal.onOpen();
            } else {
                toast.error("An error occurred. Please try again later.");
            }
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Chat"
                description="Have a conversation with Thorium-1"
                icon={MessageSquare}
                iconColor="text-indigo-500"
                bgcolor="bg-indigo-500/10"
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
                                                placeholder="What is the 6th planet of the solar system?"
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
                        messages.length === 0 && !isLoading && (
                            <Empty label="Try asking something!" />
                        )
                    }
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                                )}
                            >
                                {message.role === "user" ? (
                                    <User_Avatar />
                                ) : (
                                    <Bot_Avatar />
                                )}
                                <div>
                                    {Array.isArray(message.content)
                                        ? message.content.map((part, partIndex) => {
                                            if ("text" in part) {
                                                return <span key={partIndex}>{part.text}</span>;
                                            } else {
                                                return null;
                                            }
                                        })
                                        : message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;