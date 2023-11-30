
"use client";
import { Heading } from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/loader";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import OpenAi from "openai";
import { Empty } from "@/components/empty";
import  ChatComponent from "@/components/ChatComponent";
import { cn } from "@/lib/utils";

const ConversationPage = () => { 
    
    const [message, setMessage] = useState<OpenAi.ChatCompletionMessage[]>([]);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
          const userMessage :OpenAi.ChatCompletionMessageParam[]= [{
            role : "user",
            content : values.prompt,
          }];
          const newMessage = [...message, userMessage];

          const response = await axios.post("./api/conversation",{
            message : newMessage,
          });
          setMessage((current) => [...current, userMessage , response.data]);
          form.reset();
        }catch(error:any){
            console.log(error);
        }finally{
            router.refresh();
        }
    };
    return (
        <div>
            <Heading
                title="Conversation"
                description="Our Conversation Model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
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
                </div>
                <div className="mt-4">
                </div>
                <div className="space-y-4 mt-4 font-bold">
                 {isLoading && (
                      <div className="p-8 rounded-lg w-full flex items-center justify-center bg-sky-100">
                        <Loader />
                        </div>
                    )}
                    { message.length === 0 && !isLoading && (
                        <Empty label = "No messages yet" />
                        )}
                 <div className="flex flex-col gap-y-4">
                    {message.map((message) => (
                        <div
                          key={message.content}
                          className={cn("p-8 w-full flex items-center gap-x-8 rounded-lg",
                          message.role === "assistant" ? "bg-muted":"bg-white border border-black/10"
                        )}
                        >
                            {message.content}
                        </div>
                    ))}
                </div>
            </div>
            </div>
           
        </div>
    )  
}
export default ConversationPage;
