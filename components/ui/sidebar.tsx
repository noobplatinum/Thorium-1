"use client";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { ImageIcon, LayoutDashboard, MessageSquare, VideoIcon, Music, Code, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import FreeCounter from "./freecounter";

const poppins = Poppins({weight : "600", subsets: ["latin"]});
const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-cyan-500"
    },
    {
        label: "Chat",
        icon: MessageSquare,
        href: "/chat",
        color: "text-indigo-500"
    },
    {
        label: "Image",
        icon: ImageIcon,
        href: "/image",
        color: "text-red-400"
    },
    {
        label: "Video",
        icon: VideoIcon,
        href: "/video",
        color: "text-emerald-500"
    },
    {
        label: "Audio",
        icon: Music,
        href: "/music",
        color: "text-orange-500"
    },
    {
        label: "Code",
        icon: Code,
        href: "/code",
        color: "text-yellow-500"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-gray-300"
    }
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ apiLimitCount = 0, isPro = false }) => {
    const pathname = usePathname();
    return (
      <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
        <div className="px-3 py-2 flex-1">
          <Link href="/dashboard" className="flex items-center pl-3 mb-14">
            <div className="relative w-12 h-12 mr-4">
              <Image
                fill
                alt="Logo"
                src="/logo.png"
              />
            </div>
            <h1 className={cn("text-2xl font-bold", poppins.className)}>Thorium - 1</h1>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link href={route.href} key={route.href}
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? "bg-white/10 text-white" : "text-zinc-300"
                )}>
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  <span>{route.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro}/>
      </div>
    );
}

export default Sidebar;