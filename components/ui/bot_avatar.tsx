import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Bot_Avatar = () => {
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage className="p-1" src="/logo.png"/>
        </Avatar>
    );
};

export default Bot_Avatar;