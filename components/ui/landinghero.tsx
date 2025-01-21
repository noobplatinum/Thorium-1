"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./button";

const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return ( 
        <div className="text-white font-bold py-36 text-center space-y-5 px-4 sm:px-6 lg:px-8">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>Encompass All Your Curiosities</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">
                    <TypewriterComponent options={{
                        strings: [
                            "Conversations",
                            "Photography",
                            "Video Visualizations",
                            "Musical Compositions"
                        ],
                        autoStart: true,
                        loop: true
                    }}/>
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                    <p>Create with Thorium-1</p>
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="premium" className="md:text-lg p-4 md:p-6 font-semibold rounded-full max-w-xs mx-auto">
                        Start Your Experience
                    </Button>
                </Link>
            </div>
        </div>
     );
}
 
export default LandingHero;