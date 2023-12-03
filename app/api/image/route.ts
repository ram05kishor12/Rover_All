import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

export  async function POST(
   req:Request,
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount =1 ,resolution="512x512" } = body;

      

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        if(!prompt){
            return new NextResponse("Prompt is required", {status: 400});
        }
        if(!amount){
            return new NextResponse("Amount is required", {status: 400});
        }
        if(!resolution){
            return new NextResponse("Resolution is required", {status: 400});
        }
        if(!process.env.OPENAI_API_KEY){
            return new NextResponse("API Key is corrupted", {status: 400});
        } 

        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: parseInt(amount),
            size: resolution,
          });

          console.log("Here is the response: ", response)

          return NextResponse.json(response.data);
          // return NextResponse.json({})
    }catch (error) {

        console.log("[TTS]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}