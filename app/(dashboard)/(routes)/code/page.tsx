"use client";
import { Heading } from "@/components/Heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/loader";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import OpenAi from "openai";
import { Empty } from "@/components/empty";
import ChatComponent from "@/components/ChatComponent";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/ui/bot-avatar";
import ReactMarkdown from "react-markdown";

const CodePage = () => {
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<OpenAi.ChatCompletionMessage[]>([]);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: OpenAi.ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            };
            const newMessage = [...message, userMessage];

            const response = await axios.post("./api/conversation", {
                message: newMessage,
            });

            setMessage((current) => [...current, userMessage, response.data.message]);
            scrollToBottom();
            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    const scrollToBottom = () => {
        messageContainerRef.current?.scrollTo({
            behavior: "smooth",
            top: messageContainerRef.current?.scrollHeight,
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [message]);

    return (
        <div>
            <Heading
                title="Code Generator"
                description="Our Code Generations Model"
                icon={Code}
                iconColor="text-gray-500"
                bgColor="bg-gray-500/10"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-9">
                                    <FormControl className="m-0 p-5">
                                        <Input
                                            {...field}
                                            className="outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent  w-full bg-transparent  onClick:outline-hidden onClick:ring-transparent font-medium text-md border-1 border-gray-300 shadow-md"
                                            disabled={isLoading}
                                            placeholder="Enter your prompt"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-3 lg:col-start-10 mt-3" disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 ">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-sky-100">
                            <Loader />
                        </div>
                    )}
                    {message.length === 0 && !isLoading && <Empty label="No messages yet" />}
                    <div
                        ref={messageContainerRef}
                        className="overflow-y-auto max-h-96 w-full space-y-5 p-2"
                        style={{ scrollBehavior: "smooth", scrollSnapType: "y mandatory", scrollbarWidth:"none" }}
                    >
                        {message.map((msg) => (
                            <div
                                key={msg.content}
                                className={cn(
                                    "p-8 w-full flex items-center gap-x-8 rounded-lg",
                                    msg.role === "assistant"
                                        ? "bg-slate-200 text-black shadow-lg"
                                        : "bg-[#edf4fc] text-black"
                                )}
                            >
                                {msg.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                                <p className="text-sm">
                                    <ReactMarkdown
                                        components={{
                                            pre: ({ node, ...props }) => (
                                                <div className="overflow-auto w-full my-2 bg-black rounded-lg p-2 text-white">
                                                    <pre {...props} />
                                                </div>
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code className="bg-black rounded-lg p-1 text-white " {...props} />
                                            ),
                                        }}
                                        className="text-sm overflow-hidden leading-7"
                                    >
                                        {msg.content || ""}
                                    </ReactMarkdown>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodePage;
