"use client";

import { useProModal } from "@/hooks/usepromodal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Badge } from "./badge";
import { MessageSquare, ImageIcon, VideoIcon, Music, Code, Check, Zap } from "lucide-react";
import { Card, CardContent } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const tools = [
    {
        label: "Chat",
        icon: MessageSquare,
        bgcolor: "bg-indigo-500/10",
        color: "text-indigo-500"
    },
    {
        label: "Image",
        icon: ImageIcon,
        color: "text-red-400",
        bgcolor: "bg-red-400/10"
    },
    {
        label: "Video",
        icon: VideoIcon,
        color: "text-emerald-500",
        bgcolor: "bg-emerald-500/10"
    },
    {
        label: "Audio",
        icon: Music,
        color: "text-orange-500",
        bgcolor: "bg-orange-500/10"
    },
    {
        label: "Code",
        icon: Code,
        color: "text-yellow-500",
        bgcolor: "bg-yellow-500/10"
    }
];

const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);
    const onSubscribe = async () => {
        try{
            setLoading(true);
            const response = axios.get("/api/stripe");
            window.location.href = (await response).data.url;
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return ( 
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Thorium-1X
                            <Badge variant="premium" className="uppercase text-sm py-1">
                                Confirm
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} size="lg" className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white border-0">
                        Upgrade <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
 
export default ProModal;