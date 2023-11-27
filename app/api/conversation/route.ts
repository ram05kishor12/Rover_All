import {Configuration , OpenAIApi} from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: "https://api.openai.com/v1",
  });
  
const openai = new OpenAIApi(configuration);
  

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

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content : message,
              },
            ],
            temperature: 0.9,
          });

          return NextResponse.json(response.data.choices[0]);
    }catch (error) {
        console.log("[CONSERSATION]",error);
    }
}