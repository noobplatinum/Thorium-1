"use client";

import * as z from "zod";
import Heading from "@/components/ui/heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChatCompletionMessageParam, CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";
import Empty from "@/components/ui/empty";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import User_Avatar from "@/components/ui/user_avatar";
import Bot_Avatar from "@/components/ui/bot_avatar";
import toast from "react-hot-toast";
import { useProModal } from "@/hooks/usepromodal";

const CodePage = () => {
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
    const proModal = useProModal();
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: data.prompt
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", {
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
        } 
        finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Code"
                description="For any of your programming needs"
                icon={Code}
                iconColor="text-yellow-600"
                bgcolor="bg-yellow-600/10"
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
                                                placeholder="A C program to print a diamond with size n"
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
                                        : <ReactMarkdown components={{
                                            pre: ({node, ...props}) => (
                                                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                    <pre {...props}/>
                                                </div>
                                            ),
                                            code: ({ node, ...props}) => (
                                                <code className="bg-black/10 rounded-lg p-1" {...props} />
                                            )
                                        }}
                                            className="text-sm overflow-hidden leading-7">{message.content || ""}</ReactMarkdown>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodePage;