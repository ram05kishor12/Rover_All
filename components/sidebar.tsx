"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { LayoutDashboard, MessageSquare, Bot, VideoIcon, MusicIcon, ImageIcon, Settings, Code, Mic } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Route {
    label: string;
    icon: React.ElementType;
    href: string;
    color: string;
}

const montserrat = Montserrat({
    weight: '600',
    subsets: ['latin'],
});

const routes: Route[] = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Code Generator",
        icon: Code,
        href: "/code",
        color: "text-gray-500",
    },
    {
        label: "Assistant",
        icon: Bot,
        href: "/assistant",
        color: "text-yellow-500",
    },
    {
        label: "Text-Voice Generator",
        icon: Mic,
        href: "/tts",
        color: "text-red-500",
    },
    {
        label: "Image Generator",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-500",
    },
    {
        label: "Video Generator",
        icon: VideoIcon,
        href: "/vedio",
        color: "text-orange-500",
    },
    {
        label: "Music Generator",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-white-500",
    }
];

const Sidebar = () => {
    const pathname = usePathname();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null); // Specify the type as string | null

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 border border-gray-100 text-black">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-8">
                    <div className="relative w-16 h-16 mr-4">
                        <Image src="/logi.png" alt="logo" layout="fill" />
                    </div>
                    <h1 className={cn('text-xl font-bold', montserrat.className)}>Rover</h1>
                </Link>
                <div className="space-y-2">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn(
                                'group flex items-center py-2 px-3 rounded-md transition duration-300 ease-in-out',
                                `bg-${hoveredLink === route.href || pathname === route.href ? 'bg-gray-800' : 'transparent'}`,
                                `text-${hoveredLink === route.href || pathname === route.href ? 'blue-400' : 'black'}`, // Changed 'white' to 'black'
                                'hover:bg-gray-800 hover:text-sky-400',
                            )}
                            onMouseEnter={() => setHoveredLink(route.href)}
                            onMouseLeave={() => setHoveredLink(null)} // Ensure null is passed here for the 'null' type in state
                        >
                            <route.icon className={cn('w-4 h-4 mr-3', route.color)} />
                            <span className="text-sm">{route.label}</span>
                            {pathname === route.href && (
                                <span className="ml-auto">
                                    <div className="w-1 h-6 bg-blue-400 rounded-r-lg" />
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
