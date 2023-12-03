import { NextApiResponse, NextApiRequest } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { prompt, voice = "alloy" } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }
        if (!voice) {
            return res.status(400).json({ message: "Voice is required" });
        }
        if (!process.env.OPENAI_API_KEY) {
            return res.status(400).json({ message: "API Key is corrupted" });
        }

        const response = await openai.audio.speech.create({
            model: "tts-1",
            input: prompt,
            voice: voice,
        });

        console.log("Here is the response: ", response);

        return res.json({ url: response.url });
    } catch (error) {
        console.log("[TTS]", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}