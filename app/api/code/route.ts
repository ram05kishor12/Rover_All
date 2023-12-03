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
        { "role": "system", "content": "you are a code generator chatbot assistant u need to reply only for code related assistance" },
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
              {"role": "system", "content": "you are a code generator chatbot assistant u shoukd not rply for any other stuff except codes if they ask for that u can say sorry for the inconvenience im specifically designed for code generation u may try conversation page for regular chat"},
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