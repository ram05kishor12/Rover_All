"use client"
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

export const LandingNavBar = () => {
    const { isSignedIn } = useAuth();
    return (
        <nav className="p-4 bg-transparent flex items-center justify-between 
        "> 
           <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 mr-4">
                    <Image src="/logi.png" layout="fill " alt="logo" width={100} height={150}/>
                </div>
              <h1 className={cn("text-2xl font-bold text-blank", font.className)}>
                    Rover
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant = "default" className="rounded-full mt-2">
                        Get Started
                    </Button>
                </Link>
            </div>
                

        </nav>
    );
}

export default LandingNavBar;