"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logoPath from "@/public/logo.png";

const font = Poppins({ weight: "500", subsets: ["latin"] });

const LandingNavbar = () => {
    const { isSignedIn } = useAuth();
    return ( 
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-2 sm:mr-4">
                    <Image 
                    fill
                    alt="Logo"
                    src={logoPath}/>
                </div>
                <h1 className={cn("text-lg sm:text-2xl font-bold text-white", font.className)}>
                    Thorium-1
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/signup"}>
                    <Button variant="outline" className="rounded-full text-sm sm:text-base">
                        {isSignedIn ? "Dashboard" : "Sign Up"}
                    </Button>
                </Link>
            </div>
        </nav>
     );
}
 
export default LandingNavbar;