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
        const { message } = body;

      console.log("here is the message: ", [
        { "role": "system", "content": "you are a regular chatbot assistant" },
        ...message
      ],)

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
              {"role": "system", "content": "you are a regular chatbot assistant"},
              ...message
            ],
            temperature: 0.9,
          });

          console.log("Here is the response: ", response)

          return NextResponse.json(response.choices[0]);
          // return NextResponse.json({})
    }catch (error) {
        console.log("[CONSERSATION]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}