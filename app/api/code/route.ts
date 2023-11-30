import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

const instruction : ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments to explain",
  };
export  async function POST(
   req:Request,
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
            messages: [
              {
                role: "user",
                content : [instruction, ...message],
              },
            ],
            temperature: 0.9,
          });

          return NextResponse.json(response.choices[0]);
    }catch (error) {
        console.log("[CODE_ERROR]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}