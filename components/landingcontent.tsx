import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Code, Mic, ImageIcon, Music, Video, Bot } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon?: JSX.Element; // Define icon as optional
}

const features: Feature[] = [
  {
    title: "ChatBot",
    description: "Engage in seamless conversations and assist you in generating code effortlessly. From brainstorming to problem-solving, experience a new level of collaboration with your AI companion.",
    icon: <MessageSquare />,
  },
  {
    title: "Code Assistant",
    description: "Engage in seamless generation and assist you in generating code effortlessly. From brainstorming to problem-solving, experience a new level of collaboration with your AI companion.",
    icon: <Code />,
  },
  {
    title: "Text-to-Speech",
    description: "Transform text into lifelike speech with unparalleled accuracy and naturalness. Listen to your ideas come to life or communicate effortlessly with others through the power of voice.",
    icon: <Mic />,
  },
  {
    title: "Photo Generation",
    description: "Unleash your creativity with image generation capabilities. Generate stunning visuals, design concepts, or illustrations directly through intuitive interactions with Rover.",
    icon: <ImageIcon />,
  },
  {
    title: "Assistant",
    description: "Get help with your daily tasks & Summarzie uploaad files and much more.",
    icon: <Bot />,
  },
  
  // Add more features here if needed
];

const LandingContent: React.FC = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl font-bold text-black">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {features.map((item, index) => (
          <Card key={item.title} className="bg-slate-200 border-none text-black shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div>
                  <p className="text-lg">{item.title}</p>
                </div>
                {item.icon && <div className="ml-2">{item.icon}</div>}
              </CardTitle>
              <CardContent className="pt-4 px-0 text-zinc-500">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
