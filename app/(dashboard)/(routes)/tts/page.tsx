"use client"
import { Heading } from "@/components/Heading";
import { Mic } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/loader";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Empty } from "@/components/empty";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { voice } from "./constants";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const TtsPage = () => {
    const [input, setInput] = useState("");
    const [generatedAudio, setGeneratedAudio] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            voice: "alloy",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/tts", {
                prompt: values.prompt,
                voice: values.voice,
            });
            if (response.data && response.data.url) {
                setGeneratedAudio(response.data.url);
                setInput('');
            }
        } catch (error: any) {
            console.log(error);
        }
    };


    return (
        <div>
            <Heading
                title="TTS"
                description="Turn your text into an speech"
                icon={Mic}
                iconColor="text-red-600"
                bgColor="bg-red-6s00/10"
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
                                name="voice"
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
                                                {voice.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="col-span-12 lg:col-span-6 lg:col-start-11 mt-3" disabled={isLoading}>
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
                    {!generatedAudio && !isLoading && (
                        <Empty label="No audio yet" />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                {generatedAudio && (
                    <div>
                        <audio controls>
                            <source src={generatedAudio} type="audio/mp3" />
                        </audio>
                        <a href={generatedAudio} download="generated_audio.mp3">Download</a>
                    </div>
                )}
            </div>
                </div>
            </div>

        </div>
    )
}
export default TtsPage;
