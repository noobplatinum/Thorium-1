"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import { MAX_FREE_COUNTS } from "@/public/constants";
import { Progress } from "./progress";
import { Button } from "./button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/usepromodal";

interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
}

export const FreeCounter = ({
    apiLimitCount = 0,
    isPro = false
}: FreeCounterProps) => {
    const proModal = useProModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted){
        return null;
    }

    if(isPro){
        return null;
    }

    return ( 
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>{apiLimitCount} / { MAX_FREE_COUNTS } Generations Left</p>
                        <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100}/>
                    </div>
                    <Button onClick={proModal.onOpen} className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white border-0">
                        Upgrade <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default FreeCounter;