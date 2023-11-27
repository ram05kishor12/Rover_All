import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

export default async function POST(
    req: Request,
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { message } = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        if(!message){
            return new NextResponse("Message is required", {status: 400});
        }
        if(!process.env.OPENAI_API_KEY){
            return new NextResponse("API Key is corrupted", {status: 400});
        } 

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [message],
            response_format: { type: "json_object"},
          });

          return NextResponse.json(response.choices[0].message.content);
    }catch (error) {
        console.log("[CONSERSATION]",error);
    }
}