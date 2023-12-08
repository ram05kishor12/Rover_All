// pages/api/tts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function ttsHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Handle the POST method logic here
        const { prompt, voice } = req.body;
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        try {
            const response = await openai.audio.speech.create({
                model: 'tts-1',
                voice,
                input: prompt,
            });
            const blob = new Blob([await response.arrayBuffer()], { type: 'audio/mpeg' });
            const url = URL.createObjectURL(blob);
            return res.status(200).json({ url }); // Return the generated speech URL
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' }); // Handle error and return an object with a proper URL field
        }
    } else {
        res.status(405).end(); // Method Not Allowed for other methods
    }
}

export async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle the GET method logic here
        // Example: Return a message for GET requests
        return res.status(200).json({ message: 'GET request received' });
    } else {
        res.status(405).end(); // Method Not Allowed for other methods
    }
}
