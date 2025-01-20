"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, MessageSquare, ImageIcon, VideoIcon, Music, Code } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
    {
        label: "Chat",
        icon: MessageSquare,
        href: "/chat",
        bgcolor: "bg-indigo-500/10",
        color: "text-indigo-500"
    },
    {
        label: "Image",
        icon: ImageIcon,
        href: "/image",
        color: "text-red-400",
        bgcolor: "bg-red-400/10"
    },
    {
        label: "Video",
        icon: VideoIcon,
        href: "/video",
        color: "text-emerald-500",
        bgcolor: "bg-emerald-500/10"
    },
    {
        label: "Audio",
        icon: Music,
        href: "/music",
        color: "text-orange-500",
        bgcolor: "bg-orange-500/10"
    },
    {
        label: "Code",
        icon: Code,
        href: "/code",
        color: "text-yellow-500",
        bgcolor: "bg-yellow-500/10"
    }
];

const DashboardPage = () => {
    const router = useRouter();
    return (
        <div>
        <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl italic text-center">
                For Your Everyday Curiosities
            </h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                From simple questions to illustrations and melodies - Open your imaginations
            </p>
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4" >
            {tools.map((tool) => (
                <Card
                onClick={() => router.push(tool.href)}
                key={tool.href} 
                className="p-4 border-black/5 flex 
                items-center justify-between 
                hover:shadow-md transition 
                cursor-pointer">
                    <div className="flex items-center gap-x-4">
                        <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                            <tool.icon className={cn("w-8 h-8", tool.color)}/>
                        </div>
                        <div className="font-semibold">
                            {tool.label}
                        </div>
                    </div>
                    <ArrowRight className="w-6 h-6"/>
                </Card>
            ))}
        </div>
        </div>
    );
}

export default DashboardPage;