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
        const { prompt, voice="alloy" } = body;

      

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        if(!body.prompt){
            return new NextResponse("Prompt is required", {status: 400});
        }
        if(!voice){
            return new NextResponse("Voice is required", {status: 400});
        }
        if(!process.env.OPENAI_API_KEY){
            return new NextResponse("API Key is corrupted", {status: 400});
        } 

        const response = await openai.audio.speech.create({
            model: "tts-1",
            input: prompt,
            voice: voice,

          });

          console.log("Here is the response: ", response)

          return NextResponse.json(response.url);
          // return NextResponse.json({})
    }catch (error) {
      
        console.log("[TTS]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}