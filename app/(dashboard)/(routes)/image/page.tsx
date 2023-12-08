"use client";
import { Heading } from "@/components/Heading";
import { ImageIcon } from "lucide-react";
import { set, useForm } from "react-hook-form";
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
import ChatComponent from "@/components/ChatComponent";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/ui/bot-avatar";
import { Select, SelectTrigger, SelectValue, SelectItem,SelectContent } from "@/components/ui/select";
import { amountOptions, resolutionOptions } from "./constants";
import { Card, CardFooter } from "@/components/ui/card";
import  Image  from "next/image";

import next from "next";
const ImagePage = () => {
    const [images, setImages] = useState<string[]>([]);
    const [model, setModel] = useState<string>("dalle2");
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "256x256",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            if (model === "dalle2") {
                const response = await axios.post("./api/image", values); // Call for DALL·E 2 model
                const urls = response.data.map((image: { url: string }) => image.url);
                setImages(urls);
            } else if (model === "dalle3") {
                if (values.resolution != "1024x1024") {
                    alert("DALL·E 3 only processes images at 1024x1024 resolution.");
                    return; // Stop execution if resolution is not 1024x1024
                }
                const response = await axios.post("./api/iage", values); // Call for DALL·E 3 model
                const urls = response.data.map((image: { url: string }) => image.url);
                setImages(urls);

            }
            form.reset();
            
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };
    const handleModelSwitch = (selectedModel: string) => {
        setModel(selectedModel);
        setImages([]); // Reset images when switching models
        form.reset(); // Reset form values when switching models
    };

    return (
        <div>
            
            <Heading
                title="Image Generator"
                description="Turn your text into an image"
                icon={ImageIcon}
                iconColor="text-pink-600"
                bgColor="bg-pink-800/10"
            />
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={() => handleModelSwitch("dalle2")}
                    className={`${
                        model === "dalle2" ? "bg-black text-white" : "bg-gray-300 text-gray-700"
                    } px-4 py-2 rounded-md`}
                >
                    DALL·E 2
                </button>
                <button
                    onClick={() => handleModelSwitch("dalle3")}
                    className={`${
                        model === "dalle3" ? "bg-black text-white" : "bg-gray-300 text-gray-700"
                    } px-4 py-2 rounded-md`}
                >
                    DALL·E 3
                </button>
            </div>

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
                                                className="outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent  w-full bg-transparent  onClick:outline-hidden onClick:ring-transparent font-medium text-md border-1 border-gray-300 shadow-md mt-0"
                                                disabled={isLoading}
                                                placeholder="Enter your prompt"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-1 mt-3">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
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
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-1 mt-3">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
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
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-5 lg:col-start-12 mt-3" disabled={isLoading}>
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
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images yet" />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src,index) => (
                            <Card
                                key={index}
                                className="rounded-lg overflow-hidden shadow-md"
                            >
                                <div className="relative ascpect-square">
                                   <Image
                                        unoptimized
                                        height={512}
                                        width={512}
                                        alt="generated image"
                                      src={src}
                                />
                                </div>
                                <CardFooter className="p-2"> 
                                   <Button onClick={()=> window.open(String(src))} variant="secondary" className="w-full">
                                      Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ImagePage;
