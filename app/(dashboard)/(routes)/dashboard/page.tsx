"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, MessageSquare,Bot,ImageIcon,VideoIcon,Music,Code,Mic } from "lucide-react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";


const DashboardPage = () => {
  const router = useRouter();
  const tools = [{
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    bgColor: "bg-violet-500/10",
    color: "text-violet-500/90",
 },
 {
   label: "Code Generator",
    icon: Code,
    href: "/code",
    bgColor: "bg-gray-500/10",
    color: "text-gray-500/90",
 },
{
  label: "Text-Voice Generator",
   icon: Mic,
   href: "/tts",
   bgColor: "bg-red-500/10",
   color: "text-red-500/90",
},
{
  label: "Image Generator",
   icon: ImageIcon,
   href: "/image",
   color: "text-pink-500/90",
   bgColor: "bg-pink-700/10",
   
},
{
  label: "Video Generator",
   icon: VideoIcon,
   href: "/vedio",
   bgColor: "bg-violet-500/10",
   color: "text-violet-500/90",
},
{
  label: "Music Generator",
   icon: Music,
   href: "/music",
   bgColor: "bg-emerald-500/10",
   color: "text-emerald-500/90",
},
 
]

  return (
    <div>
      <div className="mb-1 space-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the Power of Rover
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with Rover - Experience the power of Rover
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-3">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('p-1 w-fit rounded-md', tool.color)} />
              </div>
              <div className="font-semisolid">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
